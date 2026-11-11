// lib/i18n-config.js — locale rules shared by pages, components and middleware.js
//
// Dependency-free on purpose: middleware.js imports it, and middleware runs
// in the Edge runtime, where React and next/router are not available.

export const LOCALES = ["en", "de"];
export const DEFAULT_LOCALE = "en";

// Same name Next.js uses for its own locale cookie.
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// Pages with a complete German translation. The /de version of any other
// page is served with noindex, left out of hreflang, and never linked from
// the site, so a half-English page never competes with its English original
// in search results. Add a path here once its page is fully translated.
export const TRANSLATED_PATHS = new Set([
  "/",
  "/about",
  "/contact",
  "/deforestation",
  "/donate",
  "/esg",
  "/imprint",
  "/news",
  "/privacy-policy",
  "/traffic",
]);

export function isTranslated(pathname) {
  return TRANSLATED_PATHS.has(pathname);
}

/**
 * Locale an internal link to `pathname` should use: the current one when
 * that page exists in it, otherwise English.
 */
export function linkLocale(pathname, locale) {
  if (locale === DEFAULT_LOCALE || isTranslated(pathname)) return locale;
  return DEFAULT_LOCALE;
}

/**
 * Href for an internal link rendered as a plain <a> (e.g. MUI Link), which
 * doesn't add the locale prefix the way next/link does.
 */
export function localizedPath(pathname, locale) {
  const target = linkLocale(pathname, locale);
  return target === DEFAULT_LOCALE ? pathname : `/${target}${pathname}`;
}

/**
 * Locale to send a request to because the page has no version in the
 * requested one, or null. /de/imprint, /de/logs etc. would otherwise serve
 * English content under a German URL; redirecting to the English page leaves
 * one URL per piece of content. Cannot loop with cookieRedirectLocale(),
 * which never redirects into an untranslated locale. `preview` (true under
 * `next dev`) skips it, so translation drafts not yet in TRANSLATED_PATHS
 * can be reviewed locally; they render with noindex.
 */
export function untranslatedRedirectLocale({ locale, pathname, preview }) {
  if (preview || locale === DEFAULT_LOCALE || isTranslated(pathname)) {
    return null;
  }
  return DEFAULT_LOCALE;
}

/**
 * Locale to redirect to, or null to serve the request as-is.
 *
 * Only an explicit choice (the cookie) ever redirects. Search crawlers don't
 * send cookies, so they always get the URL they requested.
 */
export function cookieRedirectLocale({ cookie, locale, pathname }) {
  if (!cookie || cookie === locale || !LOCALES.includes(cookie)) return null;
  if (cookie !== DEFAULT_LOCALE && !isTranslated(pathname)) return null;
  return cookie;
}

/** Browser-side: stores the visitor's language choice for middleware.js. */
export function rememberLocale(locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

/** Browser-side: the stored choice, or null when the visitor hasn't made one. */
export function storedLocale() {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`)
  );
  return match && LOCALES.includes(match[1]) ? match[1] : null;
}

/**
 * First supported locale in the browser's preference list, e.g.
 * ["de-DE", "en"] -> "de". Null when none is supported.
 */
export function browserLocale(languages) {
  for (const tag of languages ?? []) {
    const base = String(tag).toLowerCase().split("-")[0];
    if (LOCALES.includes(base)) return base;
  }
  return null;
}

/**
 * Absolute URL of `pathname` in `locale`, on the same origin as the page's
 * English canonical URL.
 */
export function localizedUrl(englishUrl, pathname, locale) {
  if (locale === DEFAULT_LOCALE) return englishUrl;
  const { origin } = new URL(englishUrl);
  return `${origin}/${locale}${pathname === "/" ? "" : pathname}`;
}
