import { Container, Header, Grid, Image, Button, Segment } from 'semantic-ui-react'
import Arctic from "../components/arctic"
import { AccordionArctic, AccordionShare } from "../semantic/accordion"



class SemanticArctic extends React.Component {
    state = {arctic: false, arcticLoading: "arcticBtn", siteView: ''}

    toggleArctic = () => {
        this.setState({ arctic: !this.state.arctic })
      }

      handleClickArctic = (isLoading) => {
        if (isLoading) {
          this.setState({ arcticLoading: "loading" })
        } else {
          this.setState({ arcticLoading: "arcticBtn" })
        }
      }

      handleIntersection = (event) => {
        console.log(event)
        const intersectingCo2Result = event.isIntersecting
        if(intersectingCo2Result) {
            this.setState({siteView: "arctic"})
          } 
      }

    render(){

   

 return (

  <Container fluid={true} >

      <Container >
          <Header as="h2" textAlign="center" className="h2-general" >
          <span className="underline">Melted Polar Ice Cap</span>
          </Header>
        <Grid container={true}>
        <Grid.Row centered={true} stretched>
           {this.state.arctic ? <Arctic callBackPropArctic={(c) => { this.handleClickArctic(c)}} /> : null }
        </Grid.Row>
        <Grid.Row centered={true}>
            <Grid.Column width="three" textAlign="center">
    <Button onClick={this.toggleArctic} className={this.state.arcticLoading} id={this.state.arcticLoading}>
        {this.state.arctic ? "Hide graph" : "Deploy graph"}
    </Button>
            </Grid.Column>
        </Grid.Row>
        </Grid>
   <Grid columns="equal" >
       <Container textAlign="justified"  id="scrolling-container">
       
       <p>Nitrous ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide" target="_blank">source</a> and <a href="https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/" target="_blank">source</a>.
            </p>
           
            <Grid columns="equal" className="api-segment">
                <Grid.Column><AccordionArctic /></Grid.Column>
                <Grid.Column><AccordionShare /></Grid.Column>
            </Grid>
       </Container>
   </Grid>
  </Container>
  </Container>
)}}

export default SemanticArctic;