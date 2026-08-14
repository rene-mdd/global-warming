// lib/log-request.js

import { TRAFFIC_LOG_MARKER } from "./drain-parse";

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

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
    // The Pages Router hands us a RELATIVE url ("/api/co2-api?x=1"), and
    // `new URL()` throws on a relative string with no base. The previous
    // version caught that and moved on, which meant `path` was silently
    // undefined on EVERY log line in a Pages Router app — the field looked
    // optional when it was simply never populated.
    //
    // A dummy base makes both shapes parse: an absolute URL ignores the base,
    // a relative one resolves against it. Only pathname and search are read,
    // so the fake host never appears anywhere.
    const url = request?.url;
    if (typeof url === "string" && url) {
      const parsed = new URL(url, "http://internal.invalid");
      path = parsed.pathname + (parsed.search || "");
    }
  } catch {
    /* malformed url — leave path undefined rather than throwing in a log call */
  }

  const city = get("x-vercel-ip-city");

  return {
    method,
    path,
    host: get("host"),
    country: get("x-vercel-ip-country"),
    // City names are RFC3986-encoded by Vercel, e.g. "San%20Francisco".
    city: city ? safeDecode(city) : undefined,
  };
}

/**
 * Emit one structured log line for this request.
 *
 * @param request  the Web `Request` given to the route handler
 * @param extra    ields to attach (shown in `custom`)
 * @returns the payload that was logged, in case you want to reuse it
 */
export function logRequest(request, extra = {}) {
  const payload = {
    ...readVercelRequestContext(request),
    ...extra,
    loggedAt: new Date().toISOString(),
  };

  // Drop undefined keys so the log line stays small (drains bill by bytes).
  for (const key of Object.keys(payload)) {
    if (payload[key] === undefined) delete payload[key];
  }

  // Single line, marker-prefixed, so the drain parser can find it reliably.
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
      // Two router shapes, two places the status lives:
      //   App Router   - the handler RETURNS a Response, so `response.status`.
      //   Pages Router - the handler returns nothing and writes to `res`, so the
      //                  status is `res.statusCode` (rest[0] is `res`).
      // Reading only `response?.status` meant statusCode was always undefined in
      // a Pages Router app, and the field was dropped from the log line
      // entirely — the wrapper appeared to work while recording nothing extra.
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
