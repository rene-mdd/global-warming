const KEY = process.env.DRAIN_REDIS_KEY || "drain:events";
const MAX_EVENTS = Number(process.env.DRAIN_MAX_EVENTS || 20000);
// How many hours of raw per-event detail to keep. Longer-range history is
// read from the drain:daily rollup instead.
const RETENTION_HOURS = Number(process.env.DRAIN_RETENTION_HOURS || 168);
const RETENTION_MS = RETENTION_HOURS > 0 ? RETENTION_HOURS * 60 * 60 * 1000 : 0;

const DAILY_KEY = process.env.DRAIN_DAILY_REDIS_KEY || "drain:daily";
const DAILY_MAX_DAYS = Number(process.env.DRAIN_DAILY_MAX_DAYS || 400);

// Number of records written per ZADD call.
const WRITE_CHUNK = 100;

// Number of records fetched per ZRANGE page when reading the full window by score.
const READ_PAGE_SIZE = Number(process.env.DRAIN_READ_PAGE_SIZE || 1000);

let clientPromise = null;

/**
 * Builds the Redis client on first use. Reads credentials from either
 * UPSTASH_REDIS_REST_URL/_TOKEN or KV_REST_API_URL/_TOKEN.
 */
async function getClient() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const { Redis } = await import("@upstash/redis");

      const url =
        process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
      const token =
        process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

      if (!url || !token) {
        throw new Error(
          "Redis backend selected but credentials are missing. Expected " +
            "UPSTASH_REDIS_REST_URL/_TOKEN (or KV_REST_API_URL/_TOKEN). Run " +
            "`vercel install upstash`, then `vercel env pull` for local dev.",
        );
      }

      return new Redis({ url, token });
    })();
  }
  return clientPromise;
}

/** @upstash/redis auto-parses JSON responses, so values may arrive already
 * deserialized. Accept either shape rather than assuming one. */
function toRecord(value) {
  if (value && typeof value === "object") return value;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return null;
}

/** Remove anything past the retention window and anything over the count cap. */
async function enforceLimits(redis) {
  const results = { expired: 0, overflow: 0 };

  if (RETENTION_MS) {
    const cutoff = Date.now() - RETENTION_MS;
    // Real deletion, not a read-time filter.
    results.expired = (await redis.zremrangebyscore(KEY, 0, cutoff)) ?? 0;
  }

  const count = await redis.zcard(KEY);
  if (count > MAX_EVENTS) {
    // Rank 0 is the lowest score (oldest), so drop from the front.
    const excess = count - MAX_EVENTS;
    results.overflow = (await redis.zremrangebyrank(KEY, 0, excess - 1)) ?? 0;
  }

  return results;
}

// ---------------------------------------------------------------------------
// SWEEPING ON READ
// ---------------------------------------------------------------------------
// readRecords deletes expired records (not just filters them out of the
// response), throttled to at most one sweep per SWEEP_INTERVAL_MS per warm
// instance. A cold start always sweeps on its first read.
let lastSweepAt = 0;
const SWEEP_INTERVAL_MS = Number(
  process.env.DRAIN_SWEEP_INTERVAL_MS || 5 * 60 * 1000,
);

async function maybeSweep(redis) {
  if (!RETENTION_MS) return;

  const now = Date.now();
  if (now - lastSweepAt < SWEEP_INTERVAL_MS) return;
  lastSweepAt = now;

  try {
    const trimmed = await enforceLimits(redis);
    if (trimmed.expired > 0) {
      console.log(
        `[store-redis] read-time sweep deleted ${trimmed.expired} events past the ${RETENTION_HOURS}h retention window`,
      );
    }
  } catch (err) {
    // A failed sweep is retried on the next throttled read.
    console.warn("[store-redis] read-time sweep failed:", err?.message ?? err);
  }
}

export async function appendRecords(records) {
  if (!Array.isArray(records) || records.length === 0) return 0;
  const redis = await getClient();

  let written = 0;
  for (let i = 0; i < records.length; i += WRITE_CHUNK) {
    const chunk = records.slice(i, i + WRITE_CHUNK);
    const members = chunk.map((record) => ({
      score: Number(record.timestamp) || Date.now(),
      member: JSON.stringify(record),
    }));
    // Writes chunks one at a time, sequentially.
    // eslint-disable-next-line no-await-in-loop
    await redis.zadd(KEY, ...members);
    written += chunk.length;
  }

  // Enforces the retention window and count cap after every write.
  const trimmed = await enforceLimits(redis);
  if (trimmed.expired > 0) {
    console.log(
      `[store-redis] deleted ${trimmed.expired} events past the ${RETENTION_HOURS}h retention window`,
    );
  }

  return written;
}

/**
 * Returns every record with score >= min, oldest first, fetched as
 * successive bounded ZRANGE ... BYSCORE LIMIT pages of READ_PAGE_SIZE and
 * concatenated in fetch order.
 */
async function readAllByScore(redis, min) {
  const records = [];
  let offset = 0;

  for (;;) {
    // Each page's offset depends on how many results the previous page returned.
    // eslint-disable-next-line no-await-in-loop
    const page = await redis.zrange(KEY, min, "+inf", {
      byScore: true,
      offset,
      count: READ_PAGE_SIZE,
    });
    if (!page || page.length === 0) break;

    page.forEach((value) => {
      const record = toRecord(value);
      if (record) records.push(record);
    });

    if (page.length < READ_PAGE_SIZE) break;
    offset += READ_PAGE_SIZE;
  }

  return records;
}

export async function readRecords({ since, limit } = {}) {
  const redis = await getClient();

  await maybeSweep(redis);

  // Clamps the requested `since` to the retention cutoff.
  const cutoff = RETENTION_MS ? Date.now() - RETENTION_MS : 0;
  const min = Math.max(Number(since) || 0, cutoff);

  const bounded = Number(limit) > 0;

  if (!bounded) {
    // With no `limit`, reads the whole window via readAllByScore.
    return readAllByScore(redis, min);
  }

  // With `limit` set, fetches the newest N records by rank (negative indices
  // count from the end).
  const raw = await redis.zrange(KEY, -Math.min(Number(limit), MAX_EVENTS), -1);

  const records = [];
  for (const value of raw ?? []) {
    const record = toRecord(value);
    // Rank reads ignore scores, so the age filter is re-applied here.
    if (record && (record.timestamp ?? 0) >= min) {
      records.push(record);
    }
  }

  // ZRANGE returns records ascending by score (oldest first).
  return records;
}

export async function clearRecords() {
  const redis = await getClient();
  const had = await redis.zcard(KEY);
  await redis.del(KEY);
  return had ?? 0;
}

/**
 * Merges `summary` into whatever fields already exist for `dateKey` (read via
 * HGET, then written back with HSET), rather than replacing the stored value
 * outright — existing fields not present in `summary` are kept.
 */
export async function writeDailySummary(dateKey, summary) {
  const redis = await getClient();
  const existing = toRecord(await redis.hget(DAILY_KEY, dateKey)) || {};
  const merged = { ...existing, ...summary };
  await redis.hset(DAILY_KEY, { [dateKey]: JSON.stringify(merged) });

  // Once the hash holds more than DAILY_MAX_DAYS fields, deletes the oldest
  // dates down to the cap.
  const fields = (await redis.hkeys(DAILY_KEY)) ?? [];
  if (fields.length > DAILY_MAX_DAYS) {
    const excess = fields.sort().slice(0, fields.length - DAILY_MAX_DAYS);
    if (excess.length) await redis.hdel(DAILY_KEY, ...excess);
  }
}

/** Every stored day, ascending by date, optionally limited to the last N. */
export async function readDailySummaries({ days } = {}) {
  const redis = await getClient();
  const raw = (await redis.hgetall(DAILY_KEY)) ?? {};

  const all = Object.entries(raw)
    .map(([date, value]) => {
      const summary = toRecord(value);
      return summary ? { date, ...summary } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.date.localeCompare(b.date));

  return Number(days) > 0 ? all.slice(-Number(days)) : all;
}

export async function storeInfo() {
  const redis = await getClient();

  const count = await redis.zcard(KEY);

  let oldestTimestamp = null;
  let newestTimestamp = null;
  if (count > 0) {
    // withScores returns a flat [member, score] array, so index 1 is the score.
    const oldest = (await redis.zrange(KEY, 0, 0, { withScores: true })) ?? [];
    const newest =
      (await redis.zrange(KEY, -1, -1, { withScores: true })) ?? [];
    oldestTimestamp = Number(oldest[1]) || null;
    newestTimestamp = Number(newest[1]) || null;
  }

  return {
    backend: "redis",
    count: count ?? 0,
    maxEvents: MAX_EVENTS,
    retentionHours: RETENTION_HOURS || null,
    persisted: true,
    dataPath: null,
    oldestTimestamp,
    newestTimestamp,
  };
}
