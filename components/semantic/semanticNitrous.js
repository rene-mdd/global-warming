import React from "react";
import { Container, Header, Grid, Button } from "semantic-ui-react";
import Nitrous from "../nitrous";
import { AccordionNitrous, AccordionShare } from "./accordion";

class SemanticNitrous extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nitrous: false, nitrousLoading: "nitrousBtn" };
  }

  toggleNitrous = () => {
    this.setState((prevState) => ({ nitrous: !prevState.nitrous }));
  };

  handleClickNitrous = (isLoading) => {
    if (isLoading) {
      this.setState({ nitrousLoading: "loading" });
    } else {
      this.setState({ nitrousLoading: "nitrousBtn" });
    }
  };

  render() {
    const { nitrous, nitrousLoading } = this.state;
    return (
      <Container as="section" fluid>
        <Container>
          <Header as="h2" textAlign="center" className="h2-general">
            Nitrous Oxide levels from 800,000 years ago to present
          </Header>
          <Grid container>
            <Grid.Row centered stretched>
              {nitrous ? (
                <Nitrous
                  loadingNitrousCallback={(isLoading) => {
                    this.handleClickNitrous(isLoading);
                  }}
                />
              ) : null}
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width="eight" textAlign="center">
                <Button
                  onClick={this.toggleNitrous}
                  className={nitrousLoading}
                  id={nitrousLoading}
                >
                  {nitrous ? "Hide graph" : "Load graph"}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns="equal">
            <Container>
              <p>
                Nitrous oxide is a gas that is produced by the combustion of
                fossil fuel and solid waste, nitrogen-base fertilizers, sewage
                treatment plants, natural processes, and other agricultural and
                industrial activities.
              </p>
              <p>
                It is the third largest heat-trapping gas in the atmosphere and
                the biggest ozone-destroying compound emitted by human
                activities.
              </p>
              <p>
                For more detailed information please visit:
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306630/">
                  Stratospheric ozone depletion due to nitrous oxide: influences
                  of other gases
                </a>
                <em> and </em>
                <a href="https://www.epa.gov/ghgemissions/overview-greenhouse-gases#nitrous-oxide">
                  EPA: Nitrous Oxide Emissions
                </a>
                .
              </p>
              <Grid className="api-segment" columns="equal" centered stackable>
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
    );
  }
}

export default SemanticNitrous;
