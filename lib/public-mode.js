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
  "city",
  "countryRegion",
  "latitude",
  "longitude",
  "timezone",
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
  "city",
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


const DEFAULT_CITY_MIN_VISITORS = 5;

/** K for the city gate. Returns 0 when city release is disabled. */
export function cityMinVisitors() {
  const raw = process.env.DASHBOARD_PUBLIC_CITY_MIN_VISITORS;
  if (raw === undefined || raw === "") return DEFAULT_CITY_MIN_VISITORS;
  const parsed = Math.floor(Number(raw));
  // Not a number, negative, or a meaningless threshold -> no cities.
  if (!Number.isFinite(parsed) || parsed < 2) return 0;
  return parsed;
}

/**
 * city -> number of distinct visitors, over the records actually being served.
 *
 * Records with no client IP contribute nothing. That is intentional: an
 * unidentifiable visitor can't be counted toward a crowd, so unmeasurable data
 * pushes cities below the threshold rather than over it.
 */
export function cityVisitorCounts(records = []) {
  const visitors = new Map();
  records.forEach((record) => {
    const city = record?.city;
    const visitor = record?.clientIp;
    if (!city || !visitor) return;
    if (!visitors.has(city)) visitors.set(city, new Set());
    visitors.get(city).add(visitor);
  });

  const counts = new Map();
  visitors.forEach((set, city) => counts.set(city, set.size));
  return counts;
}

/**
 * Public-safe event rows with the city gate applied.
 *
 * @param page          the rows about to be returned
 * @param windowRecords the full post-filter result set the page came from,
 *                      which is what the crowd is measured against
 */
export function publicEvents(page = [], windowRecords = page) {
  const min = cityMinVisitors();
  const counts = min ? cityVisitorCounts(windowRecords) : new Map();

  return page.map((record) => {
    const safe = publicEvent(record);
    if (min && record.city && (counts.get(record.city) ?? 0) >= min) {
      safe.city = record.city;
    }
    return safe;
  });
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

export function publicLocations(data) {
  const minVisitors = cityMinVisitors();
  let withheld = 0;
  // Can we even measure crowds? With DRAIN_ANONYMIZE_IPS=drop there are no
  // visitor identifiers to count, so every city fails the gate. That is the
  // correct outcome, but the UI should explain it rather than look broken.
  let measurable = false;

  const countries = (data.countries ?? []).map((country) => {
    const cities = country.cities ?? [];
    if (cities.some((city) => (city.uniqueIps ?? 0) > 0)) measurable = true;

    const shown = minVisitors
      ? cities.filter((city) => (city.uniqueIps ?? 0) >= minVisitors)
      : [];
    withheld += cities.length - shown.length;

    return {
      country: country.country,
      requests: country.requests,
      errors: country.errors,
      uniqueIps: country.uniqueIps, // a count, not a list
      geoQuality: country.geoQuality,
      cities: shown,
      ips: [], // withheld
      ipsTruncated: 0,
      ipsWithheld: true,
    };
  });

  return {
    ...data,
    countries,
    cityGate: { minVisitors, withheld, measurable },
    publicMode: true,
  };
}
