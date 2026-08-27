import { withRequestLogging } from "../../lib/log-request";

const line2Array = (line) => line.split(" ").filter((ele) => ele);

const convertToObject = (valueArray2d) =>
  valueArray2d.map(([time, station, land]) => ({ time, station, land }));

// ---------------------------------------------------------------------------
// 12-hour in-process cache
// ---------------------------------------------------------------------------
// Holds the parsed result in memory for the life of the instance, and is also
// served if a later upstream fetch fails.
const CACHE_TTL_MS = Number(
  process.env.API_CACHE_TTL_MS || 12 * 60 * 60 * 1000,
);
let memo = null; // { payload, at }

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

const handler = async (req, res) => {
  // Fresh copy in memory: no upstream call at all.
  if (memo && Date.now() - memo.at < CACHE_TTL_MS) {
    setStandardHeaders(res);
    res.setHeader("x-api-cache", "memo");
    res.status(200).json(memo.payload);
    return;
  }

  try {
    const response = await fetch(
      "https://data.giss.nasa.gov/gistemp/graphs_v4/graph_data/Monthly_Mean_Global_Surface_Temperature/graph.txt",
      {
        headers: {
          Accept: "text/plain",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      },
    );

    // Rejects a non-OK response instead of parsing its body as data.
    if (!response.ok) {
      throw new Error(`NASA GISTEMP returned ${response.status}`);
    }

    const data = await response.text();
    const lines = data.split("\n");
    // in the _ vars we store the dashed lines
    // eslint-disable-next-line no-unused-vars
    const [note, _, heading, __, ...stats] = lines;

    // map over each line and remove the white space that separates the values
    const dataAs2dArray = stats.map(line2Array).filter((ele) => ele.length);
    const result = convertToObject(dataAs2dArray);

    if (!result.length) {
      throw new Error("NASA GISTEMP returned no parseable rows");
    }

    const payload = { error: null, result };
    memo = { payload, at: Date.now() };

    setStandardHeaders(res);
    res.setHeader("x-api-cache", "miss");
    res.status(200).json(payload);
  } catch (error) {
    console.error(error);

    // Serve the last good data rather than an error, if we hold any.
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

export default withRequestLogging(handler, { handler: "temperature" });
