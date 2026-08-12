// pages/api/drains/events.js
//
// Raw-ish event feed for the live table at the bottom of the dashboard.
//   GET /api/drains/events?limit=100&hours=24&q=/api&status=5xx

import { readRecords } from "../../../lib/drain-store";
import { statusClass } from "../../../lib/aggregate";
import checkApiAuth from "../../../lib/api-auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method not allowed" });
  }

  const refusal = checkApiAuth(req);
  if (refusal) return res.status(refusal.status).json(refusal.body);

  const limit = Math.min(500, Math.max(1, Number(req.query.limit) || 100));
  const hours = Math.min(24 * 90, Math.max(1, Number(req.query.hours) || 24));
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

    if (query) {
      records = records.filter((r) =>
        [
          r.path,
          r.clientIp,
          r.country,
          r.city,
          r.host,
          r.userAgent,
          r.method,
          r.message,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query)),
      );
    }

    // Newest first, capped.
    const page = records.slice(-limit).reverse();

    return res
      .status(200)
      .json({ events: page, total: records.length, limit, hours });
  } catch (err) {
    console.error("[drains/events]", err);
    return res.status(500).json({ error: err.message ?? "read failed" });
  }
}
