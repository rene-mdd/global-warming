// lib/drain-signature.js — server only
//
// Vercel signs every drain delivery with an HMAC-SHA1 of the RAW request body,
// hex-encoded, in the `x-vercel-signature` header. We hash the exact bytes
// Vercel sent, so the ingest route reads the body as text BEFORE parsing it.
//
// Docs: https://vercel.com/docs/drains/security

import crypto from "crypto";

/** Hex HMAC-SHA1 of `rawBody` using `secret`. */
export function signBody(rawBody, secret) {
  return crypto
    .createHmac("sha1", secret)
    .update(rawBody, "utf8")
    .digest("hex");
}

/**
 * Constant-time comparison of the incoming signature against the expected one.
 * Returns one of:
 *   { ok: true,  mode: "verified" }   signature matched
 *   { ok: true,  mode: "unsecured" }  no secret configured (dev only)
 *   { ok: false, reason: string }     rejected
 */
export function verifyDrainSignature(rawBody, headerSignature, secret) {
  if (!secret) {
    // No secret configured. Allowed so `npm run seed` works out of the box,
    // but the caller logs a loud warning.
    return { ok: true, mode: "unsecured" };
  }

  if (!headerSignature) {
    return { ok: false, reason: "missing x-vercel-signature header" };
  }

  const expected = signBody(rawBody, secret);

  // timingSafeEqual throws if lengths differ, so length-check first.
  if (headerSignature.length !== expected.length) {
    return { ok: false, reason: "signature length mismatch" };
  }

  const matches = crypto.timingSafeEqual(
    Buffer.from(headerSignature, "utf8"),
    Buffer.from(expected, "utf8"),
  );

  return matches
    ? { ok: true, mode: "verified" }
    : { ok: false, reason: "signature did not match" };
}
