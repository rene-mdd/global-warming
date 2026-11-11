// lib/summary-i18n.js — localises the /api/summary tiles on the client
//
// /api/summary is a public, CDN-cached API with English labels (and is one
// self-contained file on purpose, see CLAUDE.md decision 12), so it is not
// made locale-aware. The landing page translates its tiles instead. Any
// label that matches no rule below is shown in English rather than guessed.

const BASELINE_RULES = {
  de: [
    [/^above the 1850–1900 average$/, () => "über dem Mittel von 1850–1900"],
    [
      /^above the 20th-century average$/,
      () => "über dem Mittel des 20. Jahrhunderts",
    ],
    [
      /^above the (\S+) (\S+) of 1750$/,
      (value, unit) =>
        `über ${value.replace(".", ",")} ${unit} (Wert von 1750)`,
    ],
    [
      /^vs the (\S+) average for (\w+)$/,
      (period, month, t) =>
        `ggü. dem ${
          month in t.months ? t.months[month] : month
        }-Mittel ${period}`,
    ],
  ],
};

function translateBaseline(label, locale, t) {
  for (const [pattern, render] of BASELINE_RULES[locale] ?? []) {
    const match = pattern.exec(label ?? "");
    if (match) return render(...match.slice(1), t);
  }
  return label;
}

/** "Mar 2026" -> "März 2026"; anything else unchanged. */
function translateAsOf(asOf, t) {
  if (!asOf) return asOf;
  const [month, year] = asOf.split(" ");
  return year && month in t.months ? `${t.months[month]} ${year}` : asOf;
}

/**
 * One /api/summary indicator in `locale`. `t` is that locale's `summary`
 * dictionary; English returns the indicator unchanged.
 */
export default function localizeIndicator(indicator, locale, t) {
  if (!t?.labels) return indicator;
  return {
    ...indicator,
    label: t.labels[indicator.key] ?? indicator.label,
    unit: t.units?.[indicator.unit] ?? indicator.unit,
    baselineLabel: translateBaseline(indicator.baselineLabel, locale, t),
    asOf: translateAsOf(indicator.asOf, t),
  };
}
