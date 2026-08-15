// tests/privacy-invariants.test.js
//
// Run with:  npm test
//


import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  PER_VISITOR_FIELDS,
  PUBLIC_SEARCH_FIELDS,
  PRIVATE_SEARCH_FIELDS,
  searchableFields,
  publicEvent,
  publicEvents,
  publicStats,
  publicLocations,
  cityMinVisitors,
  publicTimeGranularity,
  coarsenTimestamp,
} from "../lib/public-mode.js";
import { clampHours, setReadCacheHeaders } from "../lib/api-read.js";
import checkApiAuth from "../lib/api-auth.js";
import { logRequest } from "../lib/log-request.js";

// Values chosen to be findable by substring search in a serialised payload.
const SECRET_IP = "203.0.113.9";
const SECRET_UA = "Mozilla/5.0 (VerySpecificDevice)";
const SECRET_MSG = '[traffic] {"accountEmail":"leak@example.com"}';

function fullRecord(overrides = {}) {
  return {
    id: "1755091927481-091927",
    timestamp: Date.parse("2026-08-13T14:32:07.481Z"),
    path: "/api/co2-api",
    method: "GET",
    statusCode: 200,
    host: "www.global-warming.org",
    source: "lambda",
    country: "ES",
    city: "Vitoria-Gasteiz",
    clientIp: SECRET_IP,
    userAgent: SECRET_UA,
    browser: "Chrome",
    os: "macOS",
    referer: "https://elsewhere.example/page?token=abc",
    requestId: "req_abc123",
    traceId: "trace_abc123",
    countryRegion: "PV",
    latitude: "42.8467",
    longitude: "-2.6716",
    timezone: "Europe/Madrid",
    custom: { handler: "co2", accountId: 42 },
    message: SECRET_MSG,
    ...overrides,
  };
}

/** N distinct visitors from `city`, one request each. */
function visitorsFrom(city, count, path = "/api/co2-api") {
  return Array.from({ length: count }, (_, i) => ({
    ...fullRecord(),
    city,
    path,
    clientIp: `${city}-visitor-${i}`,
  }));
}

const PUBLIC_ENV = [
  "DASHBOARD_PUBLIC_CITY_MIN_VISITORS",
  "DASHBOARD_PUBLIC_TIME_GRANULARITY",
  "DRAIN_RETENTION_HOURS",
];

beforeEach(() => {
  // Every helper reads env at call time, so a leftover value from one test would
  // silently change another's meaning.
  PUBLIC_ENV.forEach((key) => {
    delete process.env[key];
  });
});

// ---------------------------------------------------------------------------
// 1. Field stripping
// ---------------------------------------------------------------------------

test("publicEvent removes every field listed as per-visitor", () => {
  const safe = publicEvent(fullRecord());
  PER_VISITOR_FIELDS.forEach((field) => {
    assert.equal(
      field in safe,
      false,
      `${field} is listed as per-visitor but survived into the public row`,
    );
  });
});

test("publicEvent removes the id, which encodes the millisecond timestamp", () => {
  // `${timestamp}-${timestamp % 1e6}` in drain-parse: publishing the id would
  // hand back the precision the coarsening removes.
  assert.equal("id" in publicEvent(fullRecord()), false);
});

test("no sensitive VALUE survives anywhere in a serialised public row", () => {
  // Field-name assertions miss a value that gets copied to a differently named
  // field. This checks the payload as text.
  const serialised = JSON.stringify(publicEvent(fullRecord()));
  [SECRET_IP, SECRET_UA, "leak@example.com", "accountId", "42.8467"].forEach(
    (needle) => {
      assert.equal(
        serialised.includes(needle),
        false,
        `public row leaked ${needle}`,
      );
    },
  );
});

test("publicEvent keeps the fields the dashboard actually needs", () => {
  const safe = publicEvent(fullRecord());
  ["path", "method", "statusCode", "country", "browser", "os", "host"].forEach(
    (field) => {
      assert.ok(field in safe, `${field} should still be published`);
    },
  );
});

// ---------------------------------------------------------------------------
// 2. The search oracle
// ---------------------------------------------------------------------------

test("no public search field is a per-visitor field", () => {
  // THE regression guard for the oracle: a filter that matches a stripped field
  // answers questions about it one query at a time.
  PUBLIC_SEARCH_FIELDS.forEach((field) => {
    assert.equal(
      PER_VISITOR_FIELDS.includes(field),
      false,
      `?q= may match ${field}, which is stripped from responses — that is an oracle`,
    );
  });
});

test("the operator search list still covers IP and user agent", () => {
  ["clientIp", "userAgent", "city", "message"].forEach((field) => {
    assert.ok(PRIVATE_SEARCH_FIELDS.includes(field));
  });
  assert.deepEqual(searchableFields(true), PUBLIC_SEARCH_FIELDS);
  assert.deepEqual(searchableFields(false), PRIVATE_SEARCH_FIELDS);
});

// ---------------------------------------------------------------------------
// 3. The city k-anonymity gate
// ---------------------------------------------------------------------------

test("a city with enough distinct visitors is published", () => {
  const records = visitorsFrom("Madrid", 6);
  const cities = publicEvents(records, records).map((r) => r.city);
  assert.deepEqual([...new Set(cities)], ["Madrid"]);
});

test("a city below the threshold is withheld", () => {
  const records = visitorsFrom("Vitoria-Gasteiz", 2);
  publicEvents(records, records).forEach((r) => {
    assert.equal(r.city, undefined);
  });
});

test("the threshold counts visitors, not requests", () => {
  // 50 requests from one poller must not look like a crowd. A request-count
  // threshold would let this straight through.
  const records = Array.from({ length: 50 }, () => ({
    ...fullRecord(),
    city: "Teruel",
    clientIp: "single-poller",
  }));
  publicEvents(records, records).forEach((r) => {
    assert.equal(r.city, undefined);
  });
});

test("records with no visitor identifier never count toward a crowd", () => {
  const records = Array.from({ length: 9 }, () => ({
    ...fullRecord(),
    city: "Bilbao",
    clientIp: undefined,
  }));
  publicEvents(records, records).forEach((r) => {
    assert.equal(r.city, undefined);
  });
});

test("the crowd is measured on the released set, not the whole store", () => {
  // Madrid clears the threshold overall, but inside the narrowed ?q= view only
  // one visitor remains — and that narrowed view is what gets served.
  const wide = [
    ...visitorsFrom("Madrid", 6, "/api/co2-api"),
    { ...fullRecord(), city: "Madrid", clientIp: "lone", path: "/api/methane" },
  ];
  assert.ok(publicEvents(wide, wide).some((r) => r.city === "Madrid"));

  const narrowed = wide.filter((r) => r.path === "/api/methane");
  publicEvents(narrowed, narrowed).forEach((r) => {
    assert.equal(r.city, undefined);
  });
});

test("a meaningless threshold disables city publication instead of removing the gate", () => {
  // A stray =0 must fail closed. There is deliberately no env value that keeps
  // cities while removing the gate.
  ["0", "1", "-5", "abc"].forEach((value) => {
    process.env.DASHBOARD_PUBLIC_CITY_MIN_VISITORS = value;
    assert.equal(cityMinVisitors(), 0, `threshold "${value}" should disable`);
    const records = visitorsFrom("Madrid", 50);
    publicEvents(records, records).forEach((r) => {
      assert.equal(r.city, undefined);
    });
  });
});

test("the threshold is configurable upward and downward within reason", () => {
  process.env.DASHBOARD_PUBLIC_CITY_MIN_VISITORS = "2";
  assert.equal(cityMinVisitors(), 2);
  const two = visitorsFrom("Vitoria-Gasteiz", 2);
  assert.ok(publicEvents(two, two).some((r) => r.city === "Vitoria-Gasteiz"));

  process.env.DASHBOARD_PUBLIC_CITY_MIN_VISITORS = "20";
  assert.equal(cityMinVisitors(), 20);
  const six = visitorsFrom("Madrid", 6);
  publicEvents(six, six).forEach((r) => assert.equal(r.city, undefined));
});

// ---------------------------------------------------------------------------
// 4. Timestamp precision
// ---------------------------------------------------------------------------

test("published timestamps default to minute precision", () => {
  assert.equal(publicTimeGranularity(), "minute");
  const { timestamp } = publicEvent(fullRecord());
  assert.equal(new Date(timestamp).toISOString(), "2026-08-13T14:32:00.000Z");
});

test("an unrecognised granularity falls back to minute, never to second", () => {
  ["bogus", "", "millisecond"].forEach((value) => {
    process.env.DASHBOARD_PUBLIC_TIME_GRANULARITY = value;
    assert.equal(publicTimeGranularity(), "minute");
  });
});

test("hour granularity is available for low-traffic sites", () => {
  process.env.DASHBOARD_PUBLIC_TIME_GRANULARITY = "hour";
  const { timestamp } = publicEvent(fullRecord());
  assert.equal(new Date(timestamp).toISOString(), "2026-08-13T14:00:00.000Z");
});

test("coarsening floors, so no event moves into the future or changes order", () => {
  const base = Date.parse("2026-08-13T14:32:07.481Z");
  const originals = [base, base + 500, base + 60_000, base + 3_600_000];
  const floored = originals.map((t) => coarsenTimestamp(t));

  floored.forEach((value, i) => {
    assert.ok(value <= originals[i], "floored value must not be in the future");
  });
  floored.forEach((value, i) => {
    if (i > 0) assert.ok(floored[i - 1] <= value, "order must be preserved");
  });
});

test("coarsening passes through values it cannot parse", () => {
  assert.equal(coarsenTimestamp(undefined), undefined);
  assert.equal(coarsenTimestamp("not-a-date"), "not-a-date");
});

// ---------------------------------------------------------------------------
// 5. Aggregates
// ---------------------------------------------------------------------------

test("publicStats drops the per-caller breakdowns but keeps the visitor count", () => {
  const stats = publicStats({
    totals: { requests: 100, uniqueIps: 12 },
    breakdowns: {
      path: [{ key: "/api/co2-api", count: 90 }],
      clientIp: [{ key: SECRET_IP, count: 40 }],
      referer: [{ key: "https://elsewhere.example/?token=abc", count: 5 }],
    },
  });

  assert.equal(stats.breakdowns.clientIp, undefined);
  assert.equal(stats.breakdowns.referer, undefined);
  assert.ok(stats.breakdowns.path);
  assert.equal(stats.totals.uniqueIps, 12);
  assert.equal(stats.publicMode, true);
  assert.equal(JSON.stringify(stats).includes(SECRET_IP), false);
});

test("publicLocations withholds address lists and gates city names", () => {
  const data = publicLocations({
    countries: [
      {
        country: "ES",
        requests: 59,
        errors: 1,
        uniqueIps: 9,
        geoQuality: "accurate",
        cities: [
          { city: "Madrid", requests: 6, uniqueIps: 6 },
          { city: "Vitoria-Gasteiz", requests: 2, uniqueIps: 2 },
          { city: "Teruel", requests: 50, uniqueIps: 1 },
        ],
        ips: [{ ip: SECRET_IP, requests: 6, city: "Madrid" }],
      },
    ],
  });

  const country = data.countries[0];
  assert.deepEqual(country.ips, []);
  assert.equal(country.ipsWithheld, true);
  assert.deepEqual(
    country.cities.map((c) => c.city),
    ["Madrid"],
  );
  assert.equal(country.uniqueIps, 9, "the count is fine to publish");
  assert.equal(data.cityGate.withheld, 2);
  assert.equal(data.cityGate.measurable, true);
  assert.equal(JSON.stringify(data).includes(SECRET_IP), false);
});

test("publicLocations reports when crowd size cannot be measured", () => {
  // DRAIN_ANONYMIZE_IPS=drop: no identifiers, so no city can be shown to be safe.
  const data = publicLocations({
    countries: [
      {
        country: "ES",
        requests: 3,
        errors: 0,
        uniqueIps: 0,
        cities: [{ city: "Madrid", requests: 3, uniqueIps: 0 }],
        ips: [],
      },
    ],
  });

  assert.deepEqual(data.countries[0].cities, []);
  assert.equal(data.cityGate.measurable, false);
  assert.equal(data.cityGate.withheld, 1);
});

// ---------------------------------------------------------------------------
// 6. Read-endpoint guards
// ---------------------------------------------------------------------------

test("hours is clamped to what is actually retained", () => {
  process.env.DRAIN_RETENTION_HOURS = "720";
  assert.equal(clampHours(99999), 720, "cannot ask past the retention window");
  assert.equal(clampHours(1), 1);
  assert.equal(clampHours(undefined), 24, "default window");
  assert.equal(clampHours(0), 24);
  assert.equal(clampHours(-5), 1);
  assert.equal(clampHours("48"), 48);
});

test("public responses are cacheable; authenticated ones never are", () => {
  const headers = {};
  const res = {
    setHeader: (key, value) => {
      headers[key] = value;
    },
  };

  setReadCacheHeaders(res, { publicMode: true });
  assert.match(headers["Cache-Control"], /s-maxage=\d+/);

  setReadCacheHeaders(res, { publicMode: false });
  assert.equal(headers["Cache-Control"], "private, no-store");
});

test("read responses vary on Authorization so a cache cannot cross the views", () => {
  // The same URL returns two different documents depending on the token. Without
  // Vary, a shared cache could serve an unreduced copy to an anonymous caller.
  const headers = {};
  const res = {
    setHeader: (key, value) => {
      headers[key] = value;
    },
  };
  setReadCacheHeaders(res, { publicMode: true });
  assert.equal(headers.Vary, "Authorization");
});

// ---------------------------------------------------------------------------
// 6b. Operator elevation
// ---------------------------------------------------------------------------

const AUTH_ENV = [
  "DASHBOARD_API_TOKEN",
  "DASHBOARD_PUBLIC_MODE",
  "DASHBOARD_ALLOW_PUBLIC_READS",
  "NODE_ENV",
];

function withAuthEnv(env, run) {
  const saved = {};
  AUTH_ENV.forEach((key) => {
    saved[key] = process.env[key];
    delete process.env[key];
  });
  Object.entries(env).forEach(([key, value]) => {
    process.env[key] = value;
  });
  try {
    return run();
  } finally {
    AUTH_ENV.forEach((key) => {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    });
  }
}

const request = (authorization) => ({
  headers: authorization ? { authorization } : {},
});

test("a valid operator token elevates the request", () => {
  withAuthEnv(
    {
      NODE_ENV: "production",
      DASHBOARD_PUBLIC_MODE: "1",
      DASHBOARD_API_TOKEN: "s3cret",
    },
    () => {
      const result = checkApiAuth(request("Bearer s3cret"));
      assert.equal(result.refusal, null);
      assert.equal(result.elevated, true);
    },
  );
});

test("an anonymous request in public mode is served, but not elevated", () => {
  withAuthEnv(
    {
      NODE_ENV: "production",
      DASHBOARD_PUBLIC_MODE: "1",
      DASHBOARD_API_TOKEN: "s3cret",
    },
    () => {
      const result = checkApiAuth(request());
      assert.equal(
        result.refusal,
        null,
        "the public dashboard must still load",
      );
      assert.equal(result.elevated, false);
    },
  );
});

test("a wrong token is never elevated", () => {
  withAuthEnv(
    {
      NODE_ENV: "production",
      DASHBOARD_PUBLIC_MODE: "1",
      DASHBOARD_API_TOKEN: "s3cret",
    },
    () => {
      assert.equal(checkApiAuth(request("Bearer wrong")).elevated, false);
      assert.equal(checkApiAuth(request("s3cret")).elevated, false);
    },
  );
});

test("with public mode off, an unauthenticated request is refused", () => {
  withAuthEnv({ NODE_ENV: "production", DASHBOARD_API_TOKEN: "s3cret" }, () => {
    const result = checkApiAuth(request());
    assert.equal(result.refusal.status, 401);
    assert.equal(result.elevated, false);
  });
});

test("production with nothing configured refuses rather than publishing", () => {
  withAuthEnv({ NODE_ENV: "production" }, () => {
    const result = checkApiAuth(request());
    assert.equal(result.refusal.status, 503);
    assert.equal(result.elevated, false);
  });
});

test("the deliberate override serves anonymously without elevating", () => {
  withAuthEnv(
    { NODE_ENV: "production", DASHBOARD_ALLOW_PUBLIC_READS: "1" },
    () => {
      const result = checkApiAuth(request());
      assert.equal(result.refusal, null);
      assert.equal(
        result.elevated,
        false,
        "an override to serve anonymously must not also unlock per-visitor detail",
      );
    },
  );
});

// ---------------------------------------------------------------------------
// 7. Minimisation at the source
// ---------------------------------------------------------------------------

test("logRequest never writes an IP, user agent or referer into the log", () => {
  // These live in Vercel's own log retention, outside this app's control and
  // untouched by DRAIN_ANONYMIZE_IPS. Vercel's proxy line already carries all
  // three, so logging them here duplicated personal data for no gain.
  const lines = [];
  const original = console.log;
  console.log = (line) => lines.push(line);

  let payload;
  try {
    payload = logRequest({
      method: "GET",
      url: "/api/co2-api?limit=5",
      headers: {
        "x-forwarded-for": `${SECRET_IP}, 70.41.3.18`,
        "x-vercel-ip-country": "ES",
        "x-vercel-ip-city": "Vitoria-Gasteiz",
        "user-agent": SECRET_UA,
        referer: "https://elsewhere.example/page?token=abc",
        host: "www.global-warming.org",
      },
    });
  } finally {
    console.log = original;
  }

  ["clientIp", "userAgent", "referer"].forEach((field) => {
    assert.equal(field in payload, false, `${field} must not be logged`);
  });

  assert.equal(lines.length, 1);
  [SECRET_IP, SECRET_UA, "elsewhere.example"].forEach((needle) => {
    assert.equal(
      lines[0].includes(needle),
      false,
      `log line leaked ${needle} into Vercel's log store`,
    );
  });
});

test("logRequest still records the path in a Pages Router app", () => {
  // req.url is RELATIVE there, and the one-argument URL constructor throws on it —
  // which silently left every log line without a path.
  const original = console.log;
  console.log = () => {};
  let payload;
  try {
    payload = logRequest({
      method: "GET",
      url: "/api/co2-api?limit=5",
      headers: {},
    });
  } finally {
    console.log = original;
  }
  assert.equal(payload.path, "/api/co2-api?limit=5");
});

test("logRequest keeps the true visitor geolocation, which is its whole purpose", () => {
  const original = console.log;
  console.log = () => {};
  let payload;
  try {
    payload = logRequest({
      method: "GET",
      url: "/api/co2-api",
      headers: {
        "x-vercel-ip-country": "ES",
        // Vercel RFC3986-encodes city names.
        "x-vercel-ip-city": "San%20Francisco",
      },
    });
  } finally {
    console.log = original;
  }
  assert.equal(payload.country, "ES");
  assert.equal(payload.city, "San Francisco");
});

test("logRequest does not collect coordinates, postal code or time zone", () => {
  const original = console.log;
  console.log = () => {};
  let payload;
  try {
    payload = logRequest({
      method: "GET",
      url: "/api/co2-api",
      headers: {
        "x-vercel-ip-latitude": "42.8467",
        "x-vercel-ip-longitude": "-2.6716",
        "x-vercel-ip-postal-code": "01001",
        "x-vercel-ip-timezone": "Europe/Madrid",
      },
    });
  } finally {
    console.log = original;
  }
  ["latitude", "longitude", "postalCode", "timezone"].forEach((field) => {
    assert.equal(field in payload, false, `${field} must not be collected`);
  });
});
