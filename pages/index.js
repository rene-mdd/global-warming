import Head from 'next/head'
import Link from 'next/link'
import Temperature from '../components/temperature'
import Co2 from '../components/co2'
import Arctic from "../components/arctic"
import Methane from '../components/methane'
import Nitrous from '../components/nitrous'
import * as Scroll from 'react-scroll';
import {AccordionTem, AccordionCo2, AccordionMethane, AccordionNitrous, AccordionArctic, AccordionShare } from "../semantic/accordion"
import StickyMenu from "../semantic/sticky"
import SideMenu from "../semantic/sideMenu"
import { Divider } from 'semantic-ui-react'
import LandingPage from "../semantic/LandingPage"
import SemanticTemperature from "../semantic/semanticTemperature"
import SemanticCo2 from '../semantic/semanticCo2'
import SemanticMethane from '../semantic/semanticMethane'
import SemanticNitrous from "../semantic/semanticNitrous"
import SemanticArctic from '../semantic/semanticArctic'


class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      co2: false,
      methane: false,
      nitrous: false,
      arctic: false,
      co2View: false,
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

 
 
  render() {
    console.log(process.env.VERCEL_URL)
    console.log(process.env)
    return (<>
        
       
      <Head>
      <title>Global Warming</title>  
      {/* <html prefix="og: https://ogp.me/ns#"></html> */}
      <meta property="og:url" content={"https://global-warming-azure.vercel.app/api/chart-img/tempChart.jpeg"} />
      <meta property="og:title" content={"global Warming data"} />
      <meta property="og:description" content={"this site contains data about gw"} />
      <meta property="og:image" content={`api/chart-img/tempChart.jpeg`} />
      <meta property="og:image:width" content="200px" />
      <meta property="og:image:height" content="200px" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="description" content="Global Warming and Climate Change live API, data, graphs, and news." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="path/to/chartjs/dist/Chart.min.css" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Play&display=swap" rel="stylesheet" />
      </Head>
      
      
      <StickyMenu/>
      <SideMenu />
      <LandingPage />
     <Divider name="jump-to-temperature"/>
      <SemanticTemperature />
      <Divider />
      <SemanticCo2 />
      <Divider />
      <SemanticMethane />
      <Divider />
      <SemanticNitrous />
      <Divider />
      <SemanticArctic />
     
    </>
    )
  }
}



export default Home;