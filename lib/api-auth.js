// lib/api-auth.js — server only
//
// Guards the read-only endpoints that expose visitor data.
//
// ---------------------------------------------------------------------------

/**
 * @returns {{ refusal: null | { status: number, body: object }, elevated: boolean }}
 *   refusal  — non-null means respond with it and stop.
 *   elevated — true means serve unreduced, per-visitor data.
 */
export default function checkApiAuth(request) {
  const token = process.env.DASHBOARD_API_TOKEN;
  const isProduction = process.env.NODE_ENV === "production";
  const allowPublic = process.env.DASHBOARD_ALLOW_PUBLIC_READS === "1";
  const publicMode = process.env.DASHBOARD_PUBLIC_MODE === "1";

  // Works with both routers: App Router gives a Web `Headers` object (.get()),
  // Pages Router gives a plain object of lowercased header names.
  const header =
    (typeof request.headers?.get === "function"
      ? request.headers.get("authorization")
      : request.headers?.authorization) ?? "";

  // --- The operator, identified by token ---
  // Checked first so that setting a token never breaks the operator's own access
  // regardless of the other flags.
  if (token && header === `Bearer ${token}`) {
    return { refusal: null, elevated: true };
  }

  // --- Everyone else ---
  // Reduced data is safe to serve anonymously; unreduced data is not.
  if (publicMode || allowPublic) {
    return { refusal: null, elevated: false };
  }

  if (token) {
    // A token exists and this request didn't present it, and nothing says the
    // reduced view is acceptable. Refuse rather than downgrade silently.
    return {
      refusal: { status: 401, body: { error: "unauthorized" } },
      elevated: false,
    };
  }

  if (isProduction) {
    return {
      refusal: {
        status: 503,
        body: {
          error: "endpoint_not_configured",
          message:
            "This endpoint serves visitor data (IPs, geolocation, user agents) and " +
            "refuses to run unauthenticated in production. Set DASHBOARD_PUBLIC_MODE=1 " +
            "to publish aggregate statistics only, set DASHBOARD_API_TOKEN for operator " +
            "access, or set DASHBOARD_ALLOW_PUBLIC_READS=1 if the deployment is already " +
            "protected by other means.",
        },
      },
      elevated: false,
    };
  }

  // Development convenience: no token, not production — serve everything.
  return { refusal: null, elevated: true };
}
