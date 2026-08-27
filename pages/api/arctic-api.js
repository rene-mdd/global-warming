import { withRequestLogging } from "../../lib/log-request";

// ---------------------------------------------------------------------------
// 12-hour in-process cache — see the note in temperature-api.js
// ---------------------------------------------------------------------------
const CACHE_TTL_MS = Number(
  process.env.API_CACHE_TTL_MS || 12 * 60 * 60 * 1000,
);
let memo = null; // { payload, at }

const setStandardHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );
  // CDN cache lifetime: 12 hours.
  const policy =
    "public, max-age=0, s-maxage=43200, stale-while-revalidate=3600, stale-if-error=86400";
  res.setHeader("Vercel-CDN-Cache-Control", policy);
  res.setHeader("CDN-Cache-Control", policy);
  res.setHeader("Cache-Control", policy);
};

async function fetchArcticApi(req, res) {
  if (memo && Date.now() - memo.at < CACHE_TTL_MS) {
    setStandardHeaders(res);
    res.setHeader("x-api-cache", "memo");
    res.status(200).json(memo.payload);
    return;
  }

  try {
    const data = await fetch(
      "https://www.ncei.noaa.gov/access/monitoring/snow-and-ice-extent/sea-ice/G/0/data.json",
    );

    // Rejects a non-OK response instead of caching it as data.
    if (!data.ok) {
      throw new Error(`NOAA sea ice returned ${data.status}`);
    }

    const arcticData = await data.json();
    if (!arcticData?.data) {
      throw new Error("NOAA sea ice returned no data object");
    }

    const payload = { error: null, arcticData };
    memo = { payload, at: Date.now() };

    setStandardHeaders(res);
    res.setHeader("x-api-cache", "miss");
    res.status(200).json(payload);
  } catch (error) {
    console.error(error);

    if (memo) {
      setStandardHeaders(res);
      res.setHeader("x-api-cache", "memo-stale");
      res.status(200).json(memo.payload);
      return;
    }

    res.status(500).send({
      result:
        "Data currently unavailable. Try again later. If the problem persists, please inform us at help@global-warming.org",
      error,
    });
  }
}

export default withRequestLogging(fetchArcticApi, { handler: "arctic" });
