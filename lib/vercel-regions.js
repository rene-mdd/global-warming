// lib/vercel-regions.js
//
// Country-code display helpers for the countries the geo headers report.
// There is deliberately no edge-region lookup here: an edge region is a fact
// about which datacenter served a request, not about the visitor, and is no
// longer used as a geolocation source.

// ISO 3166-1 alpha-2 -> display name, for the countries the geo headers report.
// Falls back to the raw code for anything not listed.
const COUNTRY_NAMES = {
  AE: "United Arab Emirates",
  AR: "Argentina",
  AT: "Austria",
  AU: "Australia",
  BE: "Belgium",
  BR: "Brazil",
  CA: "Canada",
  CH: "Switzerland",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  CZ: "Czechia",
  DE: "Germany",
  DK: "Denmark",
  EG: "Egypt",
  ES: "Spain",
  FI: "Finland",
  FR: "France",
  GB: "United Kingdom",
  GR: "Greece",
  HK: "Hong Kong",
  HU: "Hungary",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IN: "India",
  IT: "Italy",
  JP: "Japan",
  KE: "Kenya",
  KR: "South Korea",
  MA: "Morocco",
  MX: "Mexico",
  MY: "Malaysia",
  NG: "Nigeria",
  NL: "Netherlands",
  NO: "Norway",
  NZ: "New Zealand",
  PE: "Peru",
  PH: "Philippines",
  PL: "Poland",
  PT: "Portugal",
  RO: "Romania",
  RS: "Serbia",
  SA: "Saudi Arabia",
  SE: "Sweden",
  SG: "Singapore",
  TH: "Thailand",
  TR: "Türkiye",
  TW: "Taiwan",
  UA: "Ukraine",
  US: "United States",
  VN: "Vietnam",
  ZA: "South Africa",
};

export function countryName(code) {
  if (!code) return "Unknown";
  const upper = String(code).toUpperCase();
  return COUNTRY_NAMES[upper] ?? upper;
}

/** Turns "US" into the regional-indicator flag emoji 🇺🇸. */
export function countryFlag(code) {
  if (!code || String(code).length !== 2) return "";
  const upper = String(code).toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return "";
  return String.fromCodePoint(
    ...[...upper].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}
