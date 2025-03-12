
export default async (req, res) => {
  try {
    const data = await fetch(
      "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/ocean/12/1/1850-2024.json?trend=true&trend_base=10&begtrendyear=1880&endtrendyear=2024"
    );
    // const lines = data.split("\n");
    const response = await data.json();
    // const responseToJson = response.json();
    const stringifyOceanObj = JSON.stringify(response.data);
    const parseToObject = JSON.parse(stringifyOceanObj);
    console.log(parseToObject)

    // cors config
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
    res
      .status(200)
      .json({ error: null, result: parseToObject, description: data.description });
  } catch (error) {
    res.status(500).send({ result: "Data currently unavailable. Try again later. If the problem persists, please inform us at help@global-warming.org", error });
  }
};
