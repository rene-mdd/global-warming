// tests/daily-rollup-merge.test.js
//
// Tests that writeDailySummary() merges fields written separately by
// pages/api/drains/rollup.js and pages/api/drains/traffic-total.js into one
// day's drain:daily record, instead of one write overwriting the other.
// Covers the file backend (lib/store-file.js); the equivalent merge in the
// Redis backend is in lib/store-redis.js.
//
// Run with: npm test

import { test, before } from "node:test";
import assert from "node:assert/strict";

process.env.DRAIN_DISABLE_PERSIST = "1"; // in-memory only, no .data/ writes

// Imports lib/store-file.js dynamically, after the env var above is set.
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
