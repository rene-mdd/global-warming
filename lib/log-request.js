// lib/log-request.js

import { TRAFFIC_LOG_MARKER } from "./drain-parse";

/** Vercel's geolocation + client headers, read defensively. */
export function readVercelRequestContext(request) {
  const h = request?.headers;
  const get = (name) => {
    try {
      const value = h?.get?.(name) ?? h?.[name];
      return value === null ? undefined : value;
    } catch {
      return undefined;
    }
  };

  let path;
  let method;
  try {
    method = request?.method;
    // `new URL()` needs a base to parse a relative URL (what the Pages
    // Router hands in, e.g. "/api/co2-api?x=1"); an absolute URL ignores
    // the base. Only pathname and search are read, so the dummy host is
    // discarded.
    const url = request?.url;
    if (typeof url === "string" && url) {
      const parsed = new URL(url, "http://internal.invalid");
      path = parsed.pathname + (parsed.search || "");
    }
  } catch {
    /* malformed url — leave path undefined rather than throwing in a log call */
  }

  return {
    method,
    path,
    host: get("host"),
    country: get("x-vercel-ip-country"),
  };
}

/**
 * Emit one structured log line for this request.
 *
 * @param request  the Web `Request` given to the route handler
 * @param extra    fields to attach (shown in `custom`)
 * @returns the payload that was logged, in case you want to reuse it
 */
export function logRequest(request, extra = {}) {
  const payload = {
    ...readVercelRequestContext(request),
    ...extra,
    loggedAt: new Date().toISOString(),
  };

  // Drop undefined keys to keep the log line small.
  for (const key of Object.keys(payload)) {
    if (payload[key] === undefined) delete payload[key];
  }

  // Logged as one marker-prefixed line so the drain parser can find it.
  console.log(`${TRAFFIC_LOG_MARKER} ${JSON.stringify(payload)}`);

  return payload;
}

/**
 * Wrap a route handler so every call is logged, including its status code and
 * duration - no need to remember the logRequest() call in each branch.
 *
 * Pages Router:
 *   export default withRequestLogging(async (req, res) => {
 *     res.status(200).json({ ok: true });
 *   }, { handler: "co2" });
 *
 * App Router:
 *   export const GET = withRequestLogging(async (request) => {
 *     return Response.json({ ok: true });
 *   });
 */
export function withRequestLogging(handler, extra = {}) {
  return async function wrapped(request, ...rest) {
    const startedAt = Date.now();
    let response;
    let thrown;
    try {
      response = await handler(request, ...rest);
      return response;
    } catch (err) {
      thrown = err;
      throw err;
    } finally {
      // App Router: the handler returns a Response, so use response.status.
      // Pages Router: the handler writes to `res` (rest[0]) instead, so use
      // res.statusCode.
      const res = rest[0];
      const status = response?.status ?? res?.statusCode;

      logRequest(request, {
        ...extra,
        statusCode: thrown ? 500 : status,
        durationMs: Date.now() - startedAt,
        ...(thrown ? { error: String(thrown?.message ?? thrown) } : {}),
      });
    }
  };
}
