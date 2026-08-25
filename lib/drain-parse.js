// lib/drain-parse.js — server only
//
// Turns whatever Vercel POSTs to the drain endpoint into flat, chart-friendly
// records.
//
// Two things this handles that are easy to get wrong:
//
//  WHERE EACH FIELD LIVES. Request-level data (client IP, method, user agent,
//    referer) lives on the nested `proxy` object, while function-level data
//    (statusCode, path, executionRegion) sits at the top level - and some
//    fields exist in BOTH places with different meanings. We prefer the proxy
//    value for request facts and fall back to the top level.
//
// Field reference: https://vercel.com/docs/drains/reference/logs

import parseUserAgent from "./ua-parse";

/** Marker that lib/log-request.js prefixes onto its console.log line. */
export const TRAFFIC_LOG_MARKER = "[traffic]";

/**
 * Parse a raw drain request body into an array of raw Vercel log event objects.
 * Never throws - unparseable input yields [].
 */
export function parseDrainBody(rawBody) {
  const text = String(rawBody ?? "").trim();
  if (!text) return [];

  // Case 1: a JSON array or a single JSON object.
  if (text.startsWith("[") || (text.startsWith("{") && !text.includes("\n"))) {
    try {
      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // Fall through to NDJSON handling - a batch of objects separated by
      // newlines also starts with "{".
    }
  }

  // Case 2: NDJSON (one object per line). Also covers Vercel's "JSON" format,
  // whose own docs example is newline-separated objects.
  const events = [];
  text.split("\n").forEach((line) => {
    const trimmed = line.trim().replace(/,$/, "");
    if (!trimmed || trimmed === "[" || trimmed === "]") return;
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) events.push(...parsed);
      else if (parsed && typeof parsed === "object") events.push(parsed);
    } catch {
      // Skip malformed lines rather than dropping the whole batch.
    }
  });
  return events;
}

/**
 * Pull structured fields out of a log message.
 *
 * Handles both the `[traffic] {...}` lines produced by lib/log-request.js and
 * any bare JSON object you console.log yourself - so your own fields show up
 * in the dashboard's `custom` column without extra configuration.
 */
export function extractCustomFields(message) {
  if (!message || typeof message !== "string") return null;

  let candidate = message.trim();
  if (candidate.startsWith(TRAFFIC_LOG_MARKER)) {
    candidate = candidate.slice(TRAFFIC_LOG_MARKER.length).trim();
  }

  if (!candidate.startsWith("{")) return null;

  try {
    const parsed = JSON.parse(candidate);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : null;
  } catch {
    return null;
  }
}

function firstDefined(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

/** Strip the query string off a path so grouping isn't fragmented per-visitor. */
export function basePath(path) {
  if (!path || typeof path !== "string") return path;
  const q = path.indexOf("?");
  return q === -1 ? path : path.slice(0, q);
}

/**
 * Normalize one raw Vercel log event into the flat record the dashboard uses.
 * Returns null for events that carry no usable signal.
 */
export function normalizeEvent(raw) {
  if (!raw || typeof raw !== "object") return null;

  const proxy = raw.proxy && typeof raw.proxy === "object" ? raw.proxy : {};
  const custom = extractCustomFields(raw.message);

  // --- Timestamp: prefer the proxy's (when the request hit the edge) ---
  const timestamp = Number(
    firstDefined(proxy.timestamp, raw.timestamp, Date.now()),
  );

  // --- Request basics. proxy.* is the request; top level is the function. ---
  const method = firstDefined(proxy.method, custom?.method);
  const fullPath = firstDefined(proxy.path, raw.path, custom?.path);
  const statusCodeRaw = firstDefined(
    proxy.statusCode,
    raw.statusCode,
    custom?.statusCode,
  );
  const statusCode =
    statusCodeRaw === undefined ? undefined : Number(statusCodeRaw);

  // proxy.userAgent is documented as an ARRAY of strings.
  const userAgent = firstDefined(
    Array.isArray(proxy.userAgent) ? proxy.userAgent[0] : proxy.userAgent,
    custom?.userAgent,
  );

  const clientIp = firstDefined(proxy.clientIp, custom?.clientIp, custom?.ip);

  // --- Geo. Country only exists if it was logged from the function via the
  // x-vercel-ip-country header; there is no edge-region fallback, since an
  // edge region is a fact about the datacenter, not the visitor. ---
  const country = firstDefined(custom?.country, custom?.geo?.country);

  const ua = parseUserAgent(userAgent);

  const record = {
    id: firstDefined(raw.id, `${timestamp}-${Math.round(timestamp % 1e6)}`),
    timestamp,

    // Where the log came from: lambda | edge | static | build | external | firewall | redirect
    source: raw.source ?? "unknown",
    level: raw.level ?? "info",
    type: raw.type,

    // Hostname & deployment
    host: firstDefined(proxy.host, raw.host),
    deploymentId: raw.deploymentId,
    projectId: raw.projectId,
    projectName: raw.projectName,
    environment: raw.environment,
    branch: raw.branch,

    // Request
    requestId: raw.requestId,
    method,
    path: fullPath,
    route: basePath(fullPath),
    statusCode,
    scheme: proxy.scheme,
    referer: proxy.referer,
    responseByteSize:
      proxy.responseByteSize === undefined
        ? undefined
        : Number(proxy.responseByteSize),

    // Client
    clientIp,
    userAgent,
    browser: ua.browser,
    os: ua.os,
    device: ua.device,
    isBot: ua.isBot,

    // Geo
    country,

    // Runtime / edge detail
    executionRegion: raw.executionRegion,
    edgeType: raw.edgeType,
    entrypoint: raw.entrypoint,
    pathType: proxy.pathType,
    vercelCache: proxy.vercelCache,
    wafAction: proxy.wafAction,

    // Tracing
    traceId: firstDefined(raw.traceId, raw["trace.id"]),

    // Your own console.log payload, verbatim
    message:
      typeof raw.message === "string" ? raw.message.slice(0, 2000) : undefined,
    custom: custom ?? undefined,
  };

  // ---------------------------------------------------------------------
  // Is this log line about an HTTP request, or is it just output?
  // ---------------------------------------------------------------------
  // This distinction matters a lot for the numbers. `build` logs are
  // deploy-time stdout/stderr with no proxy object, no status code and no IP -
  // counting them as "requests" would inflate every chart. Same for any bare
  // console.log that isn't tied to a request.
  //
  // Records with isRequest === false are still kept (they show in the live log
  // table) but are excluded from request counts and breakdowns.
  const hasProxyFields = Object.keys(proxy).length > 0;
  record.isRequest =
    record.source !== "build" &&
    (hasProxyFields ||
      record.statusCode !== undefined ||
      Boolean(record.path) ||
      Boolean(record.clientIp));

  // Nothing usable at all - drop it (e.g. build `delimiter` entries).
  if (!record.isRequest && !record.message) return null;

  return record;
}

/**
 * One HTTP request can produce SEVERAL log entries: the request line itself
 * (which carries the `proxy` object with IP / user agent / status) plus one
 * entry per console.log in your handler (which carries your custom fields and
 * geo). They share a `requestId`.
 *
 * Merging them is both more accurate for counting AND gives a more complete
 * record than either line alone - the proxy line's IP/UA combined with the
 * console.log line's true country.
 *
 * Preference rule: a defined value beats undefined; custom objects are
 * shallow-merged.
 */
export function mergeRequestRecords(a, b) {
  const merged = { ...a };

  Object.entries(b).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (key === "custom") return; // handled below
    if (
      merged[key] === undefined ||
      merged[key] === null ||
      merged[key] === ""
    ) {
      merged[key] = value;
    }
  });

  if (a.custom || b.custom) {
    merged.custom = { ...(a.custom ?? {}), ...(b.custom ?? {}) };
  }

  // Keep the earliest timestamp: the proxy line marks when the request hit the
  // edge, which is the honest "when did this happen".
  if (Number.isFinite(b.timestamp) && Number.isFinite(a.timestamp)) {
    merged.timestamp = Math.min(a.timestamp, b.timestamp);
  }

  // A UA string only exists on the proxy line; re-derive if we just gained one.
  if (!a.userAgent && b.userAgent) {
    merged.browser = b.browser;
    merged.os = b.os;
    merged.device = b.device;
    merged.isBot = b.isBot;
  }

  return merged;
}

/**
 * Should this record be discarded as the dashboard's own traffic?
 *
 * Matters if you host this dashboard inside the SAME Vercel project the drain
 * monitors. Then two things pollute your data:
 *
 *  1. Every drain delivery is itself an HTTPS POST to /api/drains/ingest — a
 *     request to a function in the monitored project, which produces a log,
 *     which gets drained, which produces another POST... a feedback loop that
 *     both inflates the numbers and amplifies your drain bill.
 *  2. The dashboard polls /api/drains/stats and /events every 10s while open,
 *     which would show up as your busiest "route".
 *
 * Hosting the dashboard outside the monitored project is the real fix (see
 * README). This filter is the safety net for when it isn't.
 */
export function isIgnoredPath(record, ignorePaths) {
  if (!ignorePaths || ignorePaths.length === 0) return false;
  const candidates = [record.route, record.path].filter(Boolean);
  if (candidates.length === 0) return false;
  return ignorePaths.some((prefix) =>
    candidates.some((value) => String(value).startsWith(prefix)),
  );
}

/**
 * Parse + normalize a whole request body in one call.
 *
 * @param rawBody           the exact request body text
 * @param options.ignorePaths  path prefixes to discard (see isIgnoredPath)
 */
export function parseAndNormalize(rawBody, { ignorePaths = [] } = {}) {
  const rawEvents = parseDrainBody(rawBody);
  const records = [];
  let ignored = 0;

  rawEvents.forEach((raw) => {
    const record = normalizeEvent(raw);
    if (!record) return;
    if (isIgnoredPath(record, ignorePaths)) {
      ignored += 1;
      return;
    }
    records.push(record);
  });

  return { rawCount: rawEvents.length, records, ignored };
}
