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

  // How many records to pull out of the store before filtering.
  //
  // This endpoint displays at most a few hundred rows, but it used to read the
  // ENTIRE window to do it — at DRAIN_MAX_EVENTS=20000 that is a 20–60MB Redis
  // operation, which is what tripped Upstash's 10MB per-request limit and made a
  // polling dashboard move tens of gigabytes a day.
  //
  // Ten times the page size gives filters room to work while keeping the read
  // bounded by construction. The consequence is honest and reported below:
  // ?q= and ?status= search the most recent SCAN_LIMIT records, not all of
  // history. A search that silently covered less than it claimed would be worse.
  const SCAN_LIMIT = Math.min(5000, Math.max(limit * 10, 1000));
  const hours = clampHours(req.query.hours);
  const query = String(req.query.q || "")
    .trim()
    .toLowerCase();
  const statusFilter = String(req.query.status || "").trim();

  const since = Date.now() - hours * 60 * 60 * 1000;

  try {
    let records = await readRecords({ since, limit: SCAN_LIMIT });
    const scanned = records.length;

    if (statusFilter) {
      const wanted = statusFilter.startsWith("s")
        ? statusFilter
        : `s${statusFilter}`;
      records = records.filter((r) => statusClass(r.statusCode) === wanted);
    }

    // Which fields ?q= may match is a privacy control in public mode, not a
    // convenience list — see the reasoning in lib/public-mode.js, which owns
    // both this list and the list of fields stripped from responses. Keeping
    // them in one file is the point: when they lived apart they disagreed, and
    // the filter answered questions about fields the response hid.
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
    const events = publicMode ? publicEvents(page) : page;

    return res.status(200).json({
      events,
      // `total` counts matches within the scanned slice, not within all history —
      // `scanned` and `scanLimit` are reported so that distinction is visible
      // rather than implied.
      total: records.length,
      scanned,
      scanLimit: SCAN_LIMIT,
      truncatedScan: scanned >= SCAN_LIMIT,
      limit,
      hours,
      publicMode,
      ...(publicMode
        ? { timeGranularity: publicTimeGranularity() }
        : undefined),
    });
  } catch (err) {
    console.error("[drains/events]", err);
    return res.status(500).json({ error: err.message ?? "read failed" });
  }
}
