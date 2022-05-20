/* eslint-disable */
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Co2 from "../co2";
import { AccordionCo2, AccordionShare } from "./accordion";
import { co2Service } from "../../services/dataService";
import {
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1687a7",
    },
  },
});

function SemanticCo2() {
  const [co2, setCo2] = useState(false);
  const [co2Loading, setCo2Loading] = useState(false);
  const [todayValue, setTodayValue] = useState("0");

  useEffect(() => {
    const subscription = co2Service.getData().subscribe((data) => {
      setTodayValue(data.value.trend);
    });
    return subscription.unsubscribe.bind(subscription);
  }, []);

  return (
    <Container component="section">
      <Container>
        <Typography component="h2" align="center" className="h2-general">
          Carbon Dioxide levels from 800,000 years ago to present
        </Typography>
        <Grid container >
            {co2 ? (
              <Co2 parentCallBack={(loading) => setCo2Loading(loading)} />
            ) : null}
          <Grid container justifyContent="center" sx={{margin: "20px 0"}}>
            <ThemeProvider theme={theme}>
            <LoadingButton
                onClick={() => setCo2((prevState) => !prevState)}
                loading={co2Loading ? true : false}
                variant="contained"
              >
                {co2 ? "Hide graph" : "Load graph"}
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
            <Grid
              container
              className="api-segment"
              columns={12}
              justifyContent="space-around"
            >
              <Grid item xs={6}>
                <AccordionShare />
              </Grid>
              <Grid item xs={6}>
                <AccordionCo2 />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Container>
    </Container>
  );
}

export default SemanticCo2;
