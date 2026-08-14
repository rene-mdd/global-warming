// tests/loader.mjs — test-only module resolution shim
//
// The lib/ files import each other without file extensions ("./drain-parse"),
// which webpack resolves for you and Node's ESM loader does not. Rather than
// rewrite every import in lib/ — which would fight airbnb's import/extensions
// rule and touch production code purely to satisfy a test runner — the test run
// registers this resolver.
//
// Nothing here ships. It is loaded only via the --import flag in `npm test`.

import { register } from "node:module";

register("./extensionless-resolve.mjs", import.meta.url);
