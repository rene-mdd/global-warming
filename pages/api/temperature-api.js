import axios from "axios";

const line2Array = (line) => line.split(" ").filter((ele) => ele);

const convertToObject = (valueArray2d) =>
  valueArray2d.map(([time, station, land]) => ({ time, station, land }));

export default async (req, res) => {
  try {
    const data = await fetch(
      "https://data.giss.nasa.gov/gistemp/graphs_v4/graph_data/Monthly_Mean_Global_Surface_Temperature/graph.txt"
    );

    // const lines = data.split("\n");
    // // in the _ vars we store the dashed lines
    // // eslint-disable-next-line no-unused-vars
    // const [note, _, heading, __, ...stats] = lines;

    // // map over each line and remove the white space that separates the values
    // const dataAs2dArray = stats.map(line2Array).filter((ele) => ele.length);

    // const result = convertToObject(dataAs2dArray);
    // // cors config
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    // caching the response for 12 hours day (just max one slow request per day)
    res.setHeader('Vercel-CDN-Cache-Control', 'public, max-age=0. s-maxage=86400, stale-while-revalidate=3600');
    res.setHeader('CDN-Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600');
    res.status(200).json({ error: null, data });

  } catch (error) {
    res.status(500).send({ result: data, error });
  }
};
