// lib/store-file.js — server only
//
// Filesystem backend: a bounded in-memory array (newest last) plus an
// append-only JSONL file so data survives restarts.
//
// Works on a host with a persistent filesystem: `npm run dev`, `npm run
// start`, a container, a VPS, or cPanel/Namecheap shared hosting. Not used on
// Vercel Functions (read-only bundle, many concurrent instances) — that path
// uses lib/store-redis.js instead. lib/drain-store.js picks between them.
//
// The exported functions are async so both backends share one interface; the
// work here itself is synchronous.
//
/* eslint-env es2020 */
import fs from "fs";
import path from "path";

const MAX_EVENTS = Number(process.env.DRAIN_MAX_EVENTS || 20000);
const DATA_DIR = process.env.DRAIN_DATA_DIR || ".data";
const PERSIST_DISABLED = process.env.DRAIN_DISABLE_PERSIST === "1";

// Hours of raw per-event detail to keep; 0 disables the age limit.
// Longer-range history is read from the daily rollup instead.
const RETENTION_HOURS = Number(process.env.DRAIN_RETENTION_HOURS || 168); // 7 days
const RETENTION_MS = RETENTION_HOURS > 0 ? RETENTION_HOURS * 60 * 60 * 1000 : 0;

const DAILY_MAX_DAYS = Number(process.env.DRAIN_DAILY_MAX_DAYS || 400);
const DAILY_PATH = path.join(process.cwd(), DATA_DIR, "daily.json");

/** Drop records older than the retention window. */
function pruneExpired(records) {
  if (!RETENTION_MS) return records;
  const cutoff = Date.now() - RETENTION_MS;
  return records.filter((r) => (r.timestamp ?? 0) >= cutoff);
}

const DATA_PATH = path.join(process.cwd(), DATA_DIR, "events.jsonl");

// State lives on globalThis so it survives Next.js dev-mode hot reloads.
const globalKey = "__vercelDrainStore__";
const dailyGlobalKey = "__vercelDrainDailyStore__";

function getState() {
  if (!globalThis[globalKey]) {
    globalThis[globalKey] = {
      records: [],
      loaded: false,
      writeQueue: Promise.resolve(),
    };
  }
  return globalThis[globalKey];
}

function getDailyState() {
  if (!globalThis[dailyGlobalKey]) {
    globalThis[dailyGlobalKey] = {
      days: {}, // date string -> summary object
      loaded: false,
      writeQueue: Promise.resolve(),
    };
  }
  return globalThis[dailyGlobalKey];
}

function ensureDataDir() {
  if (PERSIST_DISABLED) return false;
  try {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
    return true;
  } catch (err) {
    console.warn(
      "[drain-store] could not create data dir, running memory-only:",
      err.message,
    );
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
    text.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      try {
        loaded.push(JSON.parse(trimmed));
      } catch {
        // Ignore a torn final line from an interrupted write.
      }
    });
    loaded.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));
    // Prunes expired records on load too.
    const fresh = pruneExpired(loaded);
    const expired = loaded.length - fresh.length;
    state.records = fresh.slice(-MAX_EVENTS);
    const expiredNote = expired
      ? ` (dropped ${expired} past the ${RETENTION_HOURS}h retention window)`
      : "";
    console.log(
      `[drain-store] loaded ${state.records.length} events from ${DATA_PATH}${expiredNote}`,
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

  // Trims from the oldest end first.
  if (state.records.length > MAX_EVENTS) {
    state.records = state.records.slice(-MAX_EVENTS);
    trimmed = true;
  }

  if (!PERSIST_DISABLED && ensureDataDir()) {
    const lines = `${records.map((r) => JSON.stringify(r)).join("\n")}\n`;
    // Writes are queued to run one at a time.
    state.writeQueue = state.writeQueue
      .then(() => fs.promises.appendFile(DATA_PATH, lines, "utf8"))
      .then(() => {
        // Rewrites the whole file after trimming.
        if (trimmed) {
          const all = `${state.records
            .map((r) => JSON.stringify(r))
            .join("\n")}\n`;
          return fs.promises.writeFile(DATA_PATH, all, "utf8");
        }
        return undefined;
      })
      .catch((err) => {
        console.warn(
          "[drain-store] write failed, keeping events in memory:",
          err.message,
        );
      });
  }

  return records.length;
}

/** Read records, optionally only those at/after `since` (ms). Oldest first. */
export async function readRecords({ since, limit } = {}) {
  const state = loadIfNeeded();
  const inWindow =
    since === undefined || since === null
      ? state.records
      : state.records.filter((r) => (r.timestamp ?? 0) >= since);

  // With `limit` set, returns the newest N records, oldest first.
  return Number(limit) > 0 ? inWindow.slice(-Number(limit)) : inWindow;
}

/** Load the daily-rollup JSON file into memory once per process. */
function loadDailyIfNeeded() {
  const state = getDailyState();
  if (state.loaded) return state;
  state.loaded = true;

  if (PERSIST_DISABLED) return state;

  try {
    if (!fs.existsSync(DAILY_PATH)) return state;
    const parsed = JSON.parse(fs.readFileSync(DAILY_PATH, "utf8"));
    if (parsed && typeof parsed === "object") state.days = parsed;
  } catch (err) {
    console.warn("[drain-store] could not read daily rollup:", err.message);
  }

  return state;
}

/**
 * Merges `summary` into whatever is already stored for `dateKey` at the top
 * level, rather than replacing it outright — existing fields not present in
 * `summary` are kept. Rewrites the whole daily-rollup file on every call.
 */
export async function writeDailySummary(dateKey, summary) {
  const state = loadDailyIfNeeded();
  state.days[dateKey] = { ...(state.days[dateKey] || {}), ...summary };

  const dates = Object.keys(state.days).sort();
  if (dates.length > DAILY_MAX_DAYS) {
    dates.slice(0, dates.length - DAILY_MAX_DAYS).forEach((d) => {
      delete state.days[d];
    });
  }

  if (PERSIST_DISABLED || !ensureDataDir()) return;

  state.writeQueue = state.writeQueue
    .then(() =>
      fs.promises.writeFile(DAILY_PATH, JSON.stringify(state.days), "utf8"),
    )
    .catch((err) => {
      console.warn(
        "[drain-store] daily rollup write failed, keeping in memory:",
        err.message,
      );
    });
  await state.writeQueue;
}

/** Every stored day, ascending by date, optionally limited to the last N. */
export async function readDailySummaries({ days } = {}) {
  const state = loadDailyIfNeeded();
  const all = Object.entries(state.days)
    .map(([date, summary]) => ({ date, ...summary }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return Number(days) > 0 ? all.slice(-Number(days)) : all;
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
      console.warn(
        "[drain-store] could not delete stored events:",
        err.message,
      );
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
