import axios from "axios";
// import arcticData from "../../public/data/arctic-extent.json";

export default async function fetchArcticApi(req, res) {
  try {
    const { data } = await axios.get(
      "https://www.ncei.noaa.gov/access/monitoring/snow-and-ice-extent/sea-ice/G/0/data.json"
    );
    const arcticData = data;
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    res.setHeader("Cache-Control", "s-maxage=43200");
    res.status(200).json({ error: null, arcticData });
  } catch (error) {
    console.error(error);
  }
}
