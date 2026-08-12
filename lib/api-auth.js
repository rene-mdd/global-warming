// lib/api-auth.js — server only
//
// Guards the read-only endpoints that expose visitor data.
//
// ---------------------------------------------------------------------------
// WHY THIS FAILS CLOSED
// ---------------------------------------------------------------------------
// /api/drains/stats and /api/drains/events return your visitors' IPs, user
// agents, geolocation and whatever custom fields you log. If the deployment is
// public and these are unauthenticated, anyone can download all of it — and if
// the source is on GitHub, the exact endpoint paths are public knowledge, so
// nobody even has to guess them.
//
// So: in production, refusing to serve is the default unless DASHBOARD_API_TOKEN
// is set. An empty token in development stays convenient; an empty token in
// production is a data leak, and a misconfiguration should break loudly rather
// than quietly publish personal data.
//
// Set DASHBOARD_ALLOW_PUBLIC_READS=1 to override deliberately (e.g. the whole
// deployment already sits behind Vercel password protection, an auth proxy, or
// a private network).

/**
 * @returns {null} when the request may proceed, or
 *          {{ status: number, body: object }} describing the refusal.
 */
export function checkApiAuth(request) {
  const token = process.env.DASHBOARD_API_TOKEN;
  const isProduction = process.env.NODE_ENV === "production";
  const allowPublic = process.env.DASHBOARD_ALLOW_PUBLIC_READS === "1";

  if (!token) {
    if (isProduction && !allowPublic) {
      return {
        status: 503,
        body: {
          error: "endpoint_not_configured",
          message:
            "This endpoint serves visitor data (IPs, geolocation, user agents) and " +
            "refuses to run unauthenticated in production. Set DASHBOARD_API_TOKEN, " +
            "or set DASHBOARD_ALLOW_PUBLIC_READS=1 if the deployment is already " +
            "protected by other means.",
        },
      };
    }
    return null; // development convenience
  }

  // Works with both routers: App Router gives a Web `Headers` object (.get()),
  // Pages Router gives a plain object of lowercased header names.
  const header =
    (typeof request.headers?.get === "function"
      ? request.headers.get("authorization")
      : request.headers?.authorization) ?? "";
  if (header !== `Bearer ${token}`) {
    return { status: 401, body: { error: "unauthorized" } };
  }

  return null;
}
