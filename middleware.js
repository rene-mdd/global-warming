// middleware.js — locale redirects
//
// Two redirects: a /de URL for a page with no German version goes to the
// English page, and the NEXT_LOCALE cookie, when it holds an explicit choice
// (set by the language switcher or the suggestion banner), picks the locale.
// There is no redirect by Accept-Language or IP: crawlers carry no cookie,
// so every crawl gets the URL it requested and the English pages' indexing
// is untouched.

import { NextResponse } from "next/server";
import {
  LOCALE_COOKIE,
  cookieRedirectLocale,
  untranslatedRedirectLocale,
} from "./lib/i18n-config";

export function middleware(request) {
  const { locale, pathname } = request.nextUrl;
  // Client-side navigations and link prefetches carry x-nextjs-data. The
  // cookie redirect skips them: the router caches a prefetch's redirect, so a
  // prefetch made while the cookie still held the old language sent the
  // switcher's click back to the page it came from, and from there forth
  // again, freezing the tab. Links inside the site already point at the right
  // locale, so only full page loads need the cookie.
  const clientNavigation = request.headers.has("x-nextjs-data");
  const target =
    untranslatedRedirectLocale({
      locale,
      pathname,
      preview: process.env.NODE_ENV === "development",
    }) ??
    (clientNavigation
      ? null
      : cookieRedirectLocale({
          cookie: request.cookies.get(LOCALE_COOKIE)?.value,
          locale,
          pathname,
        }));
  if (!target) return undefined;

  const url = request.nextUrl.clone();
  url.locale = target;
  return NextResponse.redirect(url);
}

export const config = {
  // Pages only: no API routes, build assets, or files with an extension.
  // "/" is listed separately: with i18n on, Next matches against the
  // locale-prefixed path ("/en", "/de"), which the second pattern can't
  // match because it needs a segment after the locale.
  matcher: ["/", "/((?!api/|_next/|.*\\.).*)"],
};
