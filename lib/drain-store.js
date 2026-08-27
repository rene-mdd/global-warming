// lib/drain-store.js — server only
//
// The store's public interface. Picks a backend automatically:
//
//   Redis credentials present  ->  lib/store-redis.js   (Vercel, or anywhere)
//   otherwise                  ->  lib/store-file.js    (dev, VPS, cPanel)
//
// Force a backend with DRAIN_STORE=redis | file.
//
// ---------------------------------------------------------------------------
// THE INTERFACE
// ---------------------------------------------------------------------------
// All four are async. Any backend that implements them works.
//
//   appendRecords(records)  -> Promise<number>   how many were stored
//   readRecords({ since, limit }) -> Promise<record[]> oldest first
//     With `limit`, returns only the newest N records; omit it to read the
//     whole window.
//   clearRecords()          -> Promise<number>   how many were removed
//   storeInfo()             -> Promise<object>   diagnostics for the UI
//
//   writeDailySummary(dateKey, summary) -> Promise<void>
//     One compact rollup per calendar day (see lib/daily-rollup.js), stored
//     separately from the bounded event window above. Shallow-merges
//     `summary` into whatever's already stored for that date, so
//     pages/api/drains/rollup.js and pages/api/drains/traffic-total.js can
//     each write their own fields for the same day without erasing the
//     other's.
//   readDailySummaries({ days }) -> Promise<object[]> ascending by date

const forced = (process.env.DRAIN_STORE || "").trim().toLowerCase();

const hasRedisCredentials = Boolean(
  (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) &&
  (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN),
);

const useRedis =
  forced === "redis" || (forced !== "file" && hasRedisCredentials);

// Running on Vercel with no Redis configured means writes fail silently
// (read-only filesystem) and nothing persists. VERCEL is set automatically in
// their build/runtime.
if (!useRedis && process.env.VERCEL) {
  console.warn(
    "[drain-store] Running on Vercel with the FILE backend. Writes will fail " +
      "(read-only filesystem) and nothing will persist. Provision Redis with " +
      "`vercel install upstash` — see README.",
  );
}

let backendPromise = null;

function backend() {
  if (!backendPromise) {
    backendPromise = useRedis
      ? import("./store-redis")
      : import("./store-file");
  }
  return backendPromise;
}

export async function appendRecords(records) {
  return (await backend()).appendRecords(records);
}

export async function readRecords(options) {
  return (await backend()).readRecords(options);
}

export async function clearRecords() {
  return (await backend()).clearRecords();
}

export async function storeInfo() {
  return (await backend()).storeInfo();
}

export async function writeDailySummary(dateKey, summary) {
  return (await backend()).writeDailySummary(dateKey, summary);
}

export async function readDailySummaries(options) {
  return (await backend()).readDailySummaries(options);
}
