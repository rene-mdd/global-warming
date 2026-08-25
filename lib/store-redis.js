const KEY = process.env.DRAIN_REDIS_KEY || "drain:events";
const MAX_EVENTS = Number(process.env.DRAIN_MAX_EVENTS || 20000);
const RETENTION_HOURS = Number(process.env.DRAIN_RETENTION_HOURS || 720);
const RETENTION_MS = RETENTION_HOURS > 0 ? RETENTION_HOURS * 60 * 60 * 1000 : 0;

// Upstash's REST API caps request size, and a drain batch can be big, so
// writes are chunked rather than sent as one enormous ZADD.
const WRITE_CHUNK = 100;

// Same cap, read side: an unbounded score-range read used to be one single
// ZRANGE call whose response grew with the whole store — comfortably past
// Upstash's 10MB limit once the store holds many records. Paginating with
// LIMIT keeps each individual request's size fixed regardless of how large
// DRAIN_MAX_EVENTS is.
const READ_PAGE_SIZE = Number(process.env.DRAIN_READ_PAGE_SIZE || 1000);

let clientPromise = null;

/**
 * Lazily construct the client so importing this module never throws and the
 * Redis SDK isn't pulled into bundles that don't use it.
 *
 * Note on env var names: `Redis.fromEnv()` looks for UPSTASH_REDIS_REST_URL /
 * UPSTASH_REDIS_REST_TOKEN. Some Vercel integrations inject the older
 * KV_REST_API_URL / KV_REST_API_TOKEN names instead, so both are handled.
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
// Deletion used to happen only inside appendRecords, on the reasoning that
// housekeeping-on-write avoids needing a cron. That holds right up until writes
// stop: a paused drain, a drain Vercel has flagged, a quiet holiday week, or a
// project that simply stops receiving traffic. Nothing then triggers a deletion
// pass, and records sit in Redis past the retention window indefinitely.
//
// readRecords does apply the age cutoff, but a read-time FILTER is not deletion.
// Data no one can see is still data you hold, and Art. 5(1)(e) is about storage,
// not visibility — "we retain for 30 days" has to mean the row is gone.
//
// So reads sweep too, throttled: at most one pass per interval per warm
// instance. A cold start sweeps on its first read, which is exactly when a
// long-idle deployment needs it most.
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
    // keeps expired records out of the response; the next sweep retries.
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
    // Sequential on purpose: chunks exist to stay under Upstash's request-size
    // limit, and firing them all at once would defeat that back-pressure.
    // eslint-disable-next-line no-await-in-loop
    await redis.zadd(KEY, ...members);
    written += chunk.length;
  }

  // Housekeeping on write keeps the set bounded without a separate cron.
  const trimmed = await enforceLimits(redis);
  if (trimmed.expired > 0) {
    console.log(
      `[store-redis] deleted ${trimmed.expired} events past the ${RETENTION_HOURS}h retention window`,
    );
  }

  return written;
}

/**
 * Every record with score >= min, oldest first — as several bounded
 * ZRANGE ... BYSCORE LIMIT calls instead of one unbounded one. Safe to
 * concatenate pages in fetch order: the aggregation layer that consumes this
 * (lib/aggregate.js) is order-independent by design.
 */
async function readAllByScore(redis, min) {
  const records = [];
  let offset = 0;

  for (;;) {
    // Sequential on purpose: offset N+1 depends on how many results page N
    // actually returned.
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

  // Never return data older than the retention window, even if a deletion pass
  const cutoff = RETENTION_MS ? Date.now() - RETENTION_MS : 0;
  const min = Math.max(Number(since) || 0, cutoff);

  // The events feed only ever displays the newest few hundred records, so when a
  // caller passes `limit` we fetch the newest N BY RANK (negative indices count
  // from the end) and let the caller filter. Bounded by construction, whatever
  // the window asks for.

  const bounded = Number(limit) > 0;

  if (!bounded) {
    // Aggregations legitimately need the whole window, so there's no count to
    // bound this by — but the size of any single request still has to be, see
    // readAllByScore.
    return readAllByScore(redis, min);
  }

  const raw = await redis.zrange(KEY, -Math.min(Number(limit), MAX_EVENTS), -1);

  const records = [];
  for (const value of raw ?? []) {
    const record = toRecord(value);
    // A rank read ignores scores, so the age filter has to be applied here
    // instead — expired or out-of-window records must never be served.
    if (record && (record.timestamp ?? 0) >= min) {
      records.push(record);
    }
  }

  // ZRANGE returns ascending by score, which is the oldest-first order the
  // aggregation layer already expects.
  return records;
}

export async function clearRecords() {
  const redis = await getClient();
  const had = await redis.zcard(KEY);
  await redis.del(KEY);
  return had ?? 0;
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
