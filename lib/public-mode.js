// lib/public-mode.js — server only
//
// Lets the dashboard be publicly readable WITHOUT publishing per-visitor
// records.
//
// The distinction that makes this possible: a visitor *count* is an aggregate
// (one integer). A visitor *row* — stable IP hash + city + timestamps + the
// routes they hit — is a behavioural record of one person. You can publish the
// first without the second.
//
// ---------------------------------------------------------------------------
// WHY THIS IS ENFORCED HERE AND NOT IN THE UI
// ---------------------------------------------------------------------------
// Hiding panels in the React component would be theatre: /api/drains/events and
// /api/drains/locations are ordinary public URLs, and anyone can curl them. The
// stripping has to happen server-side, on the way out. The UI then reads the
// `publicMode` flag in the stats response purely to avoid rendering empty
// panels.
//
// Enable with DASHBOARD_PUBLIC_MODE=1.

/** Is the dashboard serving anonymous visitors? */
export function isPublicMode() {
  return process.env.DASHBOARD_PUBLIC_MODE === "1";
}

// Fields that make a row linkable to one person, or that identify them outright.
// `clientIp` is the linkage key even when hashed: the hash is stable, so it acts
// as a session identifier for anyone who filters on it.
const PER_VISITOR_FIELDS = [
  "clientIp",
  "userAgent",
  "city",
  "countryRegion",
  "latitude",
  "longitude",
  "timezone",
  "requestId",
  "traceId",
  "custom", // your own logged fields — may contain user/account identifiers
  "message", // free-text log line; can contain anything
];

/**
 * Strip a single event row down to something unlinkable.
 *
 * What survives is deliberately coarse: when, what was requested, how it
 * responded, roughly where from, and what kind of client. With no stable
 * identifier, two rows can't be tied to the same person.
 */
export function publicEvent(record) {
  const safe = { ...record };
  PER_VISITOR_FIELDS.forEach((field) => {
    delete safe[field];
  });
  return safe;
}

/**
 * Aggregates are fine to publish, with one exception: the clientIp breakdown is
 * a list of individual visitors ("top callers"), not an aggregate. The
 * uniqueIps *count* in totals stays — that's the visitor number worth showing.
 */
export function publicStats(stats) {
  if (!stats?.breakdowns) return { ...stats, publicMode: true };

  const breakdowns = { ...stats.breakdowns };
  delete breakdowns.clientIp;
  // Referrer URLs can carry query strings with personal data from other sites.
  delete breakdowns.referer;

  return { ...stats, breakdowns, publicMode: true };
}

/**
 * The locations tree exists to list addresses per country, so in public mode the
 * per-IP arrays are removed entirely. Country and city counts remain, which is
 * the part that reads as a map of where your traffic comes from.
 */
export function publicLocations(data) {
  return {
    ...data,
    countries: (data.countries ?? []).map((country) => ({
      country: country.country,
      requests: country.requests,
      errors: country.errors,
      uniqueIps: country.uniqueIps, // a count, not a list
      geoQuality: country.geoQuality,
      cities: country.cities,
      ips: [], // withheld
      ipsTruncated: 0,
      ipsWithheld: true,
    })),
    publicMode: true,
  };
}
