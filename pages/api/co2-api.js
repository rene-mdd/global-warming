const Client = require("ftp");
const csv = require("csvtojson");

export default async (req, res) => {
  // "ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_trend_gl.txt"
  const connectionConfig = {
    host: "aftp.cmdl.noaa.gov",
    connTimeout: 30000,
    user: "anonymous",
    password: "guest",
    secure: false,
  };

  const { data, error } = await getFTPData(
    connectionConfig,
    "products/trends/co2/co2_trend_gl.csv"
  );

  if (error) {
    res.setHeader("Content-Type", "text/plain");
    res.status(500).send({ result: "Data currently unavailable. Try again later. If the problem persists, please inform us at help@global-warming.org", error });
    res.end("Internal Server Error");
    return;
  }
  csv()
    .fromString(data)
    .then((jsonObj) => {
      parsedData(jsonObj);
    });

  function parsedData(csvToJson) {
    const oldKey =
      "# --------------------------------------------------------------------";
    const co2DataCopy = csvToJson;
    const parsedCopy = JSON.parse(JSON.stringify(co2DataCopy));
    const sliced = parsedCopy.slice(60);
    const co2 = [];
    sliced.forEach((obj) => {
      Object.defineProperty(
        obj,
        ["year"],
        Object.getOwnPropertyDescriptor(obj, oldKey)
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
    // cors config
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    res.statusCode = 200;
    // caching the response for 12 hours a day 
    res.setHeader('Vercel-CDN-Cache-Control', 'public, max-age=0. s-maxage=43200, stale-while-revalidate=3600');
    res.setHeader('CDN-Cache-Control', 'public, max-age=0, s-maxage=43200, stale-while-revalidate=3600');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=43200, stale-while-revalidate=3600');
    res.json({ co2 });
  }
};
const getFTPData = (config, path) => {
  // Creating FTP Client
  const ftp = new Client();

  // Register our events ("read")
  // eslint-disable-next-line no-unused-vars
  const getFile = new Promise((resolve, _) => {
    let data = "";

    ftp.on("ready", () => {
      ftp.get(path, (error, stream) => {
        if (error) {
          resolve({ data: null, error });
        }
        // The file comes as a stream (in pieces) we add each piece to data
        // eslint-disable-next-line no-return-assign
        stream.on("data", (chunk) => (data += chunk.toString()));
        // Then we got all pieces we can resolve the promise
        stream.on("end", () => resolve({ data, error: null }));
      });
    });
  });

  // We need to connect after we registered our events
  ftp.connect(config);

  // we return our promise aka when we got all file pieces
  return getFile;
};
