// lib/store-file.js — server only
//
// Filesystem backend: a bounded in-memory array (newest last) plus an
// append-only JSONL file so data survives restarts.
//
// Use this when the app runs on a host with a real, persistent filesystem:
// `npm run dev`, `npm run start`, a container, a VPS, or cPanel/Namecheap
// shared hosting. It does NOT work on Vercel Functions (read-only bundle, and
// each of up to 30,000 concurrent instances would hold its own copy) — use
// lib/store-redis.js there. lib/drain-store.js picks between them for you.
//
// The exported functions are async purely so both backends share one interface;
// the work here is synchronous.
//
// ---------------------------------------------------------------------------
// READ THIS BEFORE DEPLOYING
// ---------------------------------------------------------------------------
// This works great when you run ONE long-lived Node process (`npm run dev`,
// `npm run start`, a container, a VPS). It does NOT work on Vercel's own
// serverless functions, because each invocation may be a fresh isolate with a
// read-only filesystem - writes vanish and memory isn't shared.
//
// To deploy on Vercel, replace the three functions marked STORAGE BOUNDARY
// below with a real datastore. Everything else in the app talks only to those
// three, so it's a contained change:
//
//   appendRecords(records) -> write many events
//   readRecords({ since })  -> read events newer than a timestamp
//   clearRecords()          -> wipe
//
// Redis (Upstash) sketch:
//   appendRecords: pipeline .lpush(key, JSON.stringify(r)) then .ltrim(key, 0, MAX)
//   readRecords:   .lrange(key, 0, -1) -> JSON.parse -> filter by since
//
// Postgres sketch: one `drain_events` table, insert many, index on timestamp.

import fs from "fs";
import path from "path";

const MAX_EVENTS = Number(process.env.DRAIN_MAX_EVENTS || 20000);
const DATA_DIR = process.env.DRAIN_DATA_DIR || ".data";
const PERSIST_DISABLED = process.env.DRAIN_DISABLE_PERSIST === "1";

// Time-based retention. A count cap alone isn't a retention policy: on a quiet
// site 20k events could be months of visitor IPs sitting around, and "keep
// personal data no longer than necessary" is a GDPR requirement (storage
// limitation), not just good manners. 0 disables the age limit.
const RETENTION_HOURS = Number(process.env.DRAIN_RETENTION_HOURS || 720); // 30 days
const RETENTION_MS = RETENTION_HOURS > 0 ? RETENTION_HOURS * 60 * 60 * 1000 : 0;

/** Drop records older than the retention window. */
function pruneExpired(records) {
  if (!RETENTION_MS) return records;
  const cutoff = Date.now() - RETENTION_MS;
  return records.filter((r) => (r.timestamp ?? 0) >= cutoff);
}

const DATA_PATH = path.join(process.cwd(), DATA_DIR, "events.jsonl");

// Next.js dev mode reloads modules on edit; stashing state on globalThis keeps
// already-ingested events alive across hot reloads.
const globalKey = "__vercelDrainStore__";

function getState() {
  if (!globalThis[globalKey]) {
    globalThis[globalKey] = { records: [], loaded: false, writeQueue: Promise.resolve() };
  }
  return globalThis[globalKey];
}

function ensureDataDir() {
  if (PERSIST_DISABLED) return false;
  try {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
    return true;
  } catch (err) {
    console.warn("[drain-store] could not create data dir, running memory-only:", err.message);
    return false;
  }
}

/** Load the JSONL file into memory once per process. */
function loadIfNeeded() {
  const state = getState();
  if (state.loaded) return state;
  state.loaded = true;

  if (PERSIST_DISABLED) return state;

  try {
    if (!fs.existsSync(DATA_PATH)) return state;
    const text = fs.readFileSync(DATA_PATH, "utf8");
    const loaded = [];
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        loaded.push(JSON.parse(trimmed));
      } catch {
        // Ignore a torn final line from an interrupted write.
      }
    }
    loaded.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));
    // Apply retention on load too, so restarting doesn't resurrect expired data.
    const fresh = pruneExpired(loaded);
    const expired = loaded.length - fresh.length;
    state.records = fresh.slice(-MAX_EVENTS);
    console.log(
      `[drain-store] loaded ${state.records.length} events from ${DATA_PATH}` +
        (expired ? ` (dropped ${expired} past the ${RETENTION_HOURS}h retention window)` : "")
    );
  } catch (err) {
    console.warn("[drain-store] could not read stored events:", err.message);
  }

  return state;
}

/** Append normalized records. Returns how many were stored. */
export async function appendRecords(records) {
  if (!Array.isArray(records) || records.length === 0) return 0;
  const state = loadIfNeeded();

  state.records.push(...records);

  // Enforce both limits: age first, then count.
  let trimmed = false;
  const beforeAge = state.records.length;
  state.records = pruneExpired(state.records);
  if (state.records.length !== beforeAge) trimmed = true;

  // Trim oldest first so the newest window is always intact.
  if (state.records.length > MAX_EVENTS) {
    state.records = state.records.slice(-MAX_EVENTS);
    trimmed = true;
  }

  if (!PERSIST_DISABLED && ensureDataDir()) {
    const lines = records.map((r) => JSON.stringify(r)).join("\n") + "\n";
    // Serialize writes so concurrent batches can't interleave mid-line.
    state.writeQueue = state.writeQueue
      .then(() => fs.promises.appendFile(DATA_PATH, lines, "utf8"))
      .then(() => {
        // Rewrite the file after trimming, otherwise it grows forever.
        if (trimmed) {
          const all = state.records.map((r) => JSON.stringify(r)).join("\n") + "\n";
          return fs.promises.writeFile(DATA_PATH, all, "utf8");
        }
        return undefined;
      })
      .catch((err) => {
        console.warn("[drain-store] write failed, keeping events in memory:", err.message);
      });
  }

  return records.length;
}

/** Read records, optionally only those at/after `since` (ms). Oldest first. */
export async function readRecords({ since } = {}) {
  const state = loadIfNeeded();
  if (since === undefined || since === null) return state.records;
  return state.records.filter((r) => (r.timestamp ?? 0) >= since);
}

/** Delete everything. Used by `npm run clear`. */
export async function clearRecords() {
  const state = loadIfNeeded();
  const had = state.records.length;
  state.records = [];
  if (!PERSIST_DISABLED) {
    try {
      if (fs.existsSync(DATA_PATH)) fs.unlinkSync(DATA_PATH);
    } catch (err) {
      console.warn("[drain-store] could not delete stored events:", err.message);
    }
  }
  return had;
}

/** Diagnostics for the dashboard header. */
export async function storeInfo() {
  const state = loadIfNeeded();
  const first = state.records[0];
  const last = state.records[state.records.length - 1];
  return {
    backend: "file",
    count: state.records.length,
    maxEvents: MAX_EVENTS,
    retentionHours: RETENTION_HOURS || null,
    persisted: !PERSIST_DISABLED,
    dataPath: PERSIST_DISABLED ? null : DATA_PATH,
    oldestTimestamp: first?.timestamp ?? null,
    newestTimestamp: last?.timestamp ?? null,
  };
}
