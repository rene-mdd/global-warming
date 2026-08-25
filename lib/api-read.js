// lib/api-read.js — shared guards for the three read endpoints
//

/**
 * What fraction of TOTAL traffic to the API routes this dashboard can
 * actually see, as a manually-refreshed estimate (0-100), or null if unset.
 *
 * Why this can't be computed live: every number in this dashboard comes from
 * Vercel's Log Drain, which only emits a log line for a compute-layer event
 * (a Lambda/Edge invocation, a static file serve, ...). A CDN cache HIT for
 * one of these routes is served entirely at the edge — the function never
 * runs, so no Log Drain event of any kind is ever generated for it, no
 * matter which Sources are enabled on the drain. There is no code fix for
 * that; it's a structural gap between what Log Drains expose and what
 * Vercel's own Observability Metrics track.
 *
 * Refresh this periodically with (requires the Vercel CLI, logged in, and
 * Observability Plus):
 *
 *   vercel metrics vercel.request.count --prod \
 *     -f "contains(request_path, '/api')" --group-by cache_result \
 *     --since 24h --json
 *
 * Then set DASHBOARD_TRAFFIC_COVERAGE_PERCENT to (MISS+other) / (HIT+MISS+other) * 100.
 * Measured 2026-08-25: HIT 8343, MISS 3430, other 40 -> ~29% visible here.
 */
export function coveragePercent() {
  const raw = Number(process.env.DASHBOARD_TRAFFIC_COVERAGE_PERCENT);
  if (!Number.isFinite(raw) || raw <= 0 || raw > 100) return null;
  return raw;
}

/** Retention window in hours, or null when retention is disabled. */
export function retentionHours() {
  // Must match the default in lib/store-redis.js / lib/store-file.js — this
  // only clamps how far a caller can ask to look back, it doesn't govern
  // storage itself.
  const raw = Number(process.env.DRAIN_RETENTION_HOURS ?? 168);
  if (!Number.isFinite(raw) || raw <= 0) return null;
  return raw;
}

export function clampHours(raw, fallback = 24) {
  const requested = Number(raw) || fallback;
  const ceiling = retentionHours() ?? 24 * 90;
  return Math.min(ceiling, Math.max(1, requested));
}

/**
 * Cache policy for a read response.
 *
 * Public mode gets a short shared-cache window: the data is already public, and
 * a 30-second CDN cache turns a thousand scripted requests into one Redis read
 * while keeping the dashboard visibly live. `stale-while-revalidate` means the
 * refresh happens behind a served response rather than in front of it.
 *
 * Authenticated mode gets `private, no-store`. A response that varies by token
 * must never land in a shared cache — that is how one caller's view gets served
 * to another. Correctness first; the operator view has one user anyway.
 */
export function setReadCacheHeaders(res, { publicMode }) {
  // The same URL now returns two different documents depending on whether the
  // request carried an operator token. 
  res.setHeader("Vary", "Authorization");

  if (publicMode) {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=60",
    );
  } else {
    res.setHeader("Cache-Control", "private, no-store");
  }
}
