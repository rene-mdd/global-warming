// lib/daily-rollup.js
//
// Turns a day's worth of normalized records into one compact summary (~1KB),
// meant to sit in lib/drain-store.js's `drain:daily` alongside the bounded
// `drain:events` window. No I/O, no env access — pure, like lib/aggregate.js.
//
// Why a separate summary instead of just keeping more raw events: at real
// traffic volume, DRAIN_MAX_EVENTS/DRAIN_RETENTION_HOURS keep the raw window
// to about a week (see lib/store-redis.js). A rollup this small can hold a
// year of days without coming anywhere near Upstash's per-request limits —
// that's the whole point of it existing.

import { statusClass, toRequests } from "./aggregate";

/** UTC calendar-day key for a timestamp, e.g. "2026-08-24". */
export function dateKeyFor(ms) {
  return new Date(Number(ms)).toISOString().slice(0, 10);
}

/** [startMs, endMs) for a UTC calendar day given its "YYYY-MM-DD" key. */
export function dayBoundsUTC(dateKey) {
  const startTime = new Date(`${dateKey}T00:00:00.000Z`).getTime();
  return { startTime, endTime: startTime + 24 * 60 * 60 * 1000 };
}

/**
 * Summarize one day's records.
 *
 * Deliberately does NOT include a field an operator could be tempted to sum
 * across days to get "monthly uniques" — a returning visitor would then be
 * counted once per day they showed up, inflating a month by 40-80%. Per-day
 * uniques and a separate busiest-day figure are the honest numbers; see
 * pages/api/drains/daily.js for how those get combined across days.
 */
export function summarizeDay(records, dateKey) {
  const { startTime, endTime } = dayBoundsUTC(dateKey);
  const inWindow = toRequests(
    records.filter((r) => {
      const t = r.timestamp ?? 0;
      return t >= startTime && t < endTime;
    }),
  );

  const uniqueVisitors = new Set();
  const routeCounts = new Map();
  let errors = 0;
  let serverErrors = 0;
  let botRequests = 0;
  let bytes = 0;
  const statusClasses = { s2xx: 0, s3xx: 0, s4xx: 0, s5xx: 0, other: 0 };

  inWindow.forEach((record) => {
    if (record.clientIp) uniqueVisitors.add(record.clientIp);
    if (record.route) {
      routeCounts.set(record.route, (routeCounts.get(record.route) ?? 0) + 1);
    }

    const code = Number(record.statusCode);
    if (Number.isFinite(code) && code >= 400) errors += 1;
    if (Number.isFinite(code) && code >= 500) serverErrors += 1;
    if (record.isBot) botRequests += 1;
    if (Number.isFinite(Number(record.responseByteSize))) {
      bytes += Number(record.responseByteSize);
    }
    statusClasses[statusClass(record.statusCode)] += 1;
  });

  const topRoutes = [...routeCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([route, count]) => ({ route, count }));

  return {
    requests: inWindow.length,
    uniqueVisitors: uniqueVisitors.size,
    errors,
    serverErrors,
    errorRate: inWindow.length ? errors / inWindow.length : 0,
    botRequests,
    bytes,
    statusClasses,
    topRoutes,
  };
}
