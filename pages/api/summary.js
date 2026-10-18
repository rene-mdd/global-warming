// pages/api/summary.js

import { withRequestLogging } from "../../lib/log-request";

const UPSTREAM = {
  temperature: "/api/temperature-api",
  co2: "/api/co2-api",
  methane: "/api/methane-api",
  nitrous: "/api/nitrous-oxide-api",
  arctic: "/api/arctic-api",
  ocean: "/api/ocean-warming-api",
};

// Pre-industrial (1750) concentrations — IPCC AR6 WGI, Annex III.
const PREINDUSTRIAL = { co2: 278.3, methane: 729.2, nitrous: 270.1 };

// Offset added to a GISTEMP anomaly (1951–1980 base period) to express it
// against the 1850–1900 IPCC pre-industrial baseline instead.
const GISTEMP_TO_PREINDUSTRIAL_C = 0.19;

// Which of the API's two temperature series the tile reads: `station` or `land`.
const TEMPERATURE_FIELD = "land";

const UPSTREAM_TIMEOUT_MS = Number(process.env.SUMMARY_TIMEOUT_MS || 15000);

// ---------------------------------------------------------------------------
// CACHING
// ---------------------------------------------------------------------------
// `Cache-Control: s-maxage` below tells the CDN how long to serve a response
// without re-invoking this function. The route additionally memoises the built
// payload in module scope, keyed by time: this serves local `next dev` refreshes
// and cold/first-region requests from memory, and serves the last complete
// payload if a later fetch produces an incomplete one.
const CACHE_TTL_MS = Number(
  process.env.SUMMARY_TTL_MS || 24 * 60 * 60 * 1000, // 24 hours
);

let memo = null; // { payload, at }

// ---------------------------------------------------------------------------
// SINGLE FLIGHT
// ---------------------------------------------------------------------------
// At most one upstream fan-out runs at a time; concurrent callers await it.

let inFlight = null;

/**
 * Number() that returns null instead of NaN, and null for an empty string
 * (`Number("")` is otherwise 0, which would be indistinguishable from missing data).
 */
function num(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Last usable element, searching backwards past unusable ones. */
function lastWhere(array, predicate) {
  if (!Array.isArray(array)) return null;
  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (predicate(array[i])) return array[i];
  }
  return null;
}

function percentAbove(current, baseline) {
  if (current === null || !baseline) return null;
  return Math.round(((current - baseline) / baseline) * 100);
}

function monthName(monthIndex) {
  return new Date(Date.UTC(2000, monthIndex, 1)).toLocaleString("en", {
    month: "short",
    timeZone: "UTC",
  });
}

/** "2026.3" (year.month) or "1998.29" (decimal fraction) -> "Mar 2026". */
function fractionalYearLabel(raw) {
  const [yearPart, fractionPart] = String(raw ?? "").split(".");
  const year = Number(yearPart);
  if (!Number.isFinite(year)) return null;
  if (!fractionPart) return String(year);

  const monthIndex =
    fractionPart.length <= 2 && Number(fractionPart) <= 12
      ? Number(fractionPart) - 1
      : Math.min(11, Math.floor(Number(`0.${fractionPart}`) * 12));

  return `${monthName(monthIndex)} ${year}`;
}

// ---------------------------------------------------------------------------
// One extractor per API. Each returns a tile object or null, and never throws.
// ---------------------------------------------------------------------------

export function temperatureTile(json) {
  const row = lastWhere(
    json?.result,
    (r) => num(r?.[TEMPERATURE_FIELD]) !== null,
  );
  const anomaly = num(row?.[TEMPERATURE_FIELD]);
  if (anomaly === null) return null;

  return {
    key: "temperature",
    label: "Global temperature",
    value: Number((anomaly + GISTEMP_TO_PREINDUSTRIAL_C).toFixed(2)),
    unit: "°C",
    valuePrefix: "+",
    comparison: null, // this value is a degree difference, not a percentage
    baselineLabel: "above the 1850–1900 average",
    asOf: fractionalYearLabel(row?.time),
  };
}

export function co2Tile(json) {
  const row = lastWhere(
    json?.co2,
    (r) => num(r?.trend) !== null || num(r?.cycle) !== null,
  );
  const value = num(row?.trend) ?? num(row?.cycle);
  if (value === null) return null;

  return {
    key: "co2",
    label: "Carbon dioxide",
    value,
    unit: "ppm",
    comparison: percentAbove(value, PREINDUSTRIAL.co2),
    baselineLabel: `above the ${PREINDUSTRIAL.co2} ppm of 1750`,
    asOf:
      row?.year && row?.month
        ? `${monthName(Number(row.month) - 1)} ${row.year}`
        : null,
  };
}

/** Methane and N2O share a shape: { date, average, trend, … }. */
function concentrationTile({ rows, key, label, baseline, unit }) {
  const row = lastWhere(
    rows,
    (r) => num(r?.trend) !== null || num(r?.average) !== null,
  );
  const value = num(row?.trend) ?? num(row?.average);
  if (value === null) return null;

  return {
    key,
    label,
    value,
    unit,
    comparison: percentAbove(value, baseline),
    baselineLabel: `above the ${baseline} ${unit} of 1750`,
    asOf: fractionalYearLabel(row?.date),
  };
}

export function methaneTile(json) {
  return concentrationTile({
    rows: json?.methane,
    key: "methane",
    label: "Methane",
    baseline: PREINDUSTRIAL.methane,
    unit: "ppb",
  });
}

export function nitrousTile(json) {
  return concentrationTile({
    rows: json?.nitrous,
    key: "nitrous",
    label: "Nitrous oxide",
    baseline: PREINDUSTRIAL.nitrous,
    unit: "ppb",
  });
}

export function seaIceTile(json) {
  const data = json?.arcticData?.data;
  if (!data || typeof data !== "object") return null;

  // Keyed "YYYYMM", so lexicographic order is chronological order.
  const keys = Object.keys(data).sort();
  const missing = num(json?.arcticData?.description?.missing) ?? -9999;

  let latestKey = null;
  for (let i = keys.length - 1; i >= 0; i -= 1) {
    const value = num(data[keys[i]]?.value);
    if (value !== null && value !== missing && value > 0) {
      latestKey = keys[i];
      break;
    }
  }
  if (!latestKey) return null;

  const entry = data[latestKey];
  const anomaly = num(entry.anom);
  const monthlyMean = num(entry.monthlyMean);
  const month = monthName(Number(latestKey.slice(4, 6)) - 1);

  return {
    key: "seaIce",
    label: "Global sea ice",
    value: Number(num(entry.value).toFixed(2)),
    unit: "M km²",
    // The anomaly is already relative to the base period, so the share is
    // anomaly / base mean.
    comparison:
      anomaly !== null && monthlyMean > 0
        ? Math.round((anomaly / monthlyMean) * 100)
        : null,
    // The record begins in 1979. The API writes its base period with
    // a hyphen.
    baselineLabel: `vs the ${String(
      json?.arcticData?.description?.basePeriod ?? "1991–2020",
    ).replace(/-/g, "–")} average for ${month}`,
    asOf: `${month} ${latestKey.slice(0, 4)}`,
  };
}

export function oceanTile(json) {
  const result = json?.result;
  if (!result || typeof result !== "object") return null;

  const years = Object.keys(result).sort();
  let latestYear = null;
  for (let i = years.length - 1; i >= 0; i -= 1) {
    if (num(result[years[i]]?.departure) !== null) {
      latestYear = years[i];
      break;
    }
  }
  if (!latestYear) return null;

  const departure = num(result[latestYear].departure);

  return {
    key: "ocean",
    label: "Ocean warming",
    value: Number(departure.toFixed(2)),
    unit: "°C",
    valuePrefix: departure > 0 ? "+" : "",
    comparison: null, // this value is a degree departure, not a percentage
    baselineLabel: "above the 20th-century average",
    asOf: latestYear,
  };
}

/** Builds the indicator list in order: temperature, then the gases, then ice and ocean. */
export function buildSummary(sources = {}) {
  const indicators = [
    temperatureTile(sources.temperature),
    co2Tile(sources.co2),
    methaneTile(sources.methane),
    nitrousTile(sources.nitrous),
    seaIceTile(sources.arctic),
    oceanTile(sources.ocean),
  ].filter(Boolean);

  return { indicators, expected: 6, complete: indicators.length === 6 };
}

/** Builds the base URL from the request's host header. */
function baseUrl(req) {
  if (process.env.CLIMATE_API_BASE) return process.env.CLIMATE_API_BASE;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${host?.startsWith("localhost") ? "http" : "https"}://${host}`;
}

/** Fetches a URL and returns its parsed JSON, or null on any failure. */
async function fetchOne(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    if (!response.ok) {
      console.warn(`[api/summary] ${url} returned ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (err) {
    console.warn(`[api/summary] ${url} failed: ${err?.message ?? err}`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Sets the CDN cache lifetime: 24 hours for a complete payload, 5 minutes for
 * a partial one, plus `stale-while-revalidate` so a refresh happens behind the
 * request instead of the caller waiting on it.
 */
function setCacheHeaders(res, complete) {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${complete ? 86400 : 300}, stale-while-revalidate=604800`,
  );
}

/** Fetches all six upstream APIs and builds the payload from their results. */
async function refresh(base) {
  const names = Object.keys(UPSTREAM);
  const results = await Promise.all(
    names.map((name) => fetchOne(`${base}${UPSTREAM[name]}`)),
  );

  const sources = {};
  names.forEach((name, index) => {
    sources[name] = results[index];
  });

  return buildSummary(sources);
}

async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method not allowed" });
  }

  // Serve the in-process copy while it is fresh — no upstream calls at all.
  if (memo && Date.now() - memo.at < CACHE_TTL_MS) {
    setCacheHeaders(res, true);
    res.setHeader("x-summary-cache", "memo");
    return res.status(200).json(memo.payload);
  }

  const base = baseUrl(req);

  // Join the in-progress fan-out if there is one, otherwise start it.
  if (!inFlight) {
    inFlight = refresh(base).finally(() => {
      inFlight = null;
    });
  }
  const summary = await inFlight;

  if (!summary.complete) {
    console.warn(
      `[api/summary] ${summary.indicators.length}/6 indicators built — an upstream API is failing or has changed shape.`,
    );

    // Serve the last complete cached payload instead of this partial one, if one exists.
    if (memo?.payload?.complete) {
      setCacheHeaders(res, false);
      res.setHeader("x-summary-cache", "memo-stale");
      return res.status(200).json(memo.payload);
    }
  }

  const payload = { ...summary, generatedAt: new Date().toISOString() };

  // Complete payloads get the full memo TTL; partial payloads get a short one.
  if (summary.indicators.length > 0) {
    memo = {
      payload,
      at: summary.complete ? Date.now() : Date.now() - CACHE_TTL_MS + 300_000,
    };
  }

  setCacheHeaders(res, summary.complete);
  res.setHeader("x-summary-cache", "miss");
  return res.status(200).json(payload);
}

export default withRequestLogging(handler, { handler: "summary" });
