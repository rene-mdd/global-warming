import React from "react";
import { Container, Header, Grid, Button } from "semantic-ui-react";
import Co2 from "../co2";
import { AccordionCo2, AccordionShare } from "./accordion";

class SemanticCo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { co2: false, co2Loading: "co2Btn" };
  }

  toggleCo2 = () => {
    this.setState((prevState) => ({ co2: !prevState.co2 }));
  };

  handleClickCo2 = (isLoading) => {
    if (isLoading) {
      this.setState({ co2Loading: "loading" });
    } else {
      this.setState({ co2Loading: "co2Btn" });
    }
  };

  render() {
    const { co2, co2Loading } = this.state;
    return (
      <Container as="section" fluid>
        <Container>
          <Header as="h2" textAlign="center" className="h2-general">
            Carbon Dioxide levels from 800,000 years ago to present
          </Header>
          <Grid container>
            <Grid.Row centered stretched>
              {co2 ? (
                <Co2
                  loadingCo2Callback={(isLoading) => {
                    this.handleClickCo2(isLoading);
                  }}
                />
              ) : null}
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width="eight" textAlign="center">
                <Button
                  onClick={this.toggleCo2}
                  className={co2Loading}
                  id={co2Loading}
                >
                  {co2 ? "Hide graph" : "Load graph"}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns="equal">
            <Container>
              <p>
                For thousands of years, the natural concentration of CO2 in
                earth atmosphere was around 280 ppm. From the beginning of the
                industrial revolution, human activities like the burning of
                fossil fuels, deforestation, and livestock have increased this
                amount by more than 30%.
              </p>
              <p>
                For more information about prehistoric CO2 concentration,
                current and future consequences please visit
                <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide">
                  <em> Climate Change: Atmospheric Carbon Dioxide</em>
                </a>
                <em> and</em>
                <a href="https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/">
                  <em> The relentless rise of carbon dioxide</em>
                </a>
                .
              </p>

              <Grid className="api-segment" columns="equal" centered stackable>
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
    );
  }
}

export default SemanticCo2;
