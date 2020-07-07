const ftp = require("basic-ftp")
// "ftp link:"
// "ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_trend_gl.txt"
export default async (req, res) => {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_trend_gl.txt",
            port: 21,
            secure: true
        })
        console.log(await client.list())
       await client.ensureDir("ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_trend_gl.txt")
      
    }
    catch(err) {
        console.log(err)
    }
    client.close()
   
 
  }
  