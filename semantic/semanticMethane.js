import { Container, Header, Grid, Image, Button, Segment } from 'semantic-ui-react'
import Methane from "../components/methane"
import {AccordionMethane,  AccordionShare } from "../semantic/accordion"

class SemanticMethane extends React.Component {
    state = {methane: false, methaneLoading: "methaneBtn", siteView: ''}

    toggleMethane = () => {
        this.setState({ methane: !this.state.methane })
      }

      handleClickMethane = (isLoading) => {
    if (isLoading) {
      this.setState({ methaneLoading: "loading" })
    } else {
      this.setState({ methaneLoading: "methaneBtn" })
    }
  }

  handleIntersection = (event) => {
    console.log(event)
    const intersectingCo2Result = event.isIntersecting
    if(intersectingCo2Result) {
        this.setState({siteView: "methane"})
        
      } 
     
  }

    render(){
 return (
  <Container fluid={true} >
      <Container >
          <Header as="h2" textAlign="center" className="h2-general" >
          <span className="underline">Methane levels from 800,000 years ago to present</span>
          </Header>
        <Grid container={true}>
        <Grid.Row centered={true} stretched>
           {this.state.methane ? <Methane callBackPropMethane={(c) => { this.handleClickMethane(c)}} /> : null }
        </Grid.Row>
        <Grid.Row centered={true}>
            <Grid.Column width="three" textAlign="center">
    <Button onClick={this.toggleMethane} className={this.state.methaneLoading} id={this.state.methaneLoading}>
        {this.state.methane ? "Hide graph" : "Deploy graph"}
    </Button>
            </Grid.Column>
        </Grid.Row>
        </Grid>
   <Grid columns="equal" >
       <Container textAlign="justified">
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide" target="_blank">source</a> and <a href="https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/" target="_blank">source</a>.
            </p>
            <Grid columns="equal" className="api-segment">
                <Grid.Column><AccordionMethane /></Grid.Column>
                <Grid.Column><AccordionShare /></Grid.Column>
            </Grid>
       </Container>
   </Grid>
    
  </Container>
  </Container>
)}}

export default SemanticMethane