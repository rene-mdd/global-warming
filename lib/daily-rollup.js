// lib/daily-rollup.js
//
// Turns a day's worth of normalized records into one compact summary (~1KB),
// stored in lib/drain-store.js's `drain:daily` alongside the bounded
// `drain:events` window. No I/O, no env access — pure, like lib/aggregate.js.

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
 * Summarizes one day's records: request/error counts, unique visitor count,
 * bot count, byte total, status-class breakdown, and top routes. Does not
 * include a value meant to be summed across days into a "monthly uniques"
 * total — see pages/api/drains/daily.js for the per-day and busiest-day
 * figures it exposes instead.
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
