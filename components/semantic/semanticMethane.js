/* eslint-disable */ 
import React, { useEffect, useState } from "react";
import Methane from "../methane";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccordionMethane, AccordionShare } from "./accordion";
import { methaneService } from "../../services/dataService";
import {
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1687a7",
    },
  },
});

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
    <Container component="section">
      <Container>
        <Typography component="h2" align="center" className="h2-general">
          Methane levels from 800,000 years ago to present
        </Typography>
        <Grid container>
            {methane ? (
              <Methane
                parentCallBack={(loading) => setMethaneLoading(loading)}
              />
            ) : null}
            <Grid container justifyContent="center" sx={{margin: "20px 0"}}>
            <ThemeProvider theme={theme}>
              <LoadingButton
                onClick={() => setMethane((prevState) => !prevState)}
                loading={methaneLoading ? true : false}
                variant="contained"
              >
                {methane ? "Hide graph" : "Load graph"}
              </LoadingButton>
              </ThemeProvider>
            </Grid>
        </Grid>
        <Grid>
          <Container align="center" className="today-value">
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
            <Grid
              container
              spacing={3}
              className="api-segment"
              justifyContent="space-around"
            >
              <Grid item xs sx={{ minWidth: "250px" }}>
                <AccordionShare />
              </Grid>
              <Grid item xs sx={{ minWidth: "250px" }}>
                <AccordionMethane />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Container>
    </Container>
  );
}

export default SemanticMethane;
