import Head from 'next/head'
import Link from 'next/link'
import Temperature from '../components/temperature'
import Co2 from '../components/co2'
import Arctic from "../components/arctic"
import Deforestation from "../components/deforestation"
import Countries from '../components/countries'
import Methane from '../components/methane'
import Nitrous from '../components/nitrous'
import * as Scroll from 'react-scroll';
import {AccordionTem, AccordionCo2, AccordionMethane, AccordionNitrous, AccordionArctic } from "../helpers/accordion"
import StickyMenu from "../helpers/sticky"
import SideMenu from "../helpers/vertical-menu"
// import Observer from '@researchgate/react-intersection-observer';


class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      co2: false,
      methane: false,
      nitrous: false,
      arctic: false,
      co2View: false,
      tempView: false,
      ready: '',
      co2Loading: "co2Btn",
      methaneLoading: "methaneBtn",
      nitrousLoading: "nitrousBtn",
      arcticLoading: "arcticBtn"
    };
  }

  toggleCo2 = () => {
    this.setState({ co2: !this.state.co2 })
  }

  toggleMethane = () => {
    this.setState({ methane: !this.state.methane })
  }
  toggleNitrous = () => {
    this.setState({ nitrous: !this.state.nitrous })
  }

  toggleArctic = () => {
    this.setState({ arctic: !this.state.arctic })
  }

  handleClickCo2 = (isLoading) => {
   
    if (isLoading) {
      this.setState({ co2Loading: "loading" })
    } else {
      this.setState({ co2Loading: "co2Btn" })
    }
  }

  handleClickMethane = (isLoading) => {
    if (isLoading) {
      this.setState({ methaneLoading: "loading" })
    } else {
      this.setState({ methaneLoading: "methaneBtn" })
    }
  }

  handleClickNitrous = (isLoading) => {
    
    if (isLoading) {
      this.setState({ nitrousLoading: "loading" })
    } else {
      this.setState({ nitrousLoading: "nitrousBtn" })
    }
  }

  handleClickArctic = (isLoading) => {
    if (isLoading) {
      this.setState({ arcticLoading: "loading" })
    } else {
      this.setState({ arcticLoading: "arcticBtn" })
    }
  }

  // handleIntersection = (event) => {
  //   const viewPort = event.isIntersecting;
  //   this.setState({tempView: viewPort})
  // }

 
  render() {
    // const options = {
    //   onChange: this.handleIntersection,
    //   root: '#scrolling-container',
    //   rootMargin: '0% 0% -25%',
    // };

    console.log(this.state.ready)
    return (<>
      <Head>
        <title>Global Warming</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="path/to/chartjs/dist/Chart.min.css" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Play&display=swap" rel="stylesheet" />
        <meta name="description" content="Global Warming and Climate Change live API, graphs, news, and information." />
      </Head>
     
      <StickyMenu/>

      <SideMenu />

      <div className="ui fluid container landing-page">
        <div className="ui container">
          <h1 className="ui center aligned header" id="h1-id">
            Global Warming live graphs and API
        </h1>
        <div className="ui row">
            <img src="images/icons8-stocks-64.png" className='ui tiny image centered ' />
          </div>
          <h2 className='ui center aligned header' id="h2-id">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who
        </h2>
          <div className="ui equal width grid icon-style">
            <div className="row" >
              <div className="ui center aligned column">
                <Scroll.Link spy={true} smooth={true} duration={1000} to="jump-to-temperature" >
                  <button className="ui button basic center aligned">
                    <img src="/images/icons-double-down.png" />
                  </button>
                </Scroll.Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      
        {/* <Observer {...options}> */}
      <div className="ui fluid container temperature-background" name="jump-to-temperature">
        <div className="ui container">
      <h2 className='ui center aligned header title-h2'>Global temperature anomalies from year 1 to present</h2>
        <div className="ui equal width grid">
      
          <Temperature />
         
        <div className="ui equal width grid" style={{ marginTop: "7vh" }} >
          <div className="ui justify container column" >
            <p>The current global warming rate is not natural. From 1880 to 1981 was (0.07°C / 0.13°F) per decade. Since 1981 this rate has increased to (0.18°C / 0.32°F) <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature" target="_blank">source</a>.
        Some of the past sudden increase on global temperature, correspond to the Roman Warm Period and the Medieval Warm Period. These events were at regional and not global scale. <a href="https://www.ipcc.ch/report/ar4/wg1/" target="_blank">source</a>.
        For more information about prehistoric temperature records please visit: <a href="https://www.ipcc.ch/site/assets/uploads/2018/02/WG1AR5_Chapter05_FINAL.pdf" target="_blank">source</a>,<a href="https://earthobservatory.nasa.gov/features/GlobalWarming/page3.php" target="_blank">source</a>.
        The total average global temperature rise since the industrial revolution is around (1.0 °C / 1.8 °F). Earth northern hemisphere is warming faster. The arctic has warmed between (2 °C / 3.6 °F) and (4 °C / 7.2 °F). Please visit these scientific publications for more details: <a href="https://www.igsoc.org/annals/46/a46a005.pdf" target="_blank">source</a>, <a href="https://web.archive.org/web/20130628144322/http:/www.acia.uaf.edu/pages/scientific.html" target="_blank">source</a>,<a href="https://www.climatecentral.org/news/in-global-warming-northern-hemisphere-is-outpacing-the-south-15850#:~:text=Berkeley%20and%20the%20University%20of,and%20oceans%20warm%20relatively%20slowly." target="_blank">source</a>, <a href="https://iopscience.iop.org/article/10.1088/1748-9326/aafc1b/pdf" target="_blank">source</a>,<a href="https://nsidc.org/cryosphere/arctic-meteorology/climate_change.html" target="_blank">source</a>,  <a href="https://www.nature.com/articles/s41467-019-09622-y" target="_blank">source</a>.
        Earth temperature and the proportion of gases such as Co2, methane, and nitrous oxide in the atmosphere is strictly correlated. For more information about this topic and prehistoric data please visit: <a href="https://www.nature.com/articles/srep21691" target="_blank">source</a>, <a href="https://environmentcounts.org/ec-perspective-accounting-for-800000-years-of-climate-change/" target="_blank">source</a>, <a href="https://earthobservatory.nasa.gov/features/GlobalWarming/page3.php" target="_blank">source</a>.
            </p>
            <div className="ui equal width grid api-segment">
              <div className="column"><AccordionTem/></div>
              <div className="ui column segment">Share</div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      {/* </Observer> */}

      <div className="ui fluid container" >
        <div className="ui container">
        <h2 className="ui center aligned container title-h2" >Carbon Dioxide levels from 800,000 years ago to present</h2>
        <div className="ui equal width grid">
         
          {this.state.co2 ? <Co2 callBackPropCo2={(c) => { this.handleClickCo2(c) }}/> : null}
          <div className="ui row">
            <div className="ui center aligned column"><button onClick={this.toggleCo2} className={`ui basic ${this.state.co2Loading} button`} 
            id={this.state.co2Loading}>{this.state.co2 ? "Hide graph" : "Deploy graph"}</button></div>
          </div>
        </div>
      
            <div className="ui equal width grid" style={{ marginTop: "7vh" }} >
          <div className="ui justify container" >
        <p>For thousands of years, the natural concentration of CO2 in earth atmosphere was around 280 ppm. From the beginning of the industrial revolution, human activities like the burning of fossil fuels, deforestation, and livestock have increased this amount by more than 30%.
      For more information about prehistoric CO2 concentration, current and future consequences please visit <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide" target="_blank">source</a> and <a href="https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/" target="_blank">source</a>.
            </p>
        <div className="ui equal width grid api-segment">
          <div className="column"><AccordionCo2 /></div>
          <div className="column"><div className="ui segment">Share</div></div>
        </div>
      </div>
      </div>
      </div>
      </div>

      <div className="ui fluid container methane-background" >
        <div className="ui container">
        <h2 className="ui center aligned container title-h2" >Methane levels from 800,000 years ago to present</h2>
        <div className="ui equal width grid">
         
          {this.state.methane ? <Methane callBackPropMethane={(m) => { this.handleClickMethane(m) }}/> : null}
          <div className="ui row">
            <div className="ui center aligned column"><button onClick={this.toggleMethane} className={`ui basic ${this.state.methaneLoading
            } button`} id={this.state.methaneLoading}>{this.state.methane ? "Hide graph" : "Deploy graph"}</button></div>
          </div>
        </div>
            <div className="ui equal width grid" style={{ marginTop: "7vh" }} >
          <div className="ui justify container" >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide" target="_blank">source</a> and <a href="https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/" target="_blank">source</a>.
            </p>
        <div className="ui equal width grid api-segment">
          <div className="column"><AccordionMethane /></div>
          <div className="column"><div className="ui segment">Share</div></div>
        </div>
      </div>
      </div>
      </div>
      </div>  


      <div className="ui fluid container" >
        <div className="ui container">
        <h2 className="ui center aligned container title-h2" >Nitrous Oxide levels from 800,000 years ago to present</h2>
        <div className="ui equal width grid">
       
          {this.state.nitrous ? <Nitrous callBackPropNitrous={(n) => { this.handleClickNitrous(n) }}/> : null}
          <div className="ui row">
            <div className="ui center aligned column"><button onClick={this.toggleNitrous} className={`ui basic ${this.state.nitrousLoading} button`} id={this.state.nitrousLoading}>{this.state.nitrous ? "Hide graph" : "Deploy graph"}</button></div>
          </div>
        </div>
            <div className="ui equal width grid" style={{ marginTop: "7vh" }} >
          <div className="ui justify container" >
        <p>Nitrous ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide" target="_blank">source</a> and <a href="https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/" target="_blank">source</a>.
            </p>
        <div className="ui equal width grid api-segment">
          <div className="column"><AccordionNitrous /></div>
          <div className="column"><div className="ui segment">Share</div></div>
        </div>
      </div>
      </div>
      </div>
      </div>  
      
      <div className="ui divider" />

      <div className="ui fluid container" >
        <div className="ui container">
        <h2 className="ui center aligned container title-h2" >Melted Polar Ice Cap</h2>
        <div className="ui equal width grid">
          {this.state.arctic ? <Arctic callBackPropArctic={(a) => { this.handleClickArctic(a) }}/> : null}
          <div className="ui row">
            <div className="ui center aligned column"><button onClick={this.toggleArctic} className={`ui basic ${this.state.arcticLoading} button`} id={this.state.arcticLoading}>{this.state.arctic ? "Hide graph" : "Deploy graph"}</button></div>
          </div>
        </div>
            <div className="ui equal width grid" style={{ marginTop: "7vh" }} >
          <div className="ui justify container" >
        <p>Nitrous ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide" target="_blank">source</a> and <a href="https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/" target="_blank">source</a>.
            </p>
        <div className="ui equal width grid api-segment">
          <div className="column"><AccordionArctic /></div>
          <div className="column"><div className="ui segment">Share</div></div>
        </div>
      </div>
      </div>
      </div>
      </div>  
      
      <div>
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
      </div>
    </>
    )
  }
}
export default Home;