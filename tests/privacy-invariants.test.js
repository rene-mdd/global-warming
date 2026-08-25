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
  publicStats,
  publicLocations,
  publicTimeGranularity,
  coarsenTimestamp,
} from "../lib/public-mode.js";
import {
  hashIp,
  anonymizeIp,
  anonymizeMode,
  applyPrivacy,
  truncateIp,
} from "../lib/privacy.js";
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
    clientIp: SECRET_IP,
    userAgent: SECRET_UA,
    browser: "Chrome",
    os: "macOS",
    referer: "https://elsewhere.example/page?token=abc",
    requestId: "req_abc123",
    traceId: "trace_abc123",
    custom: { handler: "co2", accountId: 42 },
    message: SECRET_MSG,
    ...overrides,
  };
}

const PUBLIC_ENV = [
  "DASHBOARD_PUBLIC_CITY_MIN_VISITORS",
  "DASHBOARD_PUBLIC_TIME_GRANULARITY",
  "DRAIN_RETENTION_HOURS",
];

const PRIVACY_ENV = ["DRAIN_ANONYMIZE_IPS", "DRAIN_IP_SALT"];

beforeEach(() => {
  // Every helper reads env at call time, so a leftover value from one test would
  // silently change another's meaning.
  [...PUBLIC_ENV, ...PRIVACY_ENV].forEach((key) => {
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
  [SECRET_IP, SECRET_UA, "leak@example.com", "accountId"].forEach((needle) => {
    assert.equal(
      serialised.includes(needle),
      false,
      `public row leaked ${needle}`,
    );
  });
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
  ["clientIp", "userAgent", "message"].forEach((field) => {
    assert.ok(PRIVATE_SEARCH_FIELDS.includes(field));
  });
  assert.deepEqual(searchableFields(true), PUBLIC_SEARCH_FIELDS);
  assert.deepEqual(searchableFields(false), PRIVATE_SEARCH_FIELDS);
});

// ---------------------------------------------------------------------------
// 3. Timestamp precision
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
// 4. Aggregates
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

test("publicLocations withholds address lists but keeps country counts", () => {
  const data = publicLocations({
    countries: [
      {
        country: "ES",
        requests: 59,
        errors: 1,
        uniqueIps: 9,
        ips: [{ ip: SECRET_IP, requests: 6 }],
      },
    ],
  });

  const country = data.countries[0];
  assert.deepEqual(country.ips, []);
  assert.equal(country.ipsWithheld, true);
  assert.equal(country.uniqueIps, 9, "the count is fine to publish");
  assert.equal(
    "cityGate" in data,
    false,
    "there is no city gate to report anymore",
  );
  assert.equal(JSON.stringify(data).includes(SECRET_IP), false);
});

// ---------------------------------------------------------------------------
// 5. Read-endpoint guards
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
// 5b. Operator elevation
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
// 6. Minimisation at the source
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

test("logRequest captures country, but never city even when the header is present", () => {
  const original = console.log;
  console.log = () => {};
  let payload;
  try {
    payload = logRequest({
      method: "GET",
      url: "/api/co2-api",
      headers: {
        "x-vercel-ip-country": "ES",
        // Vercel RFC3986-encodes city names; still must never be captured.
        "x-vercel-ip-city": "San%20Francisco",
      },
    });
  } finally {
    console.log = original;
  }
  assert.equal(payload.country, "ES");
  assert.equal("city" in payload, false, "city must not be captured at all");
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

// ---------------------------------------------------------------------------
// 7. IP anonymisation
// ---------------------------------------------------------------------------

test("hashIp is stable for the same IP and salt", () => {
  const a = hashIp(SECRET_IP, "salt-one");
  const b = hashIp(SECRET_IP, "salt-one");
  assert.equal(a, b);
  assert.equal(a.length, 16);
  assert.match(a, /^[0-9a-f]{16}$/);
});

test("hashIp depends on the salt, not just the IP", () => {
  const a = hashIp(SECRET_IP, "salt-one");
  const b = hashIp(SECRET_IP, "salt-two");
  assert.notEqual(a, b);
});

test("hashIp output never contains the original IP", () => {
  const hashed = hashIp(SECRET_IP, "salt-one");
  assert.equal(hashed.includes(SECRET_IP), false);
});

test("anonymizeIp in hash mode throws when no salt is configured", () => {
  assert.throws(() => anonymizeIp(SECRET_IP, "hash"), /DRAIN_IP_SALT/);
});

test("anonymizeIp in hash mode matches hashIp when a salt is configured", () => {
  process.env.DRAIN_IP_SALT = "test-salt";
  assert.equal(anonymizeIp(SECRET_IP, "hash"), hashIp(SECRET_IP, "test-salt"));
});

test("anonymizeIp truncates IPv4 to /24 and IPv6 to /48", () => {
  assert.equal(anonymizeIp("203.0.113.9", "truncate"), "203.0.113.0");
  assert.equal(truncateIp("203.0.113.9"), "203.0.113.0");
  assert.equal(
    anonymizeIp("2001:db8:85a3:0:0:8a2e:370:7334", "truncate"),
    "2001:db8:85a3::",
  );
});

test("anonymizeIp passes through unchanged in off mode, and drops in drop mode", () => {
  assert.equal(anonymizeIp(SECRET_IP, "off"), SECRET_IP);
  assert.equal(anonymizeIp(SECRET_IP, "drop"), undefined);
});

test("anonymizeMode defaults to off, and falls back to off on an invalid value", () => {
  assert.equal(anonymizeMode(), "off");
  process.env.DRAIN_ANONYMIZE_IPS = "bogus";
  assert.equal(anonymizeMode(), "off");
  process.env.DRAIN_ANONYMIZE_IPS = "HASH";
  assert.equal(anonymizeMode(), "hash");
});

test("applyPrivacy never leaves the raw IP in clientIp, custom, or the rebuilt message", () => {
  process.env.DRAIN_IP_SALT = "test-salt";
  const record = {
    clientIp: SECRET_IP,
    latitude: "42.8467",
    longitude: "-2.6716",
    custom: { clientIp: SECRET_IP, postalCode: "01001", accountId: 42 },
    message: `[traffic] ${JSON.stringify({ clientIp: SECRET_IP, accountId: 42 })}`,
  };

  const scrubbed = applyPrivacy(record, "hash");

  assert.notEqual(scrubbed.clientIp, SECRET_IP);
  assert.equal("latitude" in scrubbed, false);
  assert.equal("longitude" in scrubbed, false);
  assert.notEqual(scrubbed.custom.clientIp, SECRET_IP);
  assert.equal("postalCode" in scrubbed.custom, false);
  assert.equal(scrubbed.message.includes(SECRET_IP), false);
  assert.equal(scrubbed.privacyMode, "hash");
});
