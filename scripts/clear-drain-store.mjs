// scripts/clear-drain-store.mjs
//
// Deletes every stored drain record. Run via `npm run clear`, which registers
// tests/loader.mjs so lib/'s extensionless imports resolve under Node's ESM
// loader.
//
// Anonymisation applies at ingest, not retroactively, so this is how records
// stored before DRAIN_ANONYMIZE_IPS was turned on or changed actually get
// removed.

import dotenv from "dotenv";

// Sets process.env from .env.local before lib/drain-store.js is imported —
// that module picks its backend (Redis vs file) from env vars at import time.
dotenv.config({ path: ".env.local" });

const { clearRecords, storeInfo } = await import("../lib/drain-store");

const before = await storeInfo();
const removed = await clearRecords();
console.log(`Cleared ${removed} record(s). Backend: ${before.backend}.`);
