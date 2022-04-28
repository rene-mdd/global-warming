import React, { useState } from "react";
import { Container, Header, Grid, Button } from "semantic-ui-react";
import Nitrous from "../nitrous";
import { AccordionNitrous, AccordionShare } from "./accordion";

function SemanticNitrous() {
  const [nitrous, setNitrous] = useState(false);
  const [nitrousLoading, setNitrousLoading] = useState(false);

  return (
    <Container as="section" fluid>
      <Container>
        <Header as="h2" textAlign="center" className="h2-general">
          Nitrous Oxide levels from 800,000 years ago to present
        </Header>
        <Grid container>
          <Grid.Row centered stretched>
            {nitrous ? <Nitrous parentCallBack={loading => setNitrousLoading(loading)} /> : null}
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width="eight" textAlign="center">
              <Button
                onClick={() => setNitrous((prevState) => !prevState)}
                className={nitrousLoading ? "loading" : "nitrousBtn"}
                id={nitrousLoading ? "loading" : "nitrousBtn"}
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
              the biggest ozone-destroying compound emitted by human activities.
            </p>
            <p>
              For more detailed information please visit:&nbsp;
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306630/">
                Stratospheric ozone depletion due to nitrous oxide: influences
                of other gases
              </a>
              <span> and </span>
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

export default SemanticNitrous;
