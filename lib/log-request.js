// lib/log-request.js
//
// ===========================================================================
// WHY THIS FILE EXISTS
// ===========================================================================
// Log Drains do NOT include the visitor's country. Check the documented log
// schema and you'll find `proxy.region` and `executionRegion` (e.g. "sfo1") -
// that's the Vercel datacenter that served the request, not where the person
// is. It's a rough proxy at best.
//
// The visitor's REAL location is only available as request headers inside a
// function: x-vercel-ip-country, x-vercel-ip-city, and friends. So to get true
// geo into your drain, you read those headers in your route and console.log
// them - the log line then rides the drain to this dashboard, which parses it
// back out (see lib/drain-parse.js).
//
// That also means this file doubles as the answer to "log my own console.log()
// fields": anything you pass in `extra` lands in the dashboard's `custom`
// column and is queryable alongside the built-in fields.
//
// ===========================================================================
// USAGE — copy this file into YOUR app and call it from your API routes
// ===========================================================================
//
//   import { logRequest } from "@/lib/log-request";
//
//   export async function GET(request) {
//     logRequest(request, { handler: "listUsers", plan: "pro" });
//     return Response.json({ ok: true });
//   }
//
// Notes:
//  - Safe to call in both Node and Edge runtimes (uses only Request + console).
//  - One console.log per request. At very high traffic, sample it:
//      if (Math.random() < 0.1) logRequest(request);
//    (or use the drain's own sampling rules in the Vercel dashboard).
//  - Client IP and geo are inferred by Vercel's edge; locally they're absent,
//    which is expected and handled.

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

  // x-forwarded-for can be a comma-separated chain; the client is first.
  const forwardedFor = get("x-forwarded-for");
  const clientIp =
    (typeof forwardedFor === "string"
      ? forwardedFor.split(",")[0].trim()
      : undefined) ||
    get("x-vercel-forwarded-for") ||
    get("x-real-ip");

  let path;
  let method;
  try {
    method = request?.method;
    path = request?.url
      ? new URL(request.url).pathname + (new URL(request.url).search || "")
      : undefined;
  } catch {
    /* request.url may be relative in some runtimes */
  }

  const city = get("x-vercel-ip-city");

  return {
    method,
    path,
    clientIp,
    userAgent: get("user-agent"),
    referer: get("referer") ?? get("referrer"),
    host: get("host"),
    country: get("x-vercel-ip-country"),
    // City names are RFC3986-encoded by Vercel, e.g. "San%20Francisco".
    city: city ? safeDecode(city) : undefined,
  };
}

/**
 * Emit one structured log line for this request.
 *
 * @param request  the Web `Request` given to your route handler
 * @param extra    any of your own fields to attach (shown in `custom`)
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
      logRequest(request, {
        ...extra,
        statusCode: thrown ? 500 : response?.status,
        durationMs: Date.now() - startedAt,
        ...(thrown ? { error: String(thrown?.message ?? thrown) } : {}),
      });
    }
  };
}
