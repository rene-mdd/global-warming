// pages/api/drains/stats.js
//
// Read-only aggregates for the dashboard charts.
//   GET /api/drains/stats?hours=24

import { readRecords, storeInfo } from "../../../lib/drain-store";
import { aggregate } from "../../../lib/aggregate";
import checkApiAuth from "../../../lib/api-auth";
import { privacyInfo } from "../../../lib/privacy";
import { isPublicMode, publicStats } from "../../../lib/public-mode";
import {
  clampHours,
  coveragePercent,
  setReadCacheHeaders,
} from "../../../lib/api-read";

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

  const hours = clampHours(req.query.hours);
  const endTime = Date.now();
  const startTime = endTime - hours * 60 * 60 * 1000;

  try {
    const records = await readRecords({ since: startTime });
    const raw = aggregate(records, { startTime, endTime });

    // Anonymisation applies at ingest, not retroactively, so turning it on
    // doesn't rewrite what's already stored. Surfaced in server logs, not the
    // public dashboard, since it's an operator signal (misconfiguration, or a
    // store that predates the setting) rather than something a visitor needs.
    if (raw.totals.unanonymisedRecords > 0) {
      console.warn(
        `[drains/stats] ${raw.totals.unanonymisedRecords} stored record(s) in this window still contain raw IP addresses — ` +
          "anonymisation is applied at ingest, not retroactively. Clear the store (npm run clear) to remove them, " +
          "or this is expected if they predate DRAIN_ANONYMIZE_IPS being turned on.",
      );
    }

    // Strip the per-visitor breakdowns before they leave the server.
    const stats = publicMode ? publicStats(raw) : raw;
    // `privacy` tells the UI how to label the unique-visitor tile honestly
    // (raw IPs vs /24 subnets vs hashes).
    return res.status(200).json({
      ...stats,
      store: await storeInfo(),
      privacy: privacyInfo(),
      hours,
      // See lib/api-read.js: everything above only ever reflects requests
      // that reached a Vercel Function — CDN cache hits are structurally
      // invisible to Log Drains and never counted here.
      coveragePercent: coveragePercent(),
    });
  } catch (err) {
    console.error("[drains/stats]", err);
    return res.status(500).json({ error: err.message ?? "aggregation failed" });
  }
}
