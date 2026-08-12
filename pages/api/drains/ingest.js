// pages/api/drains/ingest.js   — Pages Router version
//
// THE DRAIN ENDPOINT. The URL you give Vercel:
//   https://www.global-warming.org/api/drains/ingest
//
// ===========================================================================
// THE ONE THING YOU MUST NOT REMOVE: bodyParser: false
// ===========================================================================
// Vercel signs each delivery with an HMAC-SHA1 over the EXACT BYTES of the
// request body. Pages Router parses JSON bodies by default, which means
// `req.body` is an already-decoded object — and re-serialising it with
// JSON.stringify produces DIFFERENT bytes (key order, whitespace, unicode
// escaping). The signature would then never match and every delivery would be
// rejected with 403.
//
// So the body parser is disabled and the raw bytes are read off the stream
// below. This is the single biggest difference from the App Router version,
// where `await request.text()` gives you the raw body for free.

import { verifyDrainSignature } from "@/lib/drain-signature";
import { parseAndNormalize } from "@/lib/drain-parse";
import { appendRecords, storeInfo } from "@/lib/drain-store";
import { anonymizeMode, applyPrivacy } from "@/lib/privacy";

export const config = {
  api: {
    bodyParser: false, // REQUIRED — see the note above
  },
};

/** Collect the raw request body as a string, without adding a dependency. */
async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

// Paths whose logs are discarded on arrival, so the drain's own deliveries and
// the dashboard's polling don't get counted as your users' traffic.
// Override with DRAIN_IGNORE_PATHS="/a,/b"; set to "none" to keep everything.
function ignorePaths() {
  const raw = process.env.DRAIN_IGNORE_PATHS;
  if (raw === "none") return [];
  const value = raw ?? "/api/drains/ingest,/api/drains/stats,/api/drains/events,/api/drains/locations";
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

export default async function handler(req, res) {
  // Echo the endpoint-ownership header if your drain setup asked for one.
  if (process.env.VERCEL_DRAIN_VERIFY) {
    res.setHeader("x-vercel-verify", process.env.VERCEL_DRAIN_VERIFY);
  }

  // Vercel (and you, while debugging) may probe with a GET. Answering 200 makes
  // the dashboard's "Test" button succeed.
  if (req.method === "GET") {
    const info = await storeInfo();
    return res.status(200).json({
      ok: true,
      endpoint: "vercel-drain-ingest",
      hint: "POST Vercel drain payloads here. GET is only for health checks.",
      signatureRequired: Boolean(process.env.VERCEL_DRAIN_SECRET),
      storedEvents: info.count,
    });
  }

  if (req.method !== "POST") {
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
  const signature = req.headers["x-vercel-signature"];
  const verdict = verifyDrainSignature(
    rawBody,
    Array.isArray(signature) ? signature[0] : signature,
    process.env.VERCEL_DRAIN_SECRET
  );

  if (!verdict.ok) {
    console.warn(`[drains/ingest] rejected delivery: ${verdict.reason}`);
    return res.status(403).json({ code: "invalid_signature", error: verdict.reason });
  }

  if (verdict.mode === "unsecured") {
    console.warn(
      "[drains/ingest] VERCEL_DRAIN_SECRET is not set — accepting UNVERIFIED payload. " +
        "Fine for local testing; set the secret before deploying."
    );
  }

  // 3. Parse (array / single object / NDJSON) and normalize.
  let parsed;
  try {
    parsed = parseAndNormalize(rawBody, { ignorePaths: ignorePaths() });
  } catch (err) {
    // Still return 200: a parse bug on our side shouldn't make Vercel mark the
    // drain as failing and start alerting. Log loudly instead.
    console.error("[drains/ingest] parse error (returning 200 anyway):", err);
    return res.status(200).json({ ok: true, stored: 0, parseError: true });
  }

  // 4. Minimise personal data BEFORE storage, so raw IPs and precise
  //    coordinates are never persisted when anonymisation is enabled.
  const mode = anonymizeMode();
  const records =
    mode === "off" ? parsed.records : parsed.records.map((r) => applyPrivacy(r, mode));

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
      rawBody.slice(0, 300)
    );
  }

  if (parsed.ignored > 0) {
    console.log(
      `[drains/ingest] discarded ${parsed.ignored} self-referential log(s). ` +
        "A large number on every delivery means the drain is logging its own traffic — " +
        "add sampling rules in Vercel."
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
