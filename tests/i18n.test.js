// tests/i18n.test.js
//
// Locale rules that protect the English site's SEO (lib/i18n-config.js),
// the German dictionary's completeness, and the client-side translation of
// /api/summary tiles (lib/summary-i18n.js).
//
// Run with: npm test

import { test } from "node:test";
import assert from "node:assert/strict";

import en from "../locales/en.js";
import de from "../locales/de.js";
import {
  browserLocale,
  cookieRedirectLocale,
  untranslatedRedirectLocale,
  linkLocale,
  localizedPath,
  localizedUrl,
} from "../lib/i18n-config.js";
import localizeIndicator from "../lib/summary-i18n.js";

/** Key paths in `a` (recursively) that `b` lacks or has with another type. */
function missingKeys(a, b, prefix = "") {
  return Object.keys(a).flatMap((key) => {
    const path = `${prefix}${key}`;
    if (!(key in b)) return [path];
    if (Array.isArray(a[key]) !== Array.isArray(b[key])) return [path];
    if (typeof a[key] !== typeof b[key]) return [path];
    if (a[key] && typeof a[key] === "object" && !Array.isArray(a[key])) {
      return missingKeys(a[key], b[key], `${path}.`);
    }
    return [];
  });
}

test("de.js has every key en.js has", () => {
  assert.deepEqual(missingKeys(en, de), []);
});

test("no redirect without an explicit cookie choice (crawlers carry none)", () => {
  assert.equal(
    cookieRedirectLocale({ cookie: undefined, locale: "en", pathname: "/" }),
    null
  );
});

test("cookie choice redirects only to a page that exists in that locale", () => {
  assert.equal(
    cookieRedirectLocale({ cookie: "de", locale: "en", pathname: "/" }),
    "de"
  );
  assert.equal(
    cookieRedirectLocale({ cookie: "de", locale: "en", pathname: "/logs" }),
    null
  );
  assert.equal(
    cookieRedirectLocale({ cookie: "en", locale: "de", pathname: "/logs" }),
    "en"
  );
  assert.equal(
    cookieRedirectLocale({ cookie: "de", locale: "de", pathname: "/" }),
    null
  );
  assert.equal(
    cookieRedirectLocale({ cookie: "fr", locale: "en", pathname: "/" }),
    null
  );
});

test("/de URLs without a German version redirect to English", () => {
  assert.equal(
    untranslatedRedirectLocale({ locale: "de", pathname: "/logs" }),
    "en"
  );
  assert.equal(
    untranslatedRedirectLocale({ locale: "de", pathname: "/privacy-policy" }),
    null
  );
  assert.equal(untranslatedRedirectLocale({ locale: "de", pathname: "/" }), null);
  assert.equal(
    untranslatedRedirectLocale({ locale: "en", pathname: "/logs" }),
    null
  );
});

test("localizedPath prefixes only pages that exist in the locale", () => {
  assert.equal(localizedPath("/contact", "de"), "/de/contact");
  assert.equal(localizedPath("/logs", "de"), "/logs");
  assert.equal(localizedPath("/contact", "en"), "/contact");
});

test("untranslated /de pages are previewable under next dev only", () => {
  assert.equal(
    untranslatedRedirectLocale({
      locale: "de",
      pathname: "/logs",
      preview: true,
    }),
    null
  );
});

test("German internal links fall back to English for untranslated pages", () => {
  assert.equal(linkLocale("/", "de"), "de");
  assert.equal(linkLocale("/logs", "de"), "en");
  assert.equal(linkLocale("/logs", "en"), "en");
});

test("English URLs are returned unchanged; German ones get a /de prefix", () => {
  assert.equal(
    localizedUrl("https://global-warming.org", "/", "en"),
    "https://global-warming.org"
  );
  assert.equal(
    localizedUrl("https://global-warming.org", "/", "de"),
    "https://global-warming.org/de"
  );
  assert.equal(
    localizedUrl("https://www.global-warming.org/about", "/about", "de"),
    "https://www.global-warming.org/de/about"
  );
});

test("browserLocale picks the first supported language", () => {
  assert.equal(browserLocale(["de-DE", "en-US"]), "de");
  assert.equal(browserLocale(["fr-FR", "en-GB"]), "en");
  assert.equal(browserLocale(["fr-FR"]), null);
  assert.equal(browserLocale(undefined), null);
});

test("summary tiles: every baseline label /api/summary emits is translated", () => {
  const cases = [
    ["above the 1850–1900 average", "über dem Mittel von 1850–1900"],
    ["above the 278.3 ppm of 1750", "über 278,3 ppm (Wert von 1750)"],
    ["above the 729.2 ppb of 1750", "über 729,2 ppb (Wert von 1750)"],
    ["vs the 1991–2020 average for Mar", "ggü. dem März-Mittel 1991–2020"],
    ["above the 20th-century average", "über dem Mittel des 20. Jahrhunderts"],
  ];
  for (const [english, german] of cases) {
    const out = localizeIndicator(
      { key: "co2", label: "Carbon dioxide", baselineLabel: english },
      "de",
      de.summary
    );
    assert.equal(out.baselineLabel, german);
  }
});

test("summary tiles: labels, units and dates; unknown text stays English", () => {
  const out = localizeIndicator(
    {
      key: "seaIce",
      label: "Global sea ice",
      unit: "M km²",
      baselineLabel: "something new",
      asOf: "Oct 2026",
    },
    "de",
    de.summary
  );
  assert.equal(out.label, "Globales Meereis");
  assert.equal(out.unit, "Mio. km²");
  assert.equal(out.asOf, "Okt. 2026");
  assert.equal(out.baselineLabel, "something new");
});

test("summary tiles: English is returned unchanged", () => {
  const indicator = { key: "co2", label: "Carbon dioxide", asOf: "Mar 2026" };
  assert.deepEqual(localizeIndicator(indicator, "en", en.summary), indicator);
});

// public/data/dummy.de.js: German ESG data. Only the rendered prose field
// may differ from public/data/dummy.js; every other field must match so the
// German page shows the same scores, logos and sources.
const TRANSLATED_ESG_FIELD = "row.attributes.additional_details.value";

/** Every leaf as [dotted path, value], array indexes included. */
function leaves(value, path = "") {
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      leaves(child, path ? `${path}.${key}` : key)
    );
  }
  return [[path, value]];
}

test("ESG: German data matches the English data except the translated prose", async () => {
  const { default: business } = await import("../public/data/dummy.js");
  const { default: businessDe } = await import("../public/data/dummy.de.js");

  assert.equal(businessDe.length, business.length);
  business.forEach((company, i) => {
    const english = leaves(company).filter(
      ([path]) => path !== TRANSLATED_ESG_FIELD
    );
    const german = leaves(businessDe[i]).filter(
      ([path]) => path !== TRANSLATED_ESG_FIELD
    );
    assert.deepEqual(german, english);
  });
});

test("ESG: every company has a German text with the same HTML tags", async () => {
  const { default: business } = await import("../public/data/dummy.js");
  const { GERMAN_DETAILS } = await import("../public/data/dummy.de.js");
  const tags = (html) => html.match(/<[^>]+>/g) ?? [];

  for (const { row } of business) {
    const { title, additional_details: details } = row.attributes;
    assert.ok(title in GERMAN_DETAILS, `no German text for ${title}`);
    assert.deepEqual(tags(GERMAN_DETAILS[title]), tags(details.value), title);
  }
});
