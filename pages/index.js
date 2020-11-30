import StickyMenu from '../components/semantic/sticky'
import SideMenu from '../components/semantic/sideMenu'
import { Divider } from 'semantic-ui-react'
import LandingPage from '../components/semantic/LandingPage'
import SemanticTemperature from '../components/semantic/semanticTemperature'
import SemanticCo2 from '../components/semantic/semanticCo2'
import SemanticMethane from '../components/semantic/semanticMethane'
import SemanticNitrous from '../components/semantic/semanticNitrous'
import SemanticArctic from '../components/semantic/semanticArctic'
import SiteHeader from '../components/siteHeader'

class Home extends React.Component {
  render () {
    const homeTitle = 'Global Warming'
    const homeMetaDescription =
      "Global warming & climate change up to date APIs, data, graphs, and news. Earth's temperature, carbon dioxide (CO2), methane, nitrous oxide, and melted polar ice cap."
    const homeKeywords = 'Global warming, climate change, API, graphs'
    return (
      <>
        <SiteHeader
          description={homeMetaDescription}
          title={homeTitle}
          keywords={homeKeywords}
        />
        <StickyMenu />
        <SideMenu />
        <LandingPage />
        <Divider name='jump-to-temperature' hidden />
        <SemanticTemperature />
        <Divider name='jump-to-co2' />
        <SemanticCo2 />
        <Divider name='jump-to-methane' />
        <SemanticMethane />
        <Divider name='jump-to-nitrous' />
        <SemanticNitrous />
        <Divider name='jump-to-arctic' />
        <SemanticArctic />
      </>
    )
  }
}

export default Home
