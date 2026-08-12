// lib/aggregate.js
//
// Pure aggregation: normalized records in, chart-ready series and breakdowns
// out. No I/O, no env access, so it's trivially testable and could run either
// side of the wire (today it runs in the /api/drains/stats route).

import { mergeRequestRecords } from "./drain-parse";

/** Bucket size in ms, chosen so a chart lands in the 20-100 bar range. */
export function pickBucketMs(windowMs) {
  const MIN = 60 * 1000;
  if (windowMs <= 6 * 60 * MIN) return 5 * MIN; // <= 6h  -> 5 minutes
  if (windowMs <= 48 * 60 * MIN) return 60 * MIN; // <= 48h -> 1 hour
  if (windowMs <= 31 * 24 * 60 * MIN) return 24 * 60 * MIN; // <= 31d -> 1 day
  return 7 * 24 * 60 * MIN; // longer -> 1 week
}

export function statusClass(statusCode) {
  const code = Number(statusCode);
  if (!Number.isFinite(code) || code < 0) return "other";
  if (code < 200) return "other";
  if (code < 300) return "s2xx";
  if (code < 400) return "s3xx";
  if (code < 500) return "s4xx";
  return "s5xx";
}

/** Count occurrences of a field, returning the top `limit` plus an "Other" row. */
function topBreakdown(
  records,
  getKey,
  { limit = 8, includeOther = true } = {},
) {
  const counts = new Map();
  records.forEach((record) => {
    const key = getKey(record);
    if (key === undefined || key === null || key === "") return;
    const str = String(key);
    counts.set(str, (counts.get(str) ?? 0) + 1);
  });

  const sorted = [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));

  if (!includeOther || sorted.length <= limit) return sorted.slice(0, limit);

  const head = sorted.slice(0, limit);
  const tailCount = sorted
    .slice(limit)
    .reduce((sum, row) => sum + row.count, 0);
  if (tailCount > 0)
    head.push({ key: "Other", count: tailCount, isOther: true });
  return head;
}

/**
 * Collapse log entries into one row per HTTP request.
 *
 * Why: a single request commonly emits several log entries sharing a
 * `requestId` - the proxy/request line plus one per console.log. Counting
 * entries would over-report traffic (badly, if your handlers log a lot), so we
 * merge by requestId first. Entries that aren't about a request at all (build
 * output) are excluded here and reported separately.
 */
export function toRequests(records) {
  const byRequestId = new Map();
  const withoutId = [];

  records.forEach((record) => {
    if (!record.isRequest) return;

    if (!record.requestId) {
      // No id to group on - treat it as its own request.
      withoutId.push(record);
      return;
    }

    const existing = byRequestId.get(record.requestId);
    byRequestId.set(
      record.requestId,
      existing ? mergeRequestRecords(existing, record) : record,
    );
  });

  return [...byRequestId.values(), ...withoutId];
}

/**
 * Build every number the dashboard renders.
 *
 * @param records  normalized records (any order)
 * @param startTime,endTime  window bounds in ms
 */
export function aggregate(records, { startTime, endTime }) {
  const windowMs = Math.max(1, endTime - startTime);
  const bucketMs = pickBucketMs(windowMs);

  const rawInWindow = records.filter((r) => {
    const t = r.timestamp ?? 0;
    return t >= startTime && t <= endTime;
  });

  // One row per request, not per log line.
  const inWindow = toRequests(rawInWindow);

  const nonRequestLogs = rawInWindow.filter((r) => !r.isRequest);
  const buildLogs = nonRequestLogs.filter((r) => r.source === "build").length;

  // --- Time series, pre-seeded so gaps render as zero rather than vanishing ---
  const firstBucket = Math.floor(startTime / bucketMs) * bucketMs;
  const buckets = new Map();
  for (let t = firstBucket; t <= endTime; t += bucketMs) {
    buckets.set(t, {
      t,
      total: 0,
      s2xx: 0,
      s3xx: 0,
      s4xx: 0,
      s5xx: 0,
      other: 0,
    });
  }

  const uniqueIps = new Set();
  const uniqueRoutes = new Set();
  let errors = 0;
  let serverErrors = 0;
  let bytes = 0;
  let withGeoHeaders = 0;
  let botRequests = 0;
  // Records stored BEFORE anonymisation was switched on still hold raw IPs.
  // Anonymisation happens at ingest, so enabling it later is not retroactive —
  // without this count the UI would claim "hashed" over a store that is
  // partly raw.
  let unanonymised = 0;

  for (const record of inWindow) {
    const bucketKey = Math.floor((record.timestamp ?? 0) / bucketMs) * bucketMs;
    const bucket = buckets.get(bucketKey);
    if (bucket) {
      bucket.total += 1;
      bucket[statusClass(record.statusCode)] += 1;
    }

    if (record.clientIp) uniqueIps.add(record.clientIp);
    if (record.route) uniqueRoutes.add(record.route);

    const code = Number(record.statusCode);
    if (Number.isFinite(code) && code >= 400) errors += 1;
    if (Number.isFinite(code) && code >= 500) serverErrors += 1;

    if (Number.isFinite(Number(record.responseByteSize))) {
      bytes += Number(record.responseByteSize);
    }
    if (record.geoSource === "headers") withGeoHeaders += 1;
    if (record.isBot) botRequests += 1;

    // A record carries privacyMode only if it was scrubbed on the way in.
    if (record.clientIp && !record.privacyMode) unanonymised += 1;
  }

  const series = [...buckets.values()].sort((a, b) => a.t - b.t);
  const requests = inWindow.length;

  return {
    window: { startTime, endTime, bucketMs },

    totals: {
      // One per HTTP request (log entries sharing a requestId are merged).
      requests,
      // Raw log entries received, for comparison — this is what you're billed
      // on, and it's normally higher than `requests`.
      logEvents: rawInWindow.length,
      // Entries that aren't about a request (build stdout/stderr etc.).
      nonRequestLogs: nonRequestLogs.length,
      buildLogs,
      uniqueIps: uniqueIps.size,
      uniqueRoutes: uniqueRoutes.size,
      errors,
      serverErrors,
      errorRate: requests ? errors / requests : 0,
      bytes,
      botRequests,
      // How many records carry TRUE visitor geo (from x-vercel-ip-* headers)
      // rather than an edge-region approximation. Drives the dashboard hint.
      withGeoHeaders,
      geoHeaderCoverage: requests ? withGeoHeaders / requests : 0,
      // How many records in this window still hold an un-anonymised IP.
      unanonymisedRecords: unanonymised,
    },

    series,

    breakdowns: {
      country: topBreakdown(inWindow, (r) => r.country, { limit: 8 }),
      route: topBreakdown(inWindow, (r) => r.route, { limit: 8 }),
      method: topBreakdown(inWindow, (r) => r.method, { limit: 6 }),
      statusCode: topBreakdown(inWindow, (r) => r.statusCode, { limit: 8 }),
      browser: topBreakdown(inWindow, (r) => r.browser, { limit: 6 }),
      os: topBreakdown(inWindow, (r) => r.os, { limit: 6 }),
      device: topBreakdown(inWindow, (r) => r.device, { limit: 5 }),
      edgeRegion: topBreakdown(inWindow, (r) => r.edgeRegion, { limit: 8 }),
      host: topBreakdown(inWindow, (r) => r.host, { limit: 6 }),
      source: topBreakdown(inWindow, (r) => r.source, { limit: 6 }),
      clientIp: topBreakdown(inWindow, (r) => r.clientIp, {
        limit: 8,
        includeOther: false,
      }),
      deploymentId: topBreakdown(inWindow, (r) => r.deploymentId, { limit: 5 }),
      referer: topBreakdown(inWindow, (r) => r.referer, { limit: 6 }),
    },

    // Status-class totals for the distribution chart, in fixed semantic order.
    statusClasses: [
      {
        key: "s2xx",
        label: "2xx success",
        count: series.reduce((s, b) => s + b.s2xx, 0),
      },
      {
        key: "s3xx",
        label: "3xx redirect",
        count: series.reduce((s, b) => s + b.s3xx, 0),
      },
      {
        key: "s4xx",
        label: "4xx client error",
        count: series.reduce((s, b) => s + b.s4xx, 0),
      },
      {
        key: "s5xx",
        label: "5xx server error",
        count: series.reduce((s, b) => s + b.s5xx, 0),
      },
    ],
  };
}

/**
 * "Which IPs are coming from where" — a country -> city -> IP tree.
 *
 * Deliberately a separate function (and a separate endpoint) from aggregate():
 * the payload can be large, it needs its own caps, and the dashboard only
 * fetches it when the panel is on screen.
 *
 * Records are merged by requestId first, same as everywhere else, so an IP that
 * emitted three log lines for one request counts once.
 *
 * Caps are reported back rather than applied silently — a truncated list that
 * looks complete is worse than one that says it isn't.
 */
/**
 * How trustworthy a country's location is: "accurate" when every request
 * carried true geo headers, "approximate" when none did, "mixed" otherwise.
 * Early returns instead of a chained ternary.
 */
function geoQualityFor(entry) {
  if (entry.approxCount === 0) return "accurate";
  if (entry.accurateCount === 0) return "approximate";
  return "mixed";
}

export function aggregateLocations(
  records,
  { startTime, endTime, limitCountries = 15, limitIpsPerCountry = 25 } = {},
) {
  const inWindow = toRequests(
    records.filter((r) => {
      const t = r.timestamp ?? 0;
      return t >= startTime && t <= endTime;
    }),
  );

  const countries = new Map();
  let unknownRequests = 0;
  const unknownIps = new Set();

  inWindow.forEach((record) => {
    const code = record.country;
    if (!code) {
      unknownRequests += 1;
      if (record.clientIp) unknownIps.add(record.clientIp);
      return;
    }

    if (!countries.has(code)) {
      countries.set(code, {
        country: code,
        requests: 0,
        errors: 0,
        ipMap: new Map(),
        cityMap: new Map(),
        accurateCount: 0,
        approxCount: 0,
      });
    }
    const entry = countries.get(code);
    entry.requests += 1;

    const status = Number(record.statusCode);
    if (Number.isFinite(status) && status >= 400) entry.errors += 1;

    // Track how trustworthy this country actually is (header geo vs the edge
    // region guess), so the UI can mark it instead of implying precision.
    if (record.geoSource === "headers") entry.accurateCount += 1;
    else entry.approxCount += 1;

    if (record.city) {
      const city = entry.cityMap.get(record.city) ?? {
        city: record.city,
        requests: 0,
        ips: new Set(),
      };
      city.requests += 1;
      if (record.clientIp) city.ips.add(record.clientIp);
      entry.cityMap.set(record.city, city);
    }

    const ip = record.clientIp;
    if (ip) {
      const existing = entry.ipMap.get(ip);
      if (!existing) {
        entry.ipMap.set(ip, {
          ip,
          requests: 1,
          errors: Number.isFinite(status) && status >= 400 ? 1 : 0,
          city: record.city,
          firstSeen: record.timestamp,
          lastSeen: record.timestamp,
          isBot: Boolean(record.isBot),
          browser: record.browser,
          os: record.os,
          routes: new Map(record.route ? [[record.route, 1]] : []),
        });
      } else {
        existing.requests += 1;
        if (Number.isFinite(status) && status >= 400) existing.errors += 1;
        if (record.timestamp < existing.firstSeen)
          existing.firstSeen = record.timestamp;
        if (record.timestamp > existing.lastSeen)
          existing.lastSeen = record.timestamp;
        if (!existing.city && record.city) existing.city = record.city;
        if (record.isBot) existing.isBot = true;
        if (record.route) {
          existing.routes.set(
            record.route,
            (existing.routes.get(record.route) ?? 0) + 1,
          );
        }
      }
    }
  });

  const sorted = [...countries.values()].sort(
    (a, b) => b.requests - a.requests,
  );
  const shownCountries = sorted.slice(0, limitCountries);

  const result = shownCountries.map((entry) => {
    const ips = [...entry.ipMap.values()].sort(
      (a, b) => b.requests - a.requests,
    );
    const shownIps = ips.slice(0, limitIpsPerCountry);

    return {
      country: entry.country,
      requests: entry.requests,
      errors: entry.errors,
      uniqueIps: entry.ipMap.size,
      // "headers" = every request had true geo, "mixed"/"approx" otherwise.
      geoQuality: geoQualityFor(entry),
      cities: [...entry.cityMap.values()]
        .map((c) => ({
          city: c.city,
          requests: c.requests,
          uniqueIps: c.ips.size,
        }))
        .sort((a, b) => b.requests - a.requests),
      ips: shownIps.map((ip) => ({
        ip: ip.ip,
        requests: ip.requests,
        errors: ip.errors,
        city: ip.city,
        firstSeen: ip.firstSeen,
        lastSeen: ip.lastSeen,
        isBot: ip.isBot,
        browser: ip.browser,
        os: ip.os,
        topRoute:
          [...ip.routes.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
      })),
      ipsTruncated: Math.max(0, ips.length - shownIps.length),
    };
  });

  return {
    countries: result,
    countriesTruncated: Math.max(0, sorted.length - shownCountries.length),
    unknown: { requests: unknownRequests, uniqueIps: unknownIps.size },
    totalRequests: inWindow.length,
  };
}
