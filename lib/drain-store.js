// lib/drain-store.js — server only
//
// The store's public interface. Picks a backend automatically so the same code
// runs locally and on Vercel with no edits:
//
//   Redis credentials present  ->  lib/store-redis.js   (Vercel, or anywhere)
//   otherwise                  ->  lib/store-file.js    (dev, VPS, cPanel)
//
// WHY AUTO-SELECT: Vercel Functions can't persist to disk — the deployment
// bundle is read-only, and each of up to 30,000 concurrent instances would keep
// its own in-memory copy, so the instance that received a drain delivery is
// usually not the one serving your dashboard. You'd see fragments or nothing.
//
//
// ---------------------------------------------------------------------------
// THE INTERFACE
// ---------------------------------------------------------------------------
// All four are async. Any backend that implements them works — swap in
// Postgres, DynamoDB, or anything else by writing one more file like these:
//
//   appendRecords(records)  -> Promise<number>   how many were stored
//   readRecords({ since })  -> Promise<record[]> oldest first
//   clearRecords()          -> Promise<number>   how many were removed
//   storeInfo()             -> Promise<object>   diagnostics for the UI

const forced = (process.env.DRAIN_STORE || "").trim().toLowerCase();

const hasRedisCredentials = Boolean(
  (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) &&
  (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN),
);

const useRedis =
  forced === "redis" || (forced !== "file" && hasRedisCredentials);

// Warn about the one combination that silently loses data: running on Vercel
// with no Redis configured. VERCEL is set automatically in their build/runtime.
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
