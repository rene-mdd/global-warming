import { withRequestLogging } from "../../lib/log-request";

const csv = require("csvtojson");

// ---------------------------------------------------------------------------
// 12-hour in-process cache

const CACHE_TTL_MS = Number(
  process.env.API_CACHE_TTL_MS || 12 * 60 * 60 * 1000,
);
let memo = null; // { payload, at }

const SOURCE = "https://gml.noaa.gov/aftp/products/trends/co2/co2_trend_gl.csv";

/** Sets CORS and cache-control headers on the response. */
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

// How long the NOAA request is given to answer before it's aborted.
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

/** Parses the NOAA CSV rows into { year, month, day, cycle, trend } objects. */
const parseCo2 = (csvToJson) => {
  const oldKey =
    "# --------------------------------------------------------------------";
  const parsedCopy = JSON.parse(JSON.stringify(csvToJson));
  const sliced = parsedCopy.slice(60);
  const co2 = [];
  sliced.forEach((obj) => {
    Object.defineProperty(
      obj,
      ["year"],
      Object.getOwnPropertyDescriptor(obj, oldKey),
    );
    // eslint-disable-next-line no-param-reassign
    delete obj[oldKey];

    co2.push({
      year: obj.year,
      month: obj.field2,
      day: obj.field3,
      cycle: obj.field4,
      trend: obj.field5,
    });
  });
  return co2;
};

const handler = async (req, res) => {
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
    const co2 = parseCo2(jsonObj);

    if (!co2.length) {
      throw new Error("NOAA CO2 file parsed to zero rows");
    }

    const payload = { co2 };
    memo = { payload, at: Date.now() };

    setStandardHeaders(res);
    res.setHeader("x-api-cache", "miss");
    res.status(200).json(payload);
  } catch (parseError) {
    serveError(res, parseError);
  }
};

export default withRequestLogging(handler, { handler: "co2" });
