// components/semantic/localizedDecimal.js — decimal comma for German pages
//
// The climate APIs return readings as strings ("421.53"). Swapping the
// separator instead of parsing keeps every digit exactly as published,
// including trailing zeros that Number#toLocaleString would drop. English
// pages get the value back unchanged.

import { useLocale } from "../../lib/i18n";

const DECIMAL = /^-?\d+(\.\d+)?$/;

export default function useLocalizedDecimal() {
  const locale = useLocale();
  return (value) =>
    locale === "de" && typeof value === "string" && DECIMAL.test(value.trim())
      ? value.trim().replace(".", ",")
      : value;
}
