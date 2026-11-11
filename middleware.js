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
  const target =
    untranslatedRedirectLocale({
      locale,
      pathname,
      preview: process.env.NODE_ENV === "development",
    }) ??
    cookieRedirectLocale({
      cookie: request.cookies.get(LOCALE_COOKIE)?.value,
      locale,
      pathname,
    });
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
