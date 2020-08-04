import { Container, Header, Grid, Button } from 'semantic-ui-react'
import Nitrous from '../nitrous'
import { AccordionNitrous, AccordionShare } from '../semantic/accordion'

class SemanticNitrous extends React.Component {
  state = { nitrous: false, nitrousLoading: 'nitrousBtn', siteView: '' }
  toggleNitrous = () => {
    this.setState({ nitrous: !this.state.nitrous })
  }
  handleClickNitrous = isLoading => {
    if (isLoading) {
      this.setState({ nitrousLoading: 'loading' })
    } else {
      this.setState({ nitrousLoading: 'nitrousBtn' })
    }
  }
  handleIntersection = event => {
    console.log(event)
    const intersectingResult = event.isIntersecting
    if (intersectingResult) {
      this.setState({ siteView: 'nitrous' })
    }
  }
  render () {
    return (
      <Container as='section' fluid={true}>
        <Container>
          <Header as='h2' textAlign='center' className='h2-general'>
            Nitrous Oxide levels from 800,000 years ago to present
          </Header>
          <Grid container={true}>
            <Grid.Row centered={true} stretched>
              {this.state.nitrous ? (
                <Nitrous
                  callBackPropNitrous={c => {
                    this.handleClickNitrous(c)
                  }}
                />
              ) : null}
            </Grid.Row>
            <Grid.Row centered={true}>
              <Grid.Column width='eight' textAlign='center'>
                <Button
                  onClick={this.toggleNitrous}
                  className={this.state.nitrousLoading}
                  id={this.state.nitrousLoading}
                >
                  {this.state.nitrous ? 'Hide graph' : 'Display graph'}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns='equal'>
            <Container>
              <p>
                Nitrous oxide is a gas that is produced by the combustion of
                fossil fuel and solid waste, nitrogen-base fertilizers, sewage
                treatment plants, natural processes, and other agricultural and
                industrial activities.</p><p> It is the third largest heat-trapping gas in
                the atmosphere and the biggest ozone-destroying compound
                emitted by human activities.</p> <p>For more detailed information
                please visit: <a href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306630/' target='_blank'>source</a>, <a href='https://www.epa.gov/ghgemissions/overview-greenhouse-gases#nitrous-oxide' target='_blank'>source</a>.
              </p>

              <Grid className='api-segment' columns='equal' centered stackable>
                <Grid.Column>
                  <AccordionNitrous />
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

export default SemanticNitrous
