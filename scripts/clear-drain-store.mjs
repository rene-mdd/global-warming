// scripts/clear-drain-store.mjs
//
// Deletes every stored drain record. Used by `npm run clear` — the fix for
// the traffic dashboard's own warning banner, which already told operators to
// run this command before the script existed.
//
// Needed whenever DRAIN_ANONYMIZE_IPS is turned on (or changed): anonymisation
// applies at ingest, not retroactively, so old records stay in whatever form
// they were stored in until the store is cleared.
//
// Run via `npm run clear`, which registers tests/loader.mjs — lib/ imports each
// other without file extensions (webpack's job normally), which plain Node's
// ESM loader can't resolve on its own.

import dotenv from "dotenv";

// dotenv must run BEFORE lib/drain-store.js is loaded: that module decides
// its backend (Redis vs file) from process.env at import time, and a static
// `import` at the top of this file would be hoisted ahead of dotenv.config().
// The dynamic import() below only evaluates once this line actually runs.
dotenv.config({ path: ".env.local" });

const { clearRecords, storeInfo } = await import("../lib/drain-store");

const before = await storeInfo();
const removed = await clearRecords();
console.log(`Cleared ${removed} record(s). Backend: ${before.backend}.`);
