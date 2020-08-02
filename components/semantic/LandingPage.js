import { Container, Header, Grid, Image, Button } from 'semantic-ui-react'
import * as Scroll from 'react-scroll'

const LandingPage = () => (
  <Container as='main' fluid={true}>
    <Container>
      <Header as='h1' textAlign='center' className='h1-id'>
        Global Warming live graphs and API
      </Header>
      <Grid columns='equal'>
        <Grid.Row centered={true}>
          <Image src='images/icons8-stocks-64.png' size='tiny' />
        </Grid.Row>
      </Grid>
      <Header textAlign='center' className='h2-id'>
        This site delivers up to date information about earth current
        temperature, and amount of green house gases in the atmosphere.
      </Header>
      <Grid centered>
        <Grid.Row centered>
          <Grid.Column width='4' textAlign='center'>
            <Scroll.Link
              spy={true}
              smooth={true}
              duration={1000}
              to='jump-to-temperature'
            >
              <Button className='icon-style' basic>
                <Image src='/images/icons-double-down.png' />
              </Button>
            </Scroll.Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Container>
)

export default LandingPage
