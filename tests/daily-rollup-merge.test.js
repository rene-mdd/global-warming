// tests/daily-rollup-merge.test.js
//
// Two independent writers share one day's drain:daily record:
// pages/api/drains/rollup.js writes drain-derived fields, and
// pages/api/drains/traffic-total.js writes totalTrafficRequests separately
// (see lib/drain-store.js). writeDailySummary() has to merge, not replace —
// this pins that behavior against the file backend. (Not tested against the
// Redis backend here: that needs live Upstash credentials, which local test
// runs must never touch — see lib/store-redis.js for the equivalent merge.)
//
// Run with: npm test

import { test, before } from "node:test";
import assert from "node:assert/strict";

process.env.DRAIN_DISABLE_PERSIST = "1"; // in-memory only, no .data/ writes

// Dynamic, not a top-level `await import` — DATA_DIR/PERSIST_DISABLED are
// read once at module load, so the env var above has to land before the
// import runs; this project's lint parser also doesn't support top-level
// await.
let writeDailySummary;
let readDailySummaries;

before(async () => {
  ({ writeDailySummary, readDailySummaries } = await import(
    "../lib/store-file.js"
  ));
});

test("writeDailySummary merges a second writer's fields instead of erasing the first's", async () => {
  await writeDailySummary("2026-08-25", { requests: 100, uniqueVisitors: 12 });
  await writeDailySummary("2026-08-25", { totalTrafficRequests: 500 });

  const [day] = await readDailySummaries({ days: 1 });
  assert.equal(day.date, "2026-08-25");
  assert.equal(day.requests, 100);
  assert.equal(day.uniqueVisitors, 12);
  assert.equal(day.totalTrafficRequests, 500);
});

test("a re-run overwrites only its own fields, not the other writer's", async () => {
  await writeDailySummary("2026-08-26", { requests: 10, uniqueVisitors: 3 });
  await writeDailySummary("2026-08-26", { totalTrafficRequests: 40 });
  await writeDailySummary("2026-08-26", { requests: 99, uniqueVisitors: 7 }); // backfill re-run

  const days = await readDailySummaries({ days: 30 });
  const day = days.find((d) => d.date === "2026-08-26");
  assert.equal(day.requests, 99);
  assert.equal(day.uniqueVisitors, 7);
  assert.equal(day.totalTrafficRequests, 40); // untouched by the re-run
});
