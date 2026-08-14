// pages/api/drains/events.js
//
// Raw-ish event feed for the live table at the bottom of the dashboard.
//   GET /api/drains/events?limit=100&hours=24&q=/api&status=5xx

import { readRecords } from "../../../lib/drain-store";
import { statusClass } from "../../../lib/aggregate";
import checkApiAuth from "../../../lib/api-auth";
import {
  isPublicMode,
  publicEvents,
  cityMinVisitors,
  publicTimeGranularity,
  searchableFields,
} from "../../../lib/public-mode";
import { clampHours, setReadCacheHeaders } from "../../../lib/api-read";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method not allowed" });
  }

  const { refusal, elevated } = checkApiAuth(req);
  if (refusal) return res.status(refusal.status).json(refusal.body);

  // An operator token turns public mode off for this request only.
  const publicMode = isPublicMode() && !elevated;
  setReadCacheHeaders(res, { publicMode });

  const limit = Math.min(500, Math.max(1, Number(req.query.limit) || 100));
  const hours = clampHours(req.query.hours);
  const query = String(req.query.q || "")
    .trim()
    .toLowerCase();
  const statusFilter = String(req.query.status || "").trim();

  const since = Date.now() - hours * 60 * 60 * 1000;

  try {
    let records = await readRecords({ since });

    if (statusFilter) {
      const wanted = statusFilter.startsWith("s")
        ? statusFilter
        : `s${statusFilter}`;
      records = records.filter((r) => statusClass(r.statusCode) === wanted);
    }

    // Which fields ?q= may match is a privacy control in public mode, not a
    // convenience list — see the reasoning in lib/public-mode.js, which owns
    // both this list and the list of fields stripped from responses. 
    const fields = searchableFields(publicMode);

    if (query) {
      records = records.filter((r) =>
        fields
          .map((field) => r[field])
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query)),
      );
    }

    // Newest first, capped.
    const page = records.slice(-limit).reverse();

    // In public mode each row loses its linkage key, so rows can't be grouped
    // back into one person's session.
    //
    // City names are the exception: they survive only where enough distinct
    // visitors share the city to hide the individual. The crowd is counted over
    // `records` — the full post-filter set — not over `page`, because `records`
    // is what a caller can page through, and the anonymity set is whatever is
    // actually reachable. 
    const events = publicMode ? publicEvents(page, records) : page;

    return res.status(200).json({
      events,
      total: records.length,
      limit,
      hours,
      publicMode,
      ...(publicMode
        ? {
            cityGate: { minVisitors: cityMinVisitors() },
            timeGranularity: publicTimeGranularity(),
          }
        : undefined),
    });
  } catch (err) {
    console.error("[drains/events]", err);
    return res.status(500).json({ error: err.message ?? "read failed" });
  }
}
