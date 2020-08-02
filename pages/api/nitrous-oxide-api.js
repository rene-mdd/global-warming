const Client = require('ftp')
const csv = require('csvtojson')
// `ftp://aftp.cmdl.noaa.gov/products/trends/n2o/n2o_mm_gl.txt`

export default async (req, res) => {
  const connectionConfig = {
    host: 'aftp.cmdl.noaa.gov',
    connTimeout: 30000,
    user: 'anonymous',
    password: 'guest',
    secure: false
  }

  const { data, error } = await getFTPData(
    connectionConfig,
    'products/trends/n2o/n2o_mm_gl.txt'
  )

  if (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    res.end('Internal Server Error')
    return
  }

  csv()
    .fromString(data)
    .then(jsonObj => {
      parsedNitrousData(jsonObj)
    })

  function parsedNitrousData (csvToJson) {
    const oldKey =
      '# --------------------------------------------------------------------'
    const sliced = csvToJson.slice(62)
    const nitrous = []
    sliced.forEach(obj => {
      if (oldKey !== 'year') {
        Object.defineProperty(
          obj,
          ['year'],
          Object.getOwnPropertyDescriptor(obj, oldKey)
        )
        delete obj[oldKey]
      }
      nitrous.push({
        date: `${obj.year.split(' ').filter(f => f)[0]}.${
          obj.year.split(' ').filter(f => f)[1]
        }`,
        average: obj.year.split(' ').filter(f => f)[3],
        trend: obj.year.split(' ').filter(f => f)[5],
        averageUnc: obj.year.split(' ').filter(f => f)[4],
        trendUnc: obj.year.split(' ').filter(f => f)[6]
      })
    })

    res.statusCode = 200
    res.setHeader('Cache-Control', 's-maxage=43200')
    res.json({ nitrous })
    return
  }
}

const getFTPData = (config, path) => {
  // Creating FTP Client
  const ftp = new Client()

  // Register our events ("read")
  const getFile = new Promise((resolve, _) => {
    let data = ''

    ftp.on('ready', function () {
      ftp.get(path, (error, stream) => {
        if (error) {
          resolve({ data: null, error: error })
        }
        // The file comes as a stream (in pieces) we add each piece to data
        stream.on('data', chunk => (data += chunk.toString()))
        // Then we got all pieces we can resolve the promise
        stream.on('end', () => resolve({ data, error: null }))
      })
    })
  })

  // We need to connect after we registered our events
  ftp.connect(config)

  // we return our promise aka when we got all file pieces
  return getFile
}
