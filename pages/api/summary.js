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

// GISTEMP anomalies use a 1951–1980 base period. NASA's own FAQ gives ~+0.19 °C
// to express them against the 1850–1900 pre-industrial baseline the IPCC uses.
// Without it the tile under-reports warming by a fifth of a degree while looking
// precise. Revisit when NASA updates the figure.
const GISTEMP_TO_PREINDUSTRIAL_C = 0.19;

// The API exposes two temperature series, `station` and `land`. If the tile reads
// far from the widely reported ~+1.3 °C, switch this.
const TEMPERATURE_FIELD = "land";

const UPSTREAM_TIMEOUT_MS = Number(process.env.SUMMARY_TIMEOUT_MS || 15000);

// ---------------------------------------------------------------------------
// TWO CACHES, BECAUSE THEY COVER DIFFERENT GAPS
// ---------------------------------------------------------------------------
// `Cache-Control: s-maxage` below is a CDN instruction. In production it does the
// heavy lifting — most visitors never reach this function at all. But it is only
// an instruction to a shared cache, which means:
//
//   * `next dev` ignores it entirely (there is no CDN), so every local refresh
//     re-runs the whole six-API fan-out
//   * the first request after a deploy, or in each new region, is a miss
//
// So the route also memoises in module scope. That persists for the life of a
// warm serverless instance and for the whole dev session, which turns local
// refreshes into one upstream round and gives production a second line on a
// cache miss.
//
// It doubles as an outage buffer: if the feeds fail but a previous good payload
// is still held, the last good numbers are served rather than a thinner panel.
const CACHE_TTL_MS = Number(
  process.env.SUMMARY_TTL_MS || 24 * 60 * 60 * 1000, // 24 hours
);

let memo = null; // { payload, at }

// ---------------------------------------------------------------------------
// SINGLE FLIGHT
// ---------------------------------------------------------------------------
// Only one fan-out may be in progress at a time; concurrent callers await the

let inFlight = null;

/**
 * Number() that returns null instead of NaN.
 *
 * The empty-string guard is not padding: `Number("")` is **0**, so a feed that
 * pads a row with `"trend": ""` would publish "0 ppm" as the current CO2
 * concentration. A blank is missing data and must be skipped, never shown as zero.
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
// One extractor per API. Each returns a tile or null — never throws, because a
// single upstream change must cost one tile, not the whole panel.
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
    comparison: null, // a difference, not a level — see the baseline rule
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
    comparison: null, // also a departure, so also no percentage
    baselineLabel: "above the 20th-century average",
    asOf: latestYear,
  };
}

/** Temperature first (the number people came for), then the gases, then effects. */
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

/** Follows the current host, so preview deployments work unchanged. */
function baseUrl(req) {
  if (process.env.CLIMATE_API_BASE) return process.env.CLIMATE_API_BASE;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${host?.startsWith("localhost") ? "http" : "https"}://${host}`;
}

/** Resolves to null on any failure — one dead feed costs one tile. */
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
 * 24 hours for a complete payload: none of these datasets update faster than
 * daily and most are monthly, so a shorter window buys nothing and costs
 * upstream calls. A partial payload gets 5 minutes so the panel recovers
 * quickly. `stale-while-revalidate` the CDN serve the old copy while it
 * refreshes behind the request, so nobody waits for the fan-out.
 */
function setCacheHeaders(res, complete) {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${complete ? 86400 : 300}, stale-while-revalidate=604800`,
  );
}

/** Fetch of all six and build the payload. One caller at a time — see inFlight. */
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

    // Prefer the last good payload over a freshly-built worse one. A panel that
    // loses two tiles for a day because a feed blipped is worse than one showing
    // yesterday's numbers, which is what these datasets are anyway.
    if (memo?.payload?.complete) {
      setCacheHeaders(res, false);
      res.setHeader("x-summary-cache", "memo-stale");
      return res.status(200).json(memo.payload);
    }
  }

  const payload = { ...summary, generatedAt: new Date().toISOString() };

  // Only a complete payload earns the full TTL. A partial one is held briefly so
  // a broken feed doesn't cause a fan-out on every single request, but expires
  // soon enough that the panel heals itself.
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
