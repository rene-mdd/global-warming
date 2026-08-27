// lib/public-mode.js — server only
//
// Enable with DASHBOARD_PUBLIC_MODE=1.

/** Is the dashboard serving anonymous visitors? */
export function isPublicMode() {
  return process.env.DASHBOARD_PUBLIC_MODE === "1";
}

// Fields that identify a visitor or let rows be linked back to one person.
// `clientIp` acts as a stable per-visitor identifier even when hashed.
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
  // Any unrecognised value falls back to the default granularity.
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
 * Strips a single event row down to non-identifying fields: roughly when,
 * what was requested, how it responded, roughly where from, and what kind
 * of client. No stable identifier survives, so rows can't be linked to one
 * visitor.
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
 * Publishes the stats object with the clientIp breakdown (a per-visitor
 * "top callers" list) and referer breakdown removed. The uniqueIps count in
 * totals is unaffected.
 */
export function publicStats(stats) {
  if (!stats?.breakdowns) return { ...stats, publicMode: true };

  const breakdowns = { ...stats.breakdowns };
  delete breakdowns.clientIp;
  delete breakdowns.referer;

  return { ...stats, breakdowns, publicMode: true };
}

/**
 * Publishes country-level request/error/uniqueIps counts; always withholds
 * the per-country IP list, regardless of how many visitors share a country.
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
