import axios from "axios";

export default async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/ocean/12/12/1880-2022.json?trend=true&trend_base=10&begtrendyear=1880&endtrendyear=2022"
    );
    // const lines = data.split("\n");
    const stringifyOceanObj = JSON.stringify(data.data);
    const parseToObject = JSON.parse(stringifyOceanObj);
 
    // cors config
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    // caching the response for one day (just max one slow request per day)
    res.setHeader("Cache-Control", "s-maxage=43200");
    res
      .status(200)
      .json({ error: null, result: parseToObject, description: data.description });
  } catch (error) {
    res.status(500).send({ result: null, error });
  }
};
