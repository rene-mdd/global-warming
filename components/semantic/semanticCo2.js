import { Container, Header, Grid, Button } from 'semantic-ui-react'
import Co2 from '../co2'
import { AccordionCo2, AccordionShare } from '../semantic/accordion'
// import Observer from '@researchgate/react-intersection-observer';
// import SideMenu from '../semantic/sideMenu'

class SemanticCo2 extends React.Component {
  state = { co2: false, co2Loading: 'co2Btn', siteView: '' }
  toggleCo2 = () => {
    this.setState({ co2: !this.state.co2 })
  }
  handleClickCo2 = isLoading => {
    console.log(isLoading)
    if (isLoading) {
      this.setState({ co2Loading: 'loading' })
    } else {
      this.setState({ co2Loading: 'co2Btn' })
    }
  }
  handleIntersection = event => {
    const intersectingCo2Result = event.isIntersecting
    if (intersectingCo2Result) {
      this.setState({ siteView: 'co2' })
    }
  }
  render () {

    return (
      <Container as='section' fluid={true}>
        <Container>
          <Header as='h2' textAlign='center' className='h2-general'>
          
              Carbon Dioxide levels from 800,000 years ago to present
           
          </Header>
          <Grid container={true}>
            <Grid.Row centered={true} stretched>
              {this.state.co2 ? (
                <Co2
                  callBackPropCo2={c => {
                    this.handleClickCo2(c)
                  }}
                />
              ) : null}
            </Grid.Row>
            <Grid.Row centered={true}>
              <Grid.Column width='eight' textAlign='center'>
                <Button
                  onClick={this.toggleCo2}
                  className={this.state.co2Loading}
                  id={this.state.co2Loading}
                >
                  {this.state.co2 ? 'Hide graph' : 'Load graph'}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns='equal'>
            <Container >
              <p>
                For thousands of years, the natural concentration of CO2 in
                earth atmosphere was around 280 ppm. From the beginning of the
                industrial revolution, human activities like the burning of
                fossil fuels, deforestation, and livestock have increased this
                amount by more than 30%.</p><p> For more information about prehistoric
                CO2 concentration, current and future consequences please visit{' '}
                <a
                  href='https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide'
                  target='_blank'
                >
                  Climate Change: Atmospheric Carbon Dioxide
                </a>{' '}
                and{' '}
                <a
                  href='https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/'
                  target='_blank'
                >
                  The relentless rise of carbon dioxide
                </a>
                .</p>
              
              <Grid className='api-segment' columns='equal' centered stackable>
                <Grid.Column>
                  <AccordionCo2 />
                </Grid.Column>
                <Grid.Column>
                  <AccordionShare />
                </Grid.Column>
              </Grid>
            </Container>
          </Grid>
        </Container>
      </Container>
    )
  }
}

export default SemanticCo2
