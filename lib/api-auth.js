// lib/api-auth.js — server only
//
// Guards the read-only endpoints that expose visitor data.

/**
 * @returns {null} when the request may proceed, or
 *          {{ status: number, body: object }} describing the refusal.
 */
export default function checkApiAuth(request) {
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
