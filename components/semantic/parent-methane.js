/* eslint-disable */ 
import React, { useEffect, useState } from "react";
import Methane from "../charts/methane";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccordionMethane, AccordionShare } from "./accordion";
import RichText from "./richText";
import { useT } from "../../lib/i18n";
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

function ParentMethane() {
  const t = useT();
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
          {t.methane.title}
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
                {methane ? t.common.hideGraph : t.common.loadGraph}
              </LoadingButton>
              </ThemeProvider>
            </Grid>
        </Grid>
        <Grid>
          <Container align="center" className="today-value">
            <p>
              {t.common.todayValue}
              <span> {todayValue}</span>
            </p>
          </Container>
          <Container>
            {t.methane.paragraphs.map((parts, i) => (
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
              <AccordionMethane />
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

export default ParentMethane;
