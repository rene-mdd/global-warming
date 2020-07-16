const Client = require("ftp");
const csv=require('csvtojson')

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
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error");
    return;
  }
  csv()
  .fromString(data)
  .then((jsonObj) => {
    parsedData(jsonObj)
  })

  function parsedData(csvToJson) {
    const oldKey = "# --------------------------------------------------------------------";
    let co2DataCopy = csvToJson;
    let parsedCopy = JSON.parse(JSON.stringify(co2DataCopy));
    let sliced = parsedCopy.slice(60);
    console.log(sliced);
    const date = [];
    const co2 = [];
   
    sliced.forEach((obj) => {
      if (oldKey !== "year") {
        Object.defineProperty(obj, ["year"],
            Object.getOwnPropertyDescriptor(obj, oldKey));
        delete obj[oldKey];
        
    }
     date.push(`${obj.year}.${obj.field2}.${obj.field3}`);
     co2.push(parseFloat(obj.field4))
    })

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=86400");
    res.json({date: date, trend: co2});
    return;
}
}
const getFTPData = (config, path) => {
  // Creating FTP Client
  const ftp = new Client();

  // Register our events ("read")
  const getFile = new Promise((resolve, _) => {
    let data = "";

    ftp.on("ready", function () {
      ftp.get(path, (error, stream) => {
        if (error) {
          resolve({ data: null, error: error });
        }
        // The file comes as a stream (in pieces) we add each piece to data
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