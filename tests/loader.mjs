// tests/loader.mjs — test-only module resolution shim
//
// Registers a resolver hook so extensionless imports in lib/ (e.g.
// "./drain-parse") resolve under Node's ESM loader.
//
// Loaded only via the --import flag in `npm test`; nothing here ships.

import { register } from "node:module";

register("./extensionless-resolve.mjs", import.meta.url);
