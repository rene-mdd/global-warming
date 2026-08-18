const csv = require("csvtojson");

// ---------------------------------------------------------------------------
// 12-hour in-process cache
// ---------------------------------------------------------------------------
// The CDN handles most requests, but every cache miss — cold start, new region,
// first request after a deploy — costs a NOAA round trip plus a full CSV-to-JSON
// parse. This holds the parsed result for the life of the instance.
//
// It also doubles as an outage buffer: for a dataset that updates daily at most,
// serving yesterday's numbers beats "Data currently unavailable".
const CACHE_TTL_MS = Number(
  process.env.API_CACHE_TTL_MS || 12 * 60 * 60 * 1000,
);
let memo = null; // { payload, at }

const SOURCE = "https://gml.noaa.gov/aftp/products/trends/ch4/ch4_mm_gl.txt";

/** CORS + cache headers. One place, so the cache directives can't drift apart. */
const setStandardHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );
  const policy =
    "public, max-age=0, s-maxage=43200, stale-while-revalidate=3600, stale-if-error=86400";
  res.setHeader("Vercel-CDN-Cache-Control", policy);
  res.setHeader("CDN-Cache-Control", policy);
  res.setHeader("Cache-Control", policy);
};

/** Fresh in-memory copy, if we have one. */
const serveMemo = (res, state) => {
  setStandardHeaders(res);
  res.setHeader("x-api-cache", state);
  res.status(200).json(memo.payload);
};

const serveError = (res, error) => {
  console.error(error);
  // Prefer stale data over an error page.
  if (memo) {
    serveMemo(res, "memo-stale");
    return;
  }
  res.status(500).send({
    result:
      "Data currently unavailable. Try again later. If the problem persists, please inform us at help@global-warming.org",
    error,
  });
};

// How long NOAA gets to answer. HTTPS is fast; if this ever trips, the cause is
// an outage rather than a slow transfer, and the memo below covers it.
const SOURCE_TIMEOUT_MS = Number(process.env.NOAA_TIMEOUT_MS || 10000);

const fetchSource = async (url) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SOURCE_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "text/plain" },
    });
    if (!response.ok) {
      return {
        data: null,
        error: new Error(`${url} returned ${response.status}`),
      };
    }
    const data = await response.text();
    if (!data || !data.trim()) {
      return { data: null, error: new Error(`${url} returned an empty body`) };
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  } finally {
    clearTimeout(timer);
  }
};

/** Their original parse, unchanged — only lifted out of the handler. */
const parseGas = (csvToJson) => {
  const oldKey =
    "# --------------------------------------------------------------------";
  const sliced = csvToJson.slice(62);
  const rows = [];
  sliced.forEach((obj) => {
    if (oldKey !== "year") {
      Object.defineProperty(
        obj,
        ["year"],
        Object.getOwnPropertyDescriptor(obj, oldKey),
      );
      // eslint-disable-next-line no-param-reassign
      delete obj[oldKey];
    }
    const fields = obj.year.split(" ").filter((f) => f);
    rows.push({
      date: `${fields[0]}.${fields[1]}`,
      average: fields[3],
      trend: fields[5],
      averageUnc: fields[4],
      trendUnc: fields[6],
    });
  });
  return rows;
};

export default async (req, res) => {
  if (memo && Date.now() - memo.at < CACHE_TTL_MS) {
    serveMemo(res, "memo");
    return;
  }

  const { data, error } = await fetchSource(SOURCE);

  if (error) {
    serveError(res, error);
    return;
  }

  try {
    const jsonObj = await csv().fromString(data);
    const rows = parseGas(jsonObj);

    if (!rows.length) {
      throw new Error("NOAA file parsed to zero rows");
    }

    const payload = { methane: rows };
    memo = { payload, at: Date.now() };

    setStandardHeaders(res);
    res.setHeader("x-api-cache", "miss");
    res.status(200).json(payload);
  } catch (parseError) {
    serveError(res, parseError);
  }
};
