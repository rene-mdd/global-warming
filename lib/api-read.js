// lib/api-read.js — shared guards for the three read endpoints
//

/**
 * Manually configured percentage (0-100) of total API-route traffic this
 * dashboard can see, or null if unset. Log Drains never emit an event for a
 * CDN cache HIT — only for a Lambda/Edge invocation, static file serve, etc.
 * — so cache HITs are invisible to every other number in this dashboard;
 * DASHBOARD_TRAFFIC_COVERAGE_PERCENT is the operator-supplied estimate of
 * how much traffic that gap represents.
 */
export function coveragePercent() {
  const raw = Number(process.env.DASHBOARD_TRAFFIC_COVERAGE_PERCENT);
  if (!Number.isFinite(raw) || raw <= 0 || raw > 100) return null;
  return raw;
}

/** Retention window in hours, or null when retention is disabled. */
export function retentionHours() {
  // Only limits how far back a request can look; actual storage retention
  // lives in lib/store-redis.js / lib/store-file.js.
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
 * Sets cache headers for a read response. Public responses get a short
 * shared cache (`public, s-maxage=30, stale-while-revalidate=60`).
 * Authenticated responses get `private, no-store`.
 */
export function setReadCacheHeaders(res, { publicMode }) {
  // The response body depends on whether the request carried an operator token.
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
