import React, { useEffect, useRef, useState } from "react";
import { Container, Header, Grid, Button } from "semantic-ui-react";
import Co2 from "../co2";
import { AccordionCo2, AccordionShare } from "./accordion";
import { co2Service } from "../../services/dataService";

function SemanticCo2() {

  const [co2, setCo2] = useState(false);
  const [co2Loading, setCo2Loading] = useState("co2Btn");
  const [todayValue, setTodayValue] = useState(0);

  const toggleCo2 = () => {
    setCo2(prevState => !prevState);
    setCo2Loading("loading");
  };

  useEffect(() => {
    co2Service.getData().subscribe((data) => {
      setTodayValue(data.value.trend);
      setCo2Loading("co2Btn");
    })
  }, [])

  return (
    <Container as="section" fluid>
      <Container>
        <Header as="h2" textAlign="center" className="h2-general">
          Carbon Dioxide levels from 800,000 years ago to present
        </Header>
        <Grid container>
          <Grid.Row centered stretched>
            {co2 ? <Co2 /> : null}
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width="eight" textAlign="center">
              <Button
                onClick={() => toggleCo2()}
                className={co2Loading}
                id={co2Loading}
              >
                {co2 ? "Hide graph" : "Load graph"}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns="equal">
        <Container textAlign="center" className="today-value">
            <p>
              Today's value: <span>{todayValue}</span>
            </p>
          </Container>
          <Container>
            <p>
              For thousands of years, the natural concentration of CO2 in earth
              atmosphere was around 280 ppm. From the beginning of the
              industrial revolution, human activities like the burning of fossil
              fuels, deforestation, and livestock have increased this amount by
              more than 30%.
            </p>
            <p>
              For more information about prehistoric CO2 concentration, current
              and future consequences please visit:&nbsp;
              <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide">
                <em> Climate Change: Atmospheric Carbon Dioxide </em>
              </a>
              <span> and </span>
              <a href="https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/">
                <em>The relentless rise of carbon dioxide</em>
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

export default SemanticCo2;
