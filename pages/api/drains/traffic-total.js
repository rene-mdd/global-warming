// pages/api/drains/traffic-total.js
//
// WRITER. Records one finished UTC day's TOTAL request count — HIT + MISS +
// STALE + BYPASS, i.e. real edge traffic, not just the compute-layer events
// the Log Drain can see (see CLAUDE.md decision 15 and lib/api-read.js's
// coveragePercent()). Merged into that day's pages/api/drains/rollup.js
// record via lib/drain-store.js's writeDailySummary (shallow merge, so
// neither writer erases the other's fields — see lib/drain-store.js).
//
// Nothing in this app can produce this number itself: a CDN cache HIT never
// reaches the Log Drain pipeline at all. It has to come from Vercel's own
// Observability Metrics, which isn't reachable from inside a Vercel Function
// (see CLAUDE.md Outstanding item 2b) — so the caller here is a scheduled
// GitHub Actions job running the real `vercel metrics` CLI, POSTing its
// result in. See .github/workflows/traffic-total.yml.
//
// Deliberately a separate endpoint from the reader (pages/api/drains/daily.js)
// and from the other writer (pages/api/drains/rollup.js) — same writer/reader
// split reasoning as that endpoint: a write must never be served from cache,
// and a scheduler must never receive a stale read.
//
//   POST /api/drains/traffic-total
//   Authorization: Bearer <TRAFFIC_TOTAL_API_TOKEN | DASHBOARD_API_TOKEN>
//   { "date": "2026-08-25", "totalRequests": 10315,
//     "breakdown": { "HIT": 8021, "MISS": 2198, "STALE": 60, "BYPASS": 5 } }

import { writeDailySummary } from "../../../lib/drain-store";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
// Loose upper bound, not a real traffic ceiling — just enough to reject a
// obviously-malformed or unit-confused payload (e.g. milliseconds where a
// count was expected) before it lands in the store.
const MAX_PLAUSIBLE_REQUESTS = 1_000_000_000;

/** Same shape as pages/api/drains/rollup.js's checkRollupAuth: a dedicated
 * token for this writer, falling back to the operator token, with the same
 * dev convenience and the same "no anonymous access, ever" stance in
 * production. A dedicated token (rather than reusing DASHBOARD_API_TOKEN
 * outright) means it can live in GitHub Actions' secret store and be
 * rotated independently of the operator's own dashboard access. */
function checkWriterAuth(req) {
  const header = req.headers.authorization ?? "";
  const trafficToken = process.env.TRAFFIC_TOTAL_API_TOKEN;
  const apiToken = process.env.DASHBOARD_API_TOKEN;

  if (trafficToken && header === `Bearer ${trafficToken}`) return true;
  if (apiToken && header === `Bearer ${apiToken}`) return true;
  if (!trafficToken && !apiToken && process.env.NODE_ENV !== "production") {
    return true; // dev convenience, mirrors lib/api-auth.js
  }
  return false;
}

function sanitizeBreakdown(raw) {
  if (!raw || typeof raw !== "object") return undefined;
  const out = {};
  Object.entries(raw).forEach(([key, value]) => {
    const n = Number(value);
    // Number("") is 0 — guard explicitly rather than let a blank field in
    // the upstream payload silently publish a real-looking zero.
    if (value === "" || !Number.isFinite(n) || n < 0) return;
    out[String(key).slice(0, 32)] = n;
  });
  return Object.keys(out).length ? out : undefined;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method not allowed" });
  }

  if (!checkWriterAuth(req)) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const dateKey = String(body.date || "").trim();
  const totalRequests = Number(body.totalRequests);

  if (!DATE_RE.test(dateKey)) {
    return res
      .status(400)
      .json({ error: "date must be an ISO calendar day, e.g. 2026-08-25" });
  }
  if (
    body.totalRequests === "" ||
    !Number.isFinite(totalRequests) ||
    totalRequests < 0 ||
    totalRequests > MAX_PLAUSIBLE_REQUESTS
  ) {
    return res.status(400).json({ error: "totalRequests must be a number" });
  }

  const breakdown = sanitizeBreakdown(body.breakdown);

  try {
    await writeDailySummary(dateKey, {
      totalTrafficRequests: totalRequests,
      ...(breakdown ? { totalTrafficBreakdown: breakdown } : {}),
      totalTrafficSource: "vercel-metrics",
      totalTrafficRecordedAt: new Date().toISOString(),
    });

    return res.status(200).json({ ok: true, date: dateKey, totalRequests });
  } catch (err) {
    console.error("[drains/traffic-total]", err);
    return res.status(500).json({ error: err.message ?? "write failed" });
  }
}
