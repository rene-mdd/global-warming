import React, { useEffect, useState } from "react";
import { Container, Header, Grid, Button } from "semantic-ui-react";
import Methane from "../methane";
import { AccordionMethane, AccordionShare } from "./accordion";
import { methaneService } from "../../services/dataService";

function SemanticMethane() {
  const [methane, setMethane] = useState(false);
  const [methaneLoading, setMethaneLoading] = useState(false);
  const [todayValue, setTodayValue] = useState("0");

  useEffect(() => {
    const subscription = methaneService.getData().subscribe((data) => {
      setTodayValue(data.value.average);
    });
    return subscription.unsubscribe.bind(subscription);
  }, []);

  return (
    <Container as="section" fluid>
      <Container>
        <Header as="h2" textAlign="center" className="h2-general">
          Methane levels from 800,000 years ago to present
        </Header>
        <Grid container>
          <Grid.Row centered stretched>
            {methane ? (
              <Methane
                parentCallBack={(loading) => setMethaneLoading(loading)}
              />
            ) : null}
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width="eight" textAlign="center">
              <Button
                onClick={() => setMethane((prevState) => !prevState)}
                className={methaneLoading ? "loading" : "methaneBtn"}
                id={methaneLoading ? "loading" : "methaneBtn"}
              >
                {methane ? "Hide graph" : "Load graph"}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns="equal">
          <Container textAlign="center" className="today-value">
            <p>
              Today's value:
              <span> {todayValue}</span>
            </p>
          </Container>
          <Container>
            <p>
              Methane is a flammable gas formed by geological and biological
              processes. Some of the natural ones are leaks from natural gas
              systems and wetlands.
              <br />
              50-65% of total global methane emissions come from human
              activities. These include livestock, agriculture, oil and gas
              systems, waste from homes and businesses, landfills, and so on.
            </p>
            <p>
              Methane is a gas with a global warming potential several times
              stronger than of CO2. For more than 650,000 years, methane
              concentration in the atmosphere was between 350 – 800 ppb. From
              the beginning of the industrial revolution, human activities have
              increased this amount by around 150%.
            </p>
            <p>
              For more information about the methane situation please
              visit:&nbsp;
              <a href="https://www.epa.gov/ghgemissions/overview-greenhouse-gases#methane">
                <span> EPA: Methane Emissions and </span>
              </a>
              <a href="https://earthobservatory.nasa.gov/images/146978/methane-emissions-continue-to-rise">
                <em> NASA: Methane Emissions Continue to Rise</em>
              </a>
              .
            </p>
            <p>
              For more information about the prehistoric methane concentration,
              please visit:&nbsp;
              <a href="https://www.nature.com/articles/nature06950">
                <span>
                  {" "}
                  Orbital and millennial-scale features of atmospheric CH4 over
                  the past 800,000 years.
                </span>
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

export default SemanticMethane;
