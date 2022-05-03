import { Container, Header, Grid, Image, Button } from "semantic-ui-react";
import * as Scroll from "react-scroll";

const LandingPage = () => (
  <Container as="main" fluid className="landing-background">
    <Container className="home-text-container">
      <Header as="h1" textAlign="center" className="h1-class">
        Global Warming live graphs and API
      </Header>
      <Grid columns="equal">
        <Grid.Row centered>
          <Image src="images/icons8-stocks-64.png" size="tiny" />
        </Grid.Row>
      </Grid>
      <Header textAlign="center" className="h2-id">
        This site delivers up to date information and APIs about the
        earth&quot;s current temperature, the concentration of greenhouse gases
        in the atmosphere, and worldwide news about global warming and
        deforestation.
      </Header>
      <Grid centered>
        <Grid.Row centered>
          <Scroll.Link spy smooth duration={1000} to="jump-to-temperature">
            <Button className="icon-style" basic>
              <Image src="/images/icons-double-down.png" />
            </Button>
          </Scroll.Link>
        </Grid.Row>
      </Grid>
    </Container>
  </Container>
);

export default LandingPage;
