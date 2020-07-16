import Head from 'next/head'
import Link from 'next/link'
import Temperature from '../components/temperature'
import Co2 from '../components/co2'
import Arctic from "../components/arctic"
import Deforestation from "../components/deforestation"
import Countries from '../components/countries'
import Methane from '../components/methane'
import Nitrous from '../components/nitrous'


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="path/to/chartjs/dist/Chart.min.css" />
      </Head>
      <header>
        <ul>
          <Link href="/"><a><li>Home</li></a></Link>
          <Link href="/news"><a><li>News</li></a></Link>
          <Link href="blog"><a><li>Blog</li></a></Link>
          <Link href="organizations"><a><li>Organizations</li></a></Link>
        </ul>
      </header>

      <main>
        <h1 className="title">
          Global warming and environmental degradation
        </h1>
        <section className="home">
          <div>
            <h2>Live global temperature rise</h2>
            <Temperature/>
            <span>This graph represents the worldwide temperature rise, beginning on January 1880. GISTEMP Team, 2020: GISS Surface Temperature Analysis (GISTEMP), version 4. NASA Goddard Institute for Space Studies. Dataset accessed 20YY-MM-DD at https://data.giss.nasa.gov/gistemp/.</span>
            <span>Source data 1880 - present: Lenssen, N., G. Schmidt, J. Hansen, M. Menne, A. Persin, R. Ruedy, and D. Zyss, 2019: Improvements in the GISTEMP uncertainty model. J. Geophys. Res. Atmos., 124, no. 12, 6307-6326, doi:10.1029/2018JD029522.</span>
            <span>Source data year 1 – 1979: <a href="https://cmr.earthdata.nasa.gov/search/concepts/C1215197080-NOAA_NCEI">https://cmr.earthdata.nasa.gov/search/concepts/C1215197080-NOAA_NCEI</a></span>
            <p>The current global warming rate is not natural. From 1880 to 1981 was (0.07°C / 0.13°F). Since 1981 this rate has increased to (0.18°C / 0.32°F) source.
            The past increase temperature seen in the last 2,000 years, correspond to the Roman Warm Period and the Medieval Warm Period. These events were at regional and not global scale. source.
            For more information about prehistoric temperature records, visit: source, source,
            The total average global temperature rise since the industrial revolution is around (1.0 °C / 1.8 °F). Earth northern hemisphere is warming faster. The arctic has warmed between (2 °C / 3.6 °F) and (4 °C / 7.2 °F). Please visit these scientific publications for more details: source source source source source source.
            The earth temperature and the proportion of gases such as Co2, methane, and nitrous oxide in the atmosphere is strictly correlated. For more information about this topic and prehistoric data please visit:  source source source
</p>
          </div>
          <div>
            <h2>Tons of CO2 emission</h2>
            <Co2 />
            <span>This graph represents the CO2 concentration level in the atmosphere, beginning in 1958 when Mauna Loa Observatory officially started measuring.
            Source: Ed Dlugokencky and Pieter Tans, NOAA/GML (www.esrl.noaa.gov/gmd/ccgg/trends/)
</span>
            <p>For thousands of years, the natural concentration of CO2 in earth atmosphere was around 280 ppm. From the beginning of the industrial revolution, human activities like the burning of fossil fuels, deforestation, and livestock have increased this amount by more than 30%.
            For more information about prehistoric CO2 concentration, current and future consequences please visit https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide and https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/
</p>
          </div>
          <div>
            <h2>Methane</h2>
            <Methane />
            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.ttps://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/</span>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
          <div>
            <h2>Nitrous Oxide</h2>
            <Nitrous />
            <span>Credits: Ed Dlugokencky, NOAA/GML (<a href="www.esrl.noaa.gov/gmd/ccgg/trends_n2o">www.esrl.noaa.gov/gmd/ccgg/trends_n2o/</a>)</span>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
          <div>
            <h2>Deforestation</h2>
            <Deforestation/>
            <span>Credits: Hansen, UMD, Google, USGS, NASA</span>
            <p>This data set, a collaboration between the GLAD (Global Land Analysis & Discovery) lab at the University of Maryland, Google, USGS, and NASA, measures areas of tree cover loss across all global land (except Antarctica and other Arctic islands) at approximately 30 × 30 meter resolution. The data were generated using multispectral satellite imagery from the Landsat 5 thematic mapper (TM), the Landsat 7 thematic mapper plus (ETM+), and the Landsat 8 Operational Land Imager (OLI) sensors. Over 1 million satellite images were processed and analyzed, including over 600,000 Landsat 7 images for the 2000-2012 interval, and approximately 400,000 Landsat 5, 7, and 8 images for updates for the 2011-2019 interval. The clear land surface observations in the satellite images were assembled and a supervised learning algorithm was applied to identify per pixel tree cover loss. In this data set, “tree cover” is defined as all vegetation greater than 5 meters in height, and may take the form of natural forests or plantations across a range of canopy densities. Tree cover loss is defined as “stand replacement disturbance,” or the complete removal of tree cover canopy at the Landsat pixel scale. Tree cover loss may be the result of human activities, including forestry practices such as timber harvesting or deforestation (the conversion of natural forest to other land uses), as well as natural causes such as disease or storm damage. Fire is another widespread cause of tree cover loss, and can be either natural or human-induced.<p> This data set has been updated annually since its creation, and now includes loss up to 2019 (Version 1.7). The analysis method has been modified in numerous ways, including new data for the target year, re-processed data for the previous two years (2011 and 2012 for the Version 1.1 update, 2012 and 2013 for the Version 1.2 update), and improved modelling and calibration. These modifications improve change detection for 2011-2014, including better detection of boreal loss due to fire, smallholder rotation agriculture in tropical forests, selective losing, and short cycle plantations. Eventually, a future “Version 2.0” will include reprocessing for 2000-2010 data, but in the meantime integrated use of the original data and Version 1.2 should be performed with caution. Read more about the Version 1.7 update here. When zoomed out, pixels of loss are shaded according to the density of loss at the 30 x 30 meter scale. Pixels with darker shading represent areas with a higher concentration of tree cover loss, whereas pixels with lighter shading indicate a lower concentration of tree cover loss. There is no variation in pixel shading when the data is at full resolution (≥ zoom level 13). The tree cover canopy density of the displayed data varies according to the selection - use the legend on the map to change the minimum tree cover canopy density threshold.</p></p>
          </div>
          <div className="arctic-class">
            <h2>Melted polar ice</h2>
            <Arctic />
            <span> Credit: <a href="https://nsidc.org/">NSIDC/NASA</a></span>
            <p>Arctic sea ice reaches its minimum each September. September Arctic sea ice is now declining at a rate of 12.85 percent per decade, relative to the 1981 to 2010 average. This graph shows the average monthly Arctic sea ice extent each September since 1979, derived from satellite observations. </p>
          </div>
          <div>
            <h2>
              Emissions by country
            </h2>
            <Countries />
            <span>Credits: IEA Atlas of Energy</span>
            <p>
            After three years of stability, global carbon dioxide emissions from fuel combustion restarted growing in 2017, reaching 32.8 billion tons of CO2, and provisional data show they grew even faster in 2018. The major countries and regions responsible for emissions were: China (the People’s Republic of China and Hong Kong, China)  (28%), the United States (14%), the European Union as a whole (10%), India (7%), the Russian Federation (5%), Japan (3%), Korea (2%), Canada (2%), Indonesia (2%) and Iran (2%).
            </p>
            <p>There are several factors which can help explain the overall CO2 emissions level in a country: the size of its population, its energy mix, its GDP etc. In this respect, the detailed CO2 emissions indicators maps on the IEA Energy Atlas are very informative. These maps include total CO2 emissions from fuel combustion, CO2 per GDP,  and per GDP PPP – as well as CO2 per TPES and per population.</p>
            <p>For instance, when looking at the map of CO2 emissions per capita, one can see that countries from the Middle East have the highest  emissions levels, while countries in Africa, using large quantities of fuel wood (considered as non-emitting) show the lowest levels of emissions. Similarly, when looking at the map of emissions per TPES, it will be no surprise to see that countries with large shares of coal and oil in their energy mix have the highest levels of emissions, while countries with a large share of renewables and nuclear show the lowest levels.</p>
          </div>
        </section>

      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
      .embed-container {position: relative; padding-bottom: 80%; height: 0; max-width: 100%;} 
      .embed-container iframe, .embed-container object, .embed-container iframe{position: absolute; top: 0; left: 0; width: 100%; height: 100%;} small{position: absolute; z-index: 40; bottom: 0; margin-bottom: -15px;}
      .display-map {
        display: none
      }
      span a {
        text-decoration: underline;
        color: rgba(30, 139, 195, 1);
            }
      ul {
        display: flex;
      }

      li {
        margin: 0 15px 0 15px;
      }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .home {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }

    

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .logo {
          height: 1em;
        }

      
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
