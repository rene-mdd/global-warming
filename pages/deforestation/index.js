import Head from 'next/head'
import StickyMenu from "../../helpers/sticky"
import * as Scroll from 'react-scroll';

class Deforestation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false }
    this.url = "";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  handleForest = () => {
    this.setState({ toggle: !this.state.toggle })
  }


  render() {
    console.log(this.state.toggle)
    return (<>
     <Head>
        <title>Deforestation</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="path/to/chartjs/dist/Chart.min.css" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Play&display=swap" rel="stylesheet" />
        <meta name="description" content="Global Warming and Climate Change live API, graphs, news, and information." />
      </Head>
         <StickyMenu />
      <div className="ui fluid container" id="landing-page-deforestation">
        <div className="ui container" >
          <h1 className="ui center aligned header" id="h1-news">
          Global Forest Loss
        </h1>
          <div class="ui row">
            <img src="images/icons8-forest-64.png" className='ui tiny image centered ' />
          </div>
          <h2 className='ui center aligned header' id="h2-news">
            This section is meant to gather data about the current worldwide forest situation. This can be done through APIs, databases, news, and journals.
        </h2>
          <div className="ui equal width grid icon-style" >
            <div className="row">
              <div className="ui center aligned column">
                <Scroll.Link spy={true} smooth={true} duration={1000} to="jump-news" >
                  <button class="ui button basic center aligned">
                    <img src="/images/icons-double-down.png" />
                  </button>
                </Scroll.Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui fluid container temperature-background" name="jump-to-temperature">
        <div className="ui container">
      <h2 className='ui center aligned header title-h2'>Global forest loss from 2000 to 2014</h2>
        <div className="ui equal width grid">
      
      <button onClick={this.handleForest}>Use Global Forest Watch map</button>
      {this.state.toggle &&
        <div><iframe width="800"
          height="800"
          frameBorder="0"
          src="https://my.gfw-mapbuilder.org/v1.latest/?appid=e53c3a031fa6479ab09ef9171ee91c03"></iframe></div>
      }
      <div className={this.state.toggle ? "display-map" : null}><iframe width="800" height="800" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" title="Forest loss copy" src="//www.arcgis.com/apps/Embed/index.html?webmap=ed33972acffc4e7c9b260c753f1a6bd4&extent=-157.4447,-41.8564,177.9459,71.6&home=true&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&disable_scroll=false&theme=light"></iframe></div>
      <span>Credits: Hansen, UMD, Google, USGS, NASA</span>
      <p> This data set provides a disaggregation of total forest loss to annual time scales. Encoded as either 0 (no loss) or else a value in the range 1–14, representing loss detected primarily in the year 2001–2014, respectively. This global dataset contain unsigned 8-bit values and have a spatial resolution of 1 arc-second per pixel, or approximately 30 meters per pixel at the equator. Quantification of global forest change has been lacking despite the recognized importance of forest ecosystem services. In this data, Earth observation satellite data were used to map global forest loss (2.3 million square kilometers) and gain (0.8 million square kilometers) from 2000 to 2012 at a spatial resolution of 30 meters. The tropics were the only climate domain to exhibit a trend, with forest loss increasing by 2101 square kilometers per year. Brazil’s well-documented reduction in deforestation was offset by increasing forest loss in Indonesia, Malaysia, Paraguay, Bolivia, Zambia, Angola, and elsewhere. Intensive forestry practiced within subtropical forests resulted in the highest rates of forest change globally. Boreal forest loss due largely to fire and forestry was second to that in the tropics in absolute and proportional terms. These results depict a globally consistent and locally relevant record of forest change. Results from time-series analysis of 654,178 Landsat 7 ETM+ images in characterizing global forest extent and change from 2000 through 2012. For additional information about these results, please see the associated journal article (http://www.sciencemag.org/content/342/6160/850) (Hansen et al., Science 2013). Reference composite imagery are median observations from a set of quality assessed growing season observations in four spectral bands, specifically Landsat bands 3, 4, 5, and 7. Normalized top-of-atmosphere (TOA) reflectance values (ρ) have been scaled to an 8-bit data range using a scale factor (g): DN = ρ • g + 1. The g factor was chosen independently for each band to preserve the band-specific dynamic range: Landsat Band: g, Band 3 (red): 508, Band 4 (NIR): 254, Band 5 (SWIR): 363, and Band 7 (SWIR): 423. </p>
      </div>
      </div>
      </div>
    </>);
  }
}

export default Deforestation;

