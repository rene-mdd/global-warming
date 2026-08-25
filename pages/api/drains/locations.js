// pages/api/drains/locations.js
//
// "Which IPs are coming from where" — a country -> IP list.
//   GET /api/drains/locations?hours=24&countries=15&ips=25
//
// Separate from /stats because the payload is much larger and the dashboard only
// asks for it when the panel is on screen.

import { readRecords } from "../../../lib/drain-store";
import { aggregateLocations } from "../../../lib/aggregate";
import checkApiAuth from "../../../lib/api-auth";
import { privacyInfo } from "../../../lib/privacy";
import { isPublicMode, publicLocations } from "../../../lib/public-mode";
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

  const hours = clampHours(req.query.hours);
  const limitCountries = Math.min(
    60,
    Math.max(1, Number(req.query.countries) || 15),
  );
  const limitIpsPerCountry = Math.min(
    200,
    Math.max(1, Number(req.query.ips) || 25),
  );

  const endTime = Date.now();
  const startTime = endTime - hours * 60 * 60 * 1000;

  try {
    const records = await readRecords({ since: startTime });
    const raw = aggregateLocations(records, {
      startTime,
      endTime,
      limitCountries,
      limitIpsPerCountry,
    });
    // Withhold the per-IP arrays; keep the country counts.
    const data = publicMode ? publicLocations(raw) : raw;
    return res.status(200).json({ ...data, privacy: privacyInfo(), hours });
  } catch (err) {
    console.error("[drains/locations]", err);
    return res.status(500).json({ error: err.message ?? "aggregation failed" });
  }
}
