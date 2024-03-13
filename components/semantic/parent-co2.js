import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Co2 from "../charts/co2";
import Co2Prehistoric from "../charts/co2Prehistoric";
import Co2Recent from "../charts/co2Recent";
import { AccordionCo2, AccordionShare } from "./accordion";
import { co2Service } from "../../services/dataService";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1687a7",
    },
  },
});

function ParentCo2() {
  const [co2, setCo2] = useState(false);
  const [co2Prehistoric, setCo2Prehistoric] = useState(false);
  const [co2recent, setCo2Recent] = useState(false);
  const [co2Loading, setCo2Loading] = useState(false);
  const [co2LoadingPrehistoric, setCo2LoadingPrehistoric] = useState(false);
  const [co2RecentLoading, setRecentCo2Loading] = useState(false);
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
        <Grid container mt={2}>
          {co2 ? (
            <Co2 parentCallBack={(loading) => setCo2Loading(loading)} />
          ) : null}
          {co2Prehistoric ? (
            <Co2Prehistoric
              parentCallBackPrehist={(loading) =>
                setCo2LoadingPrehistoric(loading)}
            />
          ) : null}
          {co2recent ? (
            <Co2Recent
              parentCallBackRecent={(loading) => setRecentCo2Loading(loading)}
            />
          ) : null}
          <Grid container spacing={2} rowSpacing={2}>
            <ThemeProvider theme={theme}>
              <Grid
                xs={12}
                sm={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <LoadingButton
                  onClick={() => {
                    setCo2Prehistoric((prevState) => !prevState);
                  }}
                  loading={co2LoadingPrehistoric}
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  {co2Prehistoric ? "Hide graph" : "-800,000 - 2009"}
                </LoadingButton>
              </Grid>
              <Grid
                xs={12}
                sm={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <LoadingButton
                  onClick={() => setCo2((prevState) => !prevState)}
                  loading={co2Loading}
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  {co2 ? "Hide graph" : "-800,000 - present"}
                </LoadingButton>
              </Grid>
              <Grid
                xs={12}
                sm={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <LoadingButton
                  onClick={() => {
                    setCo2Recent((prevState) => !prevState);
                  }}
                  loading={co2RecentLoading}
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  {co2recent ? "Hide graph" : "2014 - 2024"}
                </LoadingButton>
              </Grid>
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
              spacing={3}
              className="api-segment"
              justifyContent="space-around"
              mt={10}
              pb={10}
            >
              <Grid item xs sx={{ minWidth: "250px" }}>
                <AccordionCo2 />
              </Grid>
              <Grid item xs sx={{ minWidth: "250px" }}>
                <AccordionShare />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Container>
    </Container>
  );
}

export default ParentCo2;
