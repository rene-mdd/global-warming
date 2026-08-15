// lib/privacy.js — server only
//


import crypto from "crypto";
import { TRAFFIC_LOG_MARKER } from "./drain-parse";

export const ANONYMIZE_MODES = ["off", "truncate", "hash", "drop"];

/** Resolve the configured mode, falling back safely on bad input. */
export function anonymizeMode() {
  const raw = (process.env.DRAIN_ANONYMIZE_IPS || "off").trim().toLowerCase();
  if (!ANONYMIZE_MODES.includes(raw)) {
    console.warn(
      `[privacy] DRAIN_ANONYMIZE_IPS="${raw}" is not one of ${ANONYMIZE_MODES.join(
        " | ",
      )} — treating as "off".`,
    );
    return "off";
  }
  return raw;
}

let saltWarned = false;

function ipSalt() {
  const salt = process.env.DRAIN_IP_SALT;
  if (salt) return salt;

  // Refuse to hash without a salt: unsalted hashes of a 32-bit space are
  // trivially reversible with a rainbow table, so they'd give false comfort.
  if (!saltWarned) {
    saltWarned = true;
    console.error(
      "[privacy] DRAIN_ANONYMIZE_IPS=hash requires DRAIN_IP_SALT to be set. " +
        "Unsalted IP hashes are trivially reversible. Falling back to truncation.",
    );
  }
  return null;
}

/** IPv4 -> zero final octet. IPv6 -> keep the first three hextets (/48). */
export function truncateIp(ip) {
  if (typeof ip !== "string" || !ip) return ip;

  if (ip.includes(":")) {
    // IPv6 (may be an IPv4-mapped form like ::ffff:1.2.3.4).
    if (ip.includes(".")) {
      const tail = ip.slice(ip.lastIndexOf(":") + 1);
      return `${ip.slice(0, ip.lastIndexOf(":") + 1)}${truncateIp(tail)}`;
    }
    const parts = ip.split(":");
    return `${parts.slice(0, 3).join(":")}::`;
  }

  const octets = ip.split(".");
  if (octets.length !== 4) return ip;
  return `${octets[0]}.${octets[1]}.${octets[2]}.0`;
}

export function hashIp(ip, salt) {
  return crypto
    .createHmac("sha256", salt)
    .update(String(ip), "utf8")
    .digest("hex")
    .slice(0, 16);
}

/** Apply the configured mode to a single IP. Returns undefined for `drop`. */
export function anonymizeIp(ip, mode = anonymizeMode()) {
  if (!ip || mode === "off") return ip;
  if (mode === "drop") return undefined;
  if (mode === "truncate") return truncateIp(ip);

  if (mode === "hash") {
    const salt = ipSalt();
    if (!salt) return truncateIp(ip); // documented fallback
    return hashIp(ip, salt);
  }

  return ip;
}

// An IPv4 that isn't part of a version string. The negative lookbehind on "/"
// and the digit/dot guards stop it eating things like "Chrome/126.0.0.0" out of
// a user-agent that someone logged in free text.
const IPV4_IN_TEXT =
  /(?<![\w./])((?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})(?![\w.])/g;

// Conservative IPv6: at least four colon-separated hex groups.
const IPV6_IN_TEXT =
  /(?<![\w:])((?:[0-9a-fA-F]{1,4}:){3,7}[0-9a-fA-F]{1,4})(?![\w:])/g;

/**
 * Redact IP addresses appearing inside a free-text log message.
 *
 * Needed because the structured fields aren't the only copy: if you
 * `console.log("blocked " + ip)`, that string is stored verbatim, and
 * anonymising `clientIp` while persisting the raw value two fields away would
 * be theatre.
 *
 * Set DRAIN_SCRUB_MESSAGES=0 to disable. Worth knowing: the patterns are
 * deliberately cautious but can still rewrite a dotted-quad that wasn't an IP
 * (e.g. "v1.2.3.4"). That damages log prose only — never a metric.
 */
export function scrubMessageText(message, mode) {
  if (typeof message !== "string" || !message) return message;
  if (process.env.DRAIN_SCRUB_MESSAGES === "0") return message;

  const replace = (match) => {
    const value = anonymizeIp(match, mode);
    return value === undefined ? "[ip-removed]" : value;
  };

  return message.replace(IPV4_IN_TEXT, replace).replace(IPV6_IN_TEXT, replace);
}

/**
 * Scrub a normalized record (returns a new object).
 *
 * There are THREE copies of the same personal data to deal with, which is easy
 * to get wrong:
 *
 *   1. the top-level fields (clientIp, latitude, longitude)
 *   2. the parsed `custom` object from your console.log payload
 *   3. the raw `message` STRING that payload was parsed out of
 *
 * Missing (3) was a real bug in an earlier version of this file: IPs were
 * correctly hashed in the structured fields while the original sat in plain
 * text in `message` on the very same record. All three are handled here.
 *
 * Precise coordinates are dropped for anything stronger than `off`, since
 * street-level lat/long identifies a household far more than the city name the
 * charts actually use.
 */
export function applyPrivacy(record, mode = anonymizeMode()) {
  if (mode === "off") return record;

  const scrubbed = { ...record };

  // (1) top-level fields
  if (scrubbed.clientIp) {
    const value = anonymizeIp(scrubbed.clientIp, mode);
    if (value === undefined) delete scrubbed.clientIp;
    else scrubbed.clientIp = value;
  }
  delete scrubbed.latitude;
  delete scrubbed.longitude;

  // (2) the parsed custom payload
  if (scrubbed.custom && typeof scrubbed.custom === "object") {
    const custom = { ...scrubbed.custom };
    ["clientIp", "ip", "latitude", "longitude", "postalCode"].forEach((key) => {
      if (!(key in custom)) return;
      if (key === "clientIp" || key === "ip") {
        const value = anonymizeIp(custom[key], mode);
        if (value === undefined) delete custom[key];
        else custom[key] = value;
      } else {
        delete custom[key];
      }
    });
    scrubbed.custom = custom;

    // (3a) The message was a structured `[traffic] {...}` line, so rebuild it
    // from the scrubbed object rather than regex-patching the original. Exact,
    // with no false positives.
    if (
      typeof scrubbed.message === "string" &&
      scrubbed.message.includes("{")
    ) {
      scrubbed.message = `${TRAFFIC_LOG_MARKER} ${JSON.stringify(custom)}`;
    }
  } else {
    // (3b) Free-text message: fall back to pattern redaction.
    scrubbed.message = scrubMessageText(scrubbed.message, mode);
  }

  scrubbed.privacyMode = mode;
  return scrubbed;
}

/** What the dashboard needs to label things honestly. */
export function privacyInfo() {
  const mode = anonymizeMode();
  const labels = {
    off: { uniqueLabel: "Unique IPs", uniqueHint: "Raw client IP addresses" },
    truncate: {
      uniqueLabel: "Unique subnets",
      uniqueHint: "IPs truncated to /24 — approximates visitors",
    },
    hash: {
      uniqueLabel: "Unique visitors",
      uniqueHint: "Salted hash of client IP",
    },
    drop: { uniqueLabel: "Unique IPs", uniqueHint: "IP storage disabled" },
  };
  return { mode, ...labels[mode] };
}
