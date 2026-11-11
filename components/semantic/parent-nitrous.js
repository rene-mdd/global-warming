/* eslint-disable */
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Nitrous from "../charts/nitrous";
import { AccordionNitrous, AccordionShare } from "./accordion";
import RichText from "./richText";
import { useT } from "../../lib/i18n";
import useLocalizedDecimal from "./localizedDecimal";
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

function ParentNitrous() {
  const t = useT();
  const decimal = useLocalizedDecimal();
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
          {t.nitrous.title}
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
                {nitrous ? t.common.hideGraph : t.common.loadGraph}
              </LoadingButton>
            </ThemeProvider>
          </Grid>
        </Grid>
        <Grid>
          <Container align="center" className="today-value">
            <p>
              {t.common.todayValue}
              <span> {decimal(todayValue)}</span>
            </p>
          </Container>
          <Container>
            {t.nitrous.paragraphs.map((parts, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={i}>
                <RichText parts={parts} />
              </p>
            ))}
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

export default ParentNitrous;
