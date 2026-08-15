// lib/api-read.js — shared guards for the three read endpoints
//

/** Retention window in hours, or null when retention is disabled. */
export function retentionHours() {
  const raw = Number(process.env.DRAIN_RETENTION_HOURS ?? 720);
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
