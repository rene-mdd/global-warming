// pages/api/drains/ingest.js
//
// THE DRAIN ENDPOINT (Pages Router). This is the URL you paste into Vercel:
//   Team Settings -> Drains -> Add Drain -> Logs -> Custom Endpoint
//   https://www.global-warming.org/api/drains/ingest
//
// Contract Vercel expects:
//  - accepts POST over HTTPS
//  - responds 200 OK quickly (non-200 counts as a failed delivery, and Vercel
//    emails you + flags the drain if >80% fail or >50 failures in an hour)
//  - may receive MANY log events batched into one request
//
// bodyParser is DISABLED below because the signature is an HMAC over the exact
// bytes Vercel sent. If Next parsed the body into an object first, we could only
// re-serialise it — and any difference in key order or whitespace would break
// verification. Do not remove that config block.

import { verifyDrainSignature } from "../../../lib/drain-signature";
import { parseAndNormalize } from "../../../lib/drain-parse";
import { appendRecords, storeInfo } from "../../../lib/drain-store";
import { anonymizeMode, applyPrivacy } from "../../../lib/privacy";

export const config = {
  api: {
    bodyParser: false, // required for signature verification — see above
  },
};

/** Collect the raw request body as a string, without any parsing. */
function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

// Paths whose logs are discarded on arrival. Defaults to this app's own
// endpoints so the drain's own deliveries and the dashboard's polling aren't
// counted as your users' traffic (or feed back on themselves).
// Override with DRAIN_IGNORE_PATHS="/a,/b"; set to "none" to keep everything.
function ignorePaths() {
  const raw = process.env.DRAIN_IGNORE_PATHS;
  if (raw === "none") return [];
  const value =
    raw ??
    "/api/drains/ingest,/api/drains/stats,/api/drains/events,/api/drains/locations";
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function applyVerifyHeader(res) {
  const verify = process.env.VERCEL_DRAIN_VERIFY;
  if (verify) res.setHeader("x-vercel-verify", verify);
}

export default async function handler(req, res) {
  applyVerifyHeader(res);

  // Vercel (and you, while debugging) may probe the endpoint with a GET.
  // Answering 200 makes the dashboard's "Test" button succeed.
  if (req.method === "GET") {
    const info = await storeInfo();
    return res.status(200).json({
      ok: true,
      endpoint: "vercel-drain-ingest",
      hint: "POST Vercel drain payloads here. GET is only for health checks.",
      signatureRequired: Boolean(process.env.VERCEL_DRAIN_SECRET),
      storedEvents: info.count,
      backend: info.backend,
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "method not allowed" });
  }

  // 1. Raw body FIRST — the signature is over these exact bytes.
  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch (err) {
    console.error("[drains/ingest] could not read body:", err);
    return res.status(400).json({ error: "could not read request body" });
  }

  // 2. Verify it really came from Vercel.
  const secret = process.env.VERCEL_DRAIN_SECRET;
  const signature = req.headers["x-vercel-signature"];
  const verdict = verifyDrainSignature(rawBody, signature, secret);

  if (!verdict.ok) {
    console.warn(`[drains/ingest] rejected delivery: ${verdict.reason}`);
    return res
      .status(403)
      .json({ code: "invalid_signature", error: verdict.reason });
  }

  if (verdict.mode === "unsecured") {
    console.warn(
      "[drains/ingest] VERCEL_DRAIN_SECRET is not set — accepting UNVERIFIED payload. " +
        "Fine for local seeding; set the secret before deploying.",
    );
  }

  // 3. Parse (array / single object / NDJSON) and normalize.
  let parsed;
  try {
    parsed = parseAndNormalize(rawBody, { ignorePaths: ignorePaths() });
  } catch (err) {
    // Still return 200: a parse bug on our side shouldn't make Vercel mark the
    // drain as failing and start retrying/alerting. We log loudly instead.
    console.error("[drains/ingest] parse error (returning 200 anyway):", err);
    return res.status(200).json({ ok: true, stored: 0, parseError: true });
  }

  // 4. Minimise personal data BEFORE it touches storage, so raw IPs and precise
  //    coordinates are never written.
  const mode = anonymizeMode();
  const records =
    mode === "off"
      ? parsed.records
      : parsed.records.map((r) => applyPrivacy(r, mode));

  // 5. Store.
  let stored = 0;
  try {
    stored = await appendRecords(records);
  } catch (err) {
    console.error("[drains/ingest] store error (returning 200 anyway):", err);
  }

  if (parsed.rawCount === 0 && rawBody.trim()) {
    console.warn(
      "[drains/ingest] received a body with no parseable events. First 300 chars:",
      rawBody.slice(0, 300),
    );
  }

  if (parsed.ignored > 0) {
    console.log(
      `[drains/ingest] discarded ${parsed.ignored} self-referential log(s). ` +
        `A large number on every delivery means the drain is logging its own ` +
        `deliveries — add sampling rules in Vercel.`,
    );
  }

  return res.status(200).json({
    ok: true,
    received: parsed.rawCount,
    stored,
    ignored: parsed.ignored,
    verification: verdict.mode,
  });
}
