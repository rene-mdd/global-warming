const ftp = require("basic-ftp")
// "ftp link:"
// "ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_trend_gl.txt"
export default async (req, res) => {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "aftp.cmdl.noaa.gov",
            port: 21,
            user: "anonymous",
            password: "guest",
            secure: false
        })
        console.log(await client.list())
        await client.downloadTo("warming-data.txt", "ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_trend_gl.txt");
    }
    catch(err) {
        console.log(err)
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end("hola")
    client.close()
   
  }
  