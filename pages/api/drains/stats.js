// pages/api/drains/stats.js
//
// Read-only aggregates for the dashboard charts.
//   GET /api/drains/stats?hours=24

import { readRecords, storeInfo } from "../../../lib/drain-store";
import { aggregate } from "../../../lib/aggregate";
import checkApiAuth from "../../../lib/api-auth";
import { privacyInfo } from "../../../lib/privacy";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method not allowed" });
  }

  const refusal = checkApiAuth(req);
  if (refusal) return res.status(refusal.status).json(refusal.body);

  const hours = Math.min(24 * 90, Math.max(1, Number(req.query.hours) || 24));
  const endTime = Date.now();
  const startTime = endTime - hours * 60 * 60 * 1000;

  try {
    const records = await readRecords({ since: startTime });
    const stats = aggregate(records, { startTime, endTime });
    // `privacy` tells the UI how to label the unique-visitor tile honestly
    // (raw IPs vs /24 subnets vs hashes).
    return res.status(200).json({
      ...stats,
      store: await storeInfo(),
      privacy: privacyInfo(),
      hours,
    });
  } catch (err) {
    console.error("[drains/stats]", err);
    return res.status(500).json({ error: err.message ?? "aggregation failed" });
  }
}
