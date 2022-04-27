import axios from "axios";

const line2Array = (line) => line.split(" ").filter((ele) => ele);
export default async function fetchArcticApi(req, res) {
  function cleanFunc(clean) {
    const target = [];
    for (let i = 0; i < clean.length; i += 1) {
      const year = clean[i][0].slice(0, 4);
      const extent = parseFloat(clean[i][2].slice(2, 6));
      const area = parseFloat(clean[i][2].slice(6, 12));
      target[i] = {
        year,
        extent,
        area,
      };
    }
    return target;
  }
  try {
    const { data } = await axios.get(
      "https://climate.nasa.gov/system/internal_resources/details/original/2485_Sept_Arctic_extent_1979-2021.xlsx"
    );
    console.log(data)
    const lines = data.split("\n");
    // in the _ vars we store the dashed lines
    // eslint-disable-next-line no-unused-vars
    const [heading, ...stats] = lines;
    const dataAs2dArray = stats.map(line2Array);
    const result = cleanFunc(dataAs2dArray);
    // cors config
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    res.setHeader("Cache-Control", "s-maxage=43200");
    res.status(200).json({ error: null, result });
  } catch (error) {
    console.error(error);
  }
}
