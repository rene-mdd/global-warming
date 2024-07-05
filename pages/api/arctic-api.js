// import arcticData from "../../public/data/arctic-extent.json";

export default async function fetchArcticApi(req, res) {
  try {
    const data = await fetch(
      "https://www.ncei.noaa.gov/access/monitoring/snow-and-ice-extent/sea-ice/G/0/data.json"
    );
    const arcticData = await data.json();
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    // caching the response for 12 hours a day 
    res.setHeader('Vercel-CDN-Cache-Control', 'public, max-age=0. s-maxage=43200, stale-while-revalidate=3600');
    res.setHeader('CDN-Cache-Control', 'public, max-age=0, s-maxage=43200, stale-while-revalidate=3600');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=43200, stale-while-revalidate=3600');
    res.status(200).json({ error: null, arcticData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ result: "Data currently unavailable. Try again later. If the problem persists, please inform us at help@global-warming.org", error });
  }
}
