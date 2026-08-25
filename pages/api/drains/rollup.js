// pages/api/drains/rollup.js
//
// WRITER. Rolls up one finished UTC day's worth of `drain:events` into a
// compact `drain:daily` summary. Invoked by Vercel Cron (GET, nightly) so
// yesterday gets finalized before the raw event window (~7 days, see
// lib/store-redis.js) has a chance to age it out.
//
// Deliberately a separate endpoint from the reader (pages/api/drains/daily.js)
// — see CLAUDE.md decision on writer/reader split: a single URL that is both
// a publicly-cacheable read and a writer lets the CDN cache a write response,
// or serve the scheduler a stale read.
//
//   GET /api/drains/rollup            -> rolls up yesterday (UTC)
//   GET /api/drains/rollup?date=...   -> rolls up (or re-rolls) that day

import { readRecords, writeDailySummary } from "../../../lib/drain-store";
import {
  summarizeDay,
  dateKeyFor,
  dayBoundsUTC,
} from "../../../lib/daily-rollup";

/** Vercel Cron sends `Authorization: Bearer $CRON_SECRET`; the operator token
 * also works, for a manual re-run. Unlike the read endpoints, there is no
 * "public" fallback here — this endpoint writes, so anonymous access is never
 * acceptable, production or not. */
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
    // Aggregation read — the whole day, no `limit` — same pattern as
    // pages/api/drains/stats.js. Bounded in practice because the raw store
    // only ever holds about a week regardless of what's requested here.
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
