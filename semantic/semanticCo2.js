import { Container, Header, Grid, Image, Button, Segment } from 'semantic-ui-react'
import Co2 from "../components/co2"


class SemanticCo2 extends React.Component {
    state = {co2: false, co2Loading: "co2Btn"}

    toggleCo2 = () => {
        this.setState({ co2: !this.state.co2 })
      }

      handleClickCo2 = (isLoading) => {
   
        if (isLoading) {
          this.setState({ co2Loading: "loading" })
        } else {
          this.setState({ co2Loading: "co2Btn" })
        }
      }    

    render(){
 return (

  <Container fluid={true} >
 
      <Container >
          <Header as="h2" textAlign="center" >

          <span className="underline"> Carbon Dioxide levels from 800,000 years ago to present</span>
          </Header>
        <Grid container={true}>
        <Grid.Row centered={true} stretched>
           {this.state.co2 ? <Co2 callBackPropCo2={(c) => { this.handleClickCo2(c)}} /> : null }
        </Grid.Row>
        <Grid.Row centered={true}>
            <Grid.Column width="three" textAlign="center">
    <Button onClick={this.toggleCo2} className={this.state.co2Loading} id={this.state.co2Loading}>
        {this.state.co2 ? "Hide graph" : "Deploy graph"}
    </Button>
            </Grid.Column>
        </Grid.Row>
        </Grid>
   <Grid columns="equal" >
       <Container textAlign="justified">
       <p>For thousands of years, the natural concentration of CO2 in earth atmosphere was around 280 ppm. From the beginning of the industrial revolution, human activities like the burning of fossil fuels, deforestation, and livestock have increased this amount by more than 30%.
      For more information about prehistoric CO2 concentration, current and future consequences please visit <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide" target="_blank">source</a> and <a href="https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/" target="_blank">source</a>.</p>
            <Grid columns="equal" className="api-segment">
                <Grid.Column><Segment>accordion</Segment></Grid.Column>
                <Grid.Column><Segment>accordion</Segment></Grid.Column>
            </Grid>
       </Container>
   </Grid>
    
  </Container>
  </Container>
)}}

export default SemanticCo2