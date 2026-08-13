// lib/vercel-regions.js
//
// Vercel edge/function region codes -> the datacenter's city and country.
//
// IMPORTANT: this is the region that SERVED the request, not where the visitor
// actually is. Vercel routes to the nearest edge, so it's a rough proxy for
// visitor location - good enough for "roughly which part of the world", wrong
// for anything precise. For the visitor's real country, use the
// `x-vercel-ip-country` header inside your function and log it (see
// lib/log-request.js) - those values arrive tagged geoSource: "headers".
//
// Reference: https://vercel.com/docs/regions

export const VERCEL_REGIONS = {
  arn1: { city: "Stockholm", country: "SE", countryName: "Sweden" },
  bom1: { city: "Mumbai", country: "IN", countryName: "India" },
  cdg1: { city: "Paris", country: "FR", countryName: "France" },
  cle1: { city: "Cleveland", country: "US", countryName: "United States" },
  cpt1: { city: "Cape Town", country: "ZA", countryName: "South Africa" },
  dub1: { city: "Dublin", country: "IE", countryName: "Ireland" },
  dxb1: { city: "Dubai", country: "AE", countryName: "United Arab Emirates" },
  fra1: { city: "Frankfurt", country: "DE", countryName: "Germany" },
  gru1: { city: "São Paulo", country: "BR", countryName: "Brazil" },
  hkg1: { city: "Hong Kong", country: "HK", countryName: "Hong Kong" },
  hnd1: { city: "Tokyo", country: "JP", countryName: "Japan" },
  iad1: {
    city: "Washington, D.C.",
    country: "US",
    countryName: "United States",
  },
  icn1: { city: "Seoul", country: "KR", countryName: "South Korea" },
  kix1: { city: "Osaka", country: "JP", countryName: "Japan" },
  lhr1: { city: "London", country: "GB", countryName: "United Kingdom" },
  mad1: { city: "Madrid", country: "ES", countryName: "Spain" },
  pdx1: { city: "Portland", country: "US", countryName: "United States" },
  sfo1: { city: "San Francisco", country: "US", countryName: "United States" },
  sin1: { city: "Singapore", country: "SG", countryName: "Singapore" },
  syd1: { city: "Sydney", country: "AU", countryName: "Australia" },
  yul1: { city: "Montreal", country: "CA", countryName: "Canada" },
  zrh1: { city: "Zurich", country: "CH", countryName: "Switzerland" },
};

export function regionInfo(code) {
  if (!code) return null;
  // Region strings can look like "sfo1" or occasionally carry a suffix.
  const key = String(code).toLowerCase().slice(0, 4);
  return VERCEL_REGIONS[key] ?? null;
}

/** "sfo1" -> "San Francisco (sfo1)" */
export function regionLabel(code) {
  const info = regionInfo(code);
  return info ? `${info.city} (${code})` : String(code ?? "unknown");
}

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
