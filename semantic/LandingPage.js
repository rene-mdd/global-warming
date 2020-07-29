import { Container, Header, Grid, Image, Button } from 'semantic-ui-react'
import * as Scroll from 'react-scroll';

const LandingPage = () => (
  <Container fluid={true}>
      <Container >
          <Header as="h1" textAlign="center" className="h1-id">
          Global Warming live graphs and API
          </Header>
    <Grid  columns="equal">
        <Grid.Row centered={true}>
            <Image src="images/icons8-stocks-64.png" size="tiny"/>
        </Grid.Row>
    </Grid>
     <Header textAlign="center" className="h2-id" >
     Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who

     </Header>
     <Grid centered>
        <Grid.Row centered>
            <Grid.Column width="4" textAlign="center">
            <Scroll.Link spy={true} smooth={true} duration={1000} to="jump-to-temperature" >
                <Button >
                  <Image src="/images/icons-double-down.png" />
                </Button>
              </Scroll.Link>
            </Grid.Column>
            </Grid.Row>
    </Grid>
    
  </Container>
  </Container>
)

export default LandingPage