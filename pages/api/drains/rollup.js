// pages/api/drains/rollup.js
//
// WRITER. Rolls up one finished UTC day's worth of `drain:events` into a
// compact `drain:daily` summary. Invoked by Vercel Cron (GET, nightly).
//
// Separate endpoint from the reader (pages/api/drains/daily.js): this one
// writes, requires auth, and is not publicly cacheable.
//
//   GET /api/drains/rollup            -> rolls up yesterday (UTC)
//   GET /api/drains/rollup?date=...   -> rolls up (or re-rolls) that day

import { readRecords, writeDailySummary } from "../../../lib/drain-store";
import {
  summarizeDay,
  dateKeyFor,
  dayBoundsUTC,
} from "../../../lib/daily-rollup";

/** Accepts `Authorization: Bearer $CRON_SECRET` (Vercel Cron) or the operator
 * token (manual re-run). There is no public/anonymous fallback. */
function checkRollupAuth(req) {
  const header = req.headers.authorization ?? "";
  const cronSecret = process.env.CRON_SECRET;
  const apiToken = process.env.DASHBOARD_API_TOKEN;

  if (cronSecret && header === `Bearer ${cronSecret}`) return true;
  if (apiToken && header === `Bearer ${apiToken}`) return true;
  if (!cronSecret && !apiToken && process.env.NODE_ENV !== "production") {
    return true; // dev convenience, mirrors lib/api-auth.js
  }
  return false;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method not allowed" });
  }

  if (!checkRollupAuth(req)) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const requestedDate = String(req.query.date || "").trim();
  const dateKey = /^\d{4}-\d{2}-\d{2}$/.test(requestedDate)
    ? requestedDate
    : dateKeyFor(Date.now() - 24 * 60 * 60 * 1000); // yesterday, UTC

  try {
    const { startTime, endTime } = dayBoundsUTC(dateKey);
    // Aggregation read: the whole day, no `limit` (same pattern as
    // pages/api/drains/stats.js). Bounded in practice by the raw store's
    // ~week retention.
    const records = await readRecords({ since: startTime });
    const dayRecords = records.filter((r) => (r.timestamp ?? 0) < endTime);

    const summary = summarizeDay(dayRecords, dateKey);
    await writeDailySummary(dateKey, summary);

    return res.status(200).json({ ok: true, date: dateKey, summary });
  } catch (err) {
    console.error("[drains/rollup]", err);
    return res.status(500).json({ error: err.message ?? "rollup failed" });
  }
}
