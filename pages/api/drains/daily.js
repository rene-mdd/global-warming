// pages/api/drains/daily.js
//
// READER. Public, cacheable — the summaries in `drain:daily` never held
// per-visitor fields to begin with (see lib/daily-rollup.js), so unlike
// stats/events/locations this doesn't need lib/api-auth.js or public-mode
// stripping. That's also why there's no `Vary: Authorization` here: the
// response never depended on who's asking.
//
//   GET /api/drains/daily?days=30

import { readDailySummaries } from "../../../lib/drain-store";
import { coveragePercent } from "../../../lib/api-read";

const DEFAULT_DAYS = 30;

function clampDays(raw) {
  const max = Number(process.env.DRAIN_DAILY_MAX_DAYS || 400);
  const requested = Number(raw) || DEFAULT_DAYS;
  return Math.min(max, Math.max(1, requested));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method not allowed" });
  }

  // An hour is fine: these numbers only change once a day, when the nightly
  // rollup cron runs.
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );

  const days = clampDays(req.query.days);

  try {
    const summaries = await readDailySummaries({ days });

    // Deliberately no summed "unique visitors" total across days — a
    // returning visitor would be counted once per day, inflating a month by
    // 40-80%. busiestDayUniqueVisitors is the honest single-number headline;
    // per-day uniques are still there for anyone charting them properly.
    const busiestDayUniqueVisitors = summaries.reduce(
      (max, day) => Math.max(max, day.uniqueVisitors ?? 0),
      0,
    );
    const totalRequests = summaries.reduce(
      (sum, day) => sum + (day.requests ?? 0),
      0,
    );

    // totalTrafficRequests is written separately, by
    // pages/api/drains/traffic-total.js from Vercel's own metrics (see that
    // file) — it isn't present for days before that pipeline existed, or on
    // a day its GitHub Action hasn't run yet, so every rollup here is
    // over only the days that actually have it.
    let daysWithTraffic = 0;
    let backendOverTrafficDays = 0;
    const totalTrafficRequests = summaries.reduce((sum, day) => {
      if (!Number.isFinite(day.totalTrafficRequests)) return sum;
      daysWithTraffic += 1;
      backendOverTrafficDays += day.requests ?? 0;
      return sum + day.totalTrafficRequests;
    }, 0);

    const daysOut = summaries.map((day) =>
      Number.isFinite(day.totalTrafficRequests) && day.totalTrafficRequests > 0
        ? {
            ...day,
            dayCoveragePercent: Math.round(
              ((day.requests ?? 0) / day.totalTrafficRequests) * 1000,
            ) / 10,
          }
        : day,
    );

    return res.status(200).json({
      days: daysOut,
      totals: {
        requests: totalRequests,
        busiestDayUniqueVisitors,
        totalTrafficRequests: daysWithTraffic ? totalTrafficRequests : null,
      },
      requestedDays: days,
      // Same caveat as /api/drains/stats: `requests` above is backend (Log
      // Drain) requests only, not total edge traffic. Prefer the measured
      // ratio (real per-day totals from Vercel's metrics, this range only)
      // when any day in range has one; fall back to the manually-refreshed
      // env estimate otherwise. See lib/api-read.js.
      coveragePercent: daysWithTraffic
        ? Math.round((backendOverTrafficDays / totalTrafficRequests) * 1000) /
          10
        : coveragePercent(),
      measuredCoverageDays: daysWithTraffic,
    });
  } catch (err) {
    console.error("[drains/daily]", err);
    return res.status(500).json({ error: err.message ?? "read failed" });
  }
}
