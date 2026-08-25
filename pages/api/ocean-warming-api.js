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
  // 12 hours. The comma after max-age=0 was a period, which invalidated the
  // s-maxage directive in the header Vercel gives top priority.
  const policy =
    "public, max-age=0, s-maxage=43200, stale-while-revalidate=3600, stale-if-error=86400";
  res.setHeader("Vercel-CDN-Cache-Control", policy);
  res.setHeader("CDN-Cache-Control", policy);
  res.setHeader("Cache-Control", policy);
};

/**
 * The end year used to be hardcoded to 2024, so the series silently stopped
 * growing — by 2026 the "current" ocean figure was two years old. It is now
 * derived from the clock.
 *
 * NOAA may not have published the current year yet, so the caller falls back one
 * year on a non-OK response rather than failing.
 */
const oceanUrl = (endYear) =>
  `https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/ocean/12/1/1850-${endYear}.json` +
  `?trend=true&trend_base=10&begtrendyear=1880&endtrendyear=${endYear}`;

const handler = async (req, res) => {
  if (memo && Date.now() - memo.at < CACHE_TTL_MS) {
    setStandardHeaders(res);
    res.setHeader("x-api-cache", "memo");
    res.status(200).json(memo.payload);
    return;
  }

  try {
    const thisYear = new Date().getUTCFullYear();

    let upstream = await fetch(oceanUrl(thisYear));
    if (!upstream.ok) {
      // Early in a calendar year the current year may not exist upstream yet.
      upstream = await fetch(oceanUrl(thisYear - 1));
    }
    if (!upstream.ok) {
      throw new Error(`NOAA ocean returned ${upstream.status}`);
    }

    const response = await upstream.json();
    if (!response?.data) {
      throw new Error("NOAA ocean returned no data object");
    }

    const payload = {
      error: null,
      result: response.data,
      description: response.description ?? null,
    };
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
};

export default withRequestLogging(handler, { handler: "ocean-warming" });
