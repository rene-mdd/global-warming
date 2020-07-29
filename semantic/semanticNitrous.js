import { Container, Header, Grid, Image, Button, Segment } from 'semantic-ui-react'
import Nitrous from "../components/nitrous"
import { AccordionNitrous, AccordionShare } from "../semantic/accordion"


class SemanticNitrous extends React.Component {
    state = {nitrous: false, nitrousLoading: "nitrousBtn"}

    toggleNitrous = () => {
        this.setState({ nitrous: !this.state.nitrous })
      }

      handleClickNitrous = (isLoading) => {
        if (isLoading) {
          this.setState({ nitrousLoading: "loading" })
        } else {
          this.setState({ nitrousLoading: "nitrousBtn" })
        }
      }

    render(){

 return (

  <Container fluid={true} >
 
      <Container >
          <Header as="h2" textAlign="center" className="h2-general">
          <span className="underline">Nitrous Oxide levels from 800,000 years ago to present</span>
          </Header>
        <Grid container={true}>
        <Grid.Row centered={true} stretched>
           {this.state.nitrous ? <Nitrous callBackPropNitrous={(c) => { this.handleClickNitrous(c)}} /> : null }
        </Grid.Row>
        <Grid.Row centered={true}>
            <Grid.Column width="three" textAlign="center">
    <Button onClick={this.toggleNitrous} className={this.state.nitrousLoading} id={this.state.nitrousLoading}>
        {this.state.nitrous ? "Hide graph" : "Deploy graph"}
    </Button>
            </Grid.Column>
        </Grid.Row>
        </Grid>
   <Grid columns="equal" >
       <Container textAlign="justified">
       <p>Nitrous ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide" target="_blank">source</a> and <a href="https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/" target="_blank">source</a>.
            </p>
            <Grid columns="equal" className="api-segment">
                <Grid.Column><AccordionNitrous /></Grid.Column>
                <Grid.Column><AccordionShare /></Grid.Column>
            </Grid>
       </Container>
   </Grid>
  </Container>
  </Container>
)}}

export default SemanticNitrous;