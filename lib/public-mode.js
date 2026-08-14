// lib/public-mode.js — server only
//


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

// ---------------------------------------------------------------------------
// TIMESTAMP PRECISION
// ---------------------------------------------------------------------------
// A published row carrying a second-precision timestamp is the weakest part of
// calling this data "aggregated". Nobody can find a stranger's row in it — but
// someone who already holds a record of a specific request (the visitor
// themselves, an employer's proxy log, an ISP) can locate the matching row and
// read off what was requested. Exact milliseconds are a near-unique join key.
//
// Coarsening the timestamp breaks that join. It is not anonymisation and this
// file should not pretend otherwise: it widens the bucket a known request could
// fall into from one millisecond to a minute or an hour, which is worth a great
// deal at moderate traffic and very little at two requests a day.
//
// Rounding is DOWN, not to nearest: flooring never moves an event into the
// future, never reorders two events, and keeps every bucket boundary aligned
// with the chart buckets in lib/aggregate.js.
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

  // `id` is built from the millisecond timestamp when Vercel doesn't supply one
  // (`${timestamp}-${timestamp % 1e6}` in lib/drain-parse.js), so publishing it
  // would hand straight back the precision the line below removes. The UI only
  // uses `id` as a React key and falls back gracefully without it.
  delete safe.id;

  safe.timestamp = coarsenTimestamp(record?.timestamp);
  return safe;
}

// ---------------------------------------------------------------------------
// CITY NAMES: PUBLISHED ONLY WHERE A CROWD HIDES THE INDIVIDUAL
// ---------------------------------------------------------------------------
// A country name is safe to publish per-row: "someone in Spain called /co2-api
// at 14:32" describes 48 million people. A city is not, at least not always.
// "someone in Vitoria-Gasteiz called /co2-api at 14:32" can describe one person,
// and if the same city appears on three rows minutes apart, those rows are that
// person's session — which is exactly what public mode exists to prevent.
//
// What makes a city safe is not the city, it's the crowd. So the rule here is
// k-anonymity: a city name is released only if at least K DISTINCT VISITORS from
// that city appear in the same result set. Below K, the city is dropped and the
// row keeps its country only.
//
// Two details that matter more than they look:
//
//  1. The threshold counts VISITORS, not requests. A city with 900 requests from
//     one polling script is a single person, and a request-count threshold would
//     wave it straight through. Distinct client IPs (hashed is fine — we only
//     need to count them, not read them) is the honest denominator.
//
//  2. It must be measured on the data being RELEASED, not on the whole store.
//     /api/drains/events accepts ?q= and ?status= filters. A city might clear K
//     across the full day and still be one lonely row inside ?q=/api/methane —
//     which is where the linkage would happen. So the count is computed after
//     filtering, and the gate is re-evaluated per request.
//
// Set DASHBOARD_PUBLIC_CITY_MIN_VISITORS to tune K. Anything below 2 disables
// city release entirely: a "gate" of 1 is not a gate, and this way a typo or a
// stray `=0` fails closed instead of publishing every city. There is
// deliberately NO env value that turns the gate off while keeping cities.
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

/**
 * The locations tree exists to list addresses per country, so in public mode the
 * per-IP arrays are removed entirely. Country and city counts remain, which is
 * the part that reads as a map of where your traffic comes from.
 *
 * The city chips get the same k-anonymity gate as the event rows. They need it
 * just as much: a chip reading "Vitoria-Gasteiz · 3" is one visitor's town
 * published on the open web, and clicking it filters the panel down to them.
 * Cities below the threshold are dropped from the list but their requests stay
 * counted in the country total, so nothing goes missing from the numbers — only
 * from the labels. `cityGate.withheld` reports how many were dropped, so the UI
 * can say so rather than implying the list is complete.
 */
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
