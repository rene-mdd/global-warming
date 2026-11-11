// lib/i18n.js — React-side locale helpers
//
// Rules that middleware.js also needs live in lib/i18n-config.js, which has
// no React dependency.

import { useRouter } from "next/router";
import en from "../locales/en";
import de from "../locales/de";
import { DEFAULT_LOCALE } from "./i18n-config";

export const DICTIONARIES = { en, de };

export function useLocale() {
  return useRouter().locale ?? DEFAULT_LOCALE;
}

/** The current locale's dictionary (see locales/en.js for its shape). */
export function useT() {
  return DICTIONARIES[useLocale()] ?? en;
}

/**
 * BCP 47 locale for number and date formatting, or undefined on English
 * pages, where the formatters keep using the browser's own locale as they
 * always have.
 */
export function useFormatLocale() {
  return useLocale() === "de" ? "de-DE" : undefined;
}
