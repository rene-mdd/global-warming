/* eslint-disable */
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Nitrous from "../charts/nitrous";
import { AccordionNitrous, AccordionShare } from "./accordion";
import { nitrousService } from "../../services/dataService";
import { Container, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1687a7",
    },
  },
});

function SemanticNitrous() {
  const [nitrous, setNitrous] = useState(false);
  const [nitrousLoading, setNitrousLoading] = useState(false);
  const [todayValue, setTodayValue] = useState("0");

  useEffect(() => {
    const subscription = nitrousService.getData().subscribe((data) => {
      setTodayValue(data.value.average);
    });
    return subscription.unsubscribe.bind(subscription);
  }, []);

  return (
    <Container component="section">
      <Container>
        <Typography component="h2" align="center" className="h2-general">
          Nitrous Oxide levels from 800,000 years ago to present
        </Typography>
        <Grid container>
          {nitrous ? (
            <Nitrous parentCallBack={(loading) => setNitrousLoading(loading)} />
          ) : null}
          <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
            <ThemeProvider theme={theme}>
              <LoadingButton
                onClick={() => setNitrous((prevState) => !prevState)}
                loading={nitrousLoading ? true : false}
                variant="contained"
              >
                {nitrous ? "Hide graph" : "Load graph"}
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
            <Grid
              container
              spacing={3}
              className="api-segment"
              justifyContent="space-around"
              mt={10}
              mb={10}
            >
              <Grid item xs sx={{ minWidth: "250px" }}>
                <AccordionNitrous />
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

export default SemanticNitrous;
