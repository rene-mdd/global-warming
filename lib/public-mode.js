// lib/public-mode.js — server only
//
// Enable with DASHBOARD_PUBLIC_MODE=1.

/** Is the dashboard serving anonymous visitors? */
export function isPublicMode() {
  return process.env.DASHBOARD_PUBLIC_MODE === "1";
}

// Fields that make a row linkable to one person, or that identify them outright.
// `clientIp` is the linkage key even when hashed: the hash is stable, so it acts
// as a session identifier for anyone who filters on it.

export const PER_VISITOR_FIELDS = [
  "clientIp",
  "userAgent",
  "requestId",
  "traceId",
  "custom",
  "message",
];


export const PUBLIC_SEARCH_FIELDS = [
  "path",
  "method",
  "host",
  "country",
  "source",
];

// Operator view: searching by IP or user agent is the point.
export const PRIVATE_SEARCH_FIELDS = [
  ...PUBLIC_SEARCH_FIELDS,
  "clientIp",
  "userAgent",
  "message",
];

/** Fields the ?q= filter is allowed to see. */
export function searchableFields(publicMode = isPublicMode()) {
  return publicMode ? PUBLIC_SEARCH_FIELDS : PRIVATE_SEARCH_FIELDS;
}


const GRANULARITY_MS = { second: 1000, minute: 60_000, hour: 3_600_000 };
const DEFAULT_TIME_GRANULARITY = "minute";

/** Granularity of published timestamps: "second" | "minute" | "hour". */
export function publicTimeGranularity() {
  const raw = (process.env.DASHBOARD_PUBLIC_TIME_GRANULARITY || "")
    .trim()
    .toLowerCase();
  // An unrecognised value falls back to the default rather than to "second":
  // a typo should not silently restore full precision.
  return GRANULARITY_MS[raw] ? raw : DEFAULT_TIME_GRANULARITY;
}

/** Floor a millisecond timestamp to the published granularity. */
export function coarsenTimestamp(ms, granularity = publicTimeGranularity()) {
  const step = GRANULARITY_MS[granularity] ?? GRANULARITY_MS.minute;
  const value = Number(ms);
  if (!Number.isFinite(value)) return ms;
  return Math.floor(value / step) * step;
}

/**
 * Strip a single event row down to something unlinkable.
 *
 * What survives is deliberately coarse: roughly when, what was requested, how it
 * responded, roughly where from, and what kind of client. With no stable
 * identifier, two rows can't be tied to the same person.
 */
export function publicEvent(record) {
  const safe = { ...record };
  PER_VISITOR_FIELDS.forEach((field) => {
    delete safe[field];
  });


  delete safe.id;

  safe.timestamp = coarsenTimestamp(record?.timestamp);
  return safe;
}


/** Public-safe event rows. */
export function publicEvents(page = []) {
  return page.map(publicEvent);
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
 * Country-level aggregates are safe to publish as counts; individual IP
 * addresses are always withheld in public mode, regardless of country size —
 * that protection is about address identifiability, not about crowd size.
 */
export function publicLocations(data) {
  const countries = (data.countries ?? []).map((country) => ({
    country: country.country,
    requests: country.requests,
    errors: country.errors,
    uniqueIps: country.uniqueIps, // a count, not a list
    ips: [], // withheld
    ipsTruncated: 0,
    ipsWithheld: true,
  }));

  return {
    ...data,
    countries,
    publicMode: true,
  };
}
