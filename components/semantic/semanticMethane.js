import { Container, Header, Grid, Button } from "semantic-ui-react";
import Methane from "../methane";
import { AccordionMethane, AccordionShare } from "../semantic/accordion";

class SemanticMethane extends React.Component {
  state = { methane: false, methaneLoading: "methaneBtn", siteView: "" };
  toggleMethane = () => {
    this.setState({ methane: !this.state.methane });
  };
  handleClickMethane = (isLoading) => {
    if (isLoading) {
      this.setState({ methaneLoading: "loading" });
    } else {
      this.setState({ methaneLoading: "methaneBtn" });
    }
  };
  handleIntersection = (event) => {
    const intersectingCo2Result = event.isIntersecting;
    if (intersectingCo2Result) {
      this.setState({ siteView: "methane" });
    }
  };
  render() {
    return (
      <Container as="section" fluid={true}>
        <Container>
          <Header as="h2" textAlign="center" className="h2-general">
            Methane levels from 800,000 years ago to present
          </Header>
          <Grid container={true}>
            <Grid.Row centered={true} stretched>
              {this.state.methane ? (
                <Methane
                  callBackPropMethane={(c) => {
                    this.handleClickMethane(c);
                  }}
                />
              ) : null}
            </Grid.Row>
            <Grid.Row centered={true}>
              <Grid.Column width="eight" textAlign="center">
                <Button
                  onClick={this.toggleMethane}
                  className={this.state.methaneLoading}
                  id={this.state.methaneLoading}
                >
                  {this.state.methane ? "Hide graph" : "Load graph"}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns="equal">
            <Container>
              <p>
                Methane is a flammable gas formed by geological and biological
                processes. Some of the natural ones are leaks from natural gas
                systems and wetlands.
                <br /> 50-65% of total global methane emissions come from human
                activities. These include livestock, agriculture, energy and
                industry, waste from homes and businesses.
              </p>
              <p>
                Methane is a gas with a global warming potential several times
                stronger than of CO2. For more than 650,000 years, methane
                concentration in the atmosphere was between 350 – 800 ppb. From
                the beginning of the industrial revolution, human activities
                have increased this amount by around 150%.
              </p>
              <p>
                For more information about the methane situation please visit:{" "}
                <a href="https://www.epa.gov/ghgemissions/overview-greenhouse-gases#methane">
                  EPA: Methane Emissions
                </a>{" "}
                and{" "}
                <a href="https://earthobservatory.nasa.gov/images/146978/methane-emissions-continue-to-rise">
                  NASA: Methane Emissions Continue to Rise
                </a>
                .
              </p>
              <p>
                For more information about the prehistoric methane
                concentration, please visit:
                <a href="https://www.nature.com/articles/nature06950">
                  {" "}
                  Orbital and millennial-scale features of atmospheric CH4 over
                  the past 800,000 years
                </a>
              </p>

              <Grid className="api-segment" columns="equal" centered stackable>
                <Grid.Column>
                  <AccordionMethane />
                </Grid.Column>
                <Grid.Column>
                  <AccordionShare />
                </Grid.Column>
              </Grid>
            </Container>
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default SemanticMethane;
