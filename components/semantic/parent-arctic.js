import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Arctic from "../charts/arctic";
import { AccordionArctic, AccordionShare } from "./accordion";
import RichText from "./richText";
import { useT } from "../../lib/i18n";
import { arcticService } from "../../services/dataService";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1687a7",
    },
  },
});

function ParentArctic() {
  const t = useT();
  const [arctic, setArctic] = useState(false);
  const [arcticLoading, setArcticLoading] = useState(false);
  const [todayValue, setTodayValue] = useState("0");

  useEffect(() => {
    const subscription = arcticService.getData().subscribe(({value}) => {
      if (value) {
        setTodayValue(value[0]);
      }
    });
    return subscription.unsubscribe.bind(subscription);
  });

  return (
    <Container component="section">
      <Container>
        <Typography component="h2" align="center" className="h2-general">
          {t.arctic.title}
        </Typography>
        <Grid container>
          {arctic ? (
            <Arctic parentCallBack={(loading) => setArcticLoading(loading)} />
          ) : null}
          <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
            <ThemeProvider theme={theme}>
              <LoadingButton
                onClick={() => setArctic((prevState) => !prevState)}
                loading={arcticLoading}
                variant="contained"
              >
                {arctic ? t.common.hideGraph : t.common.loadGraph}
              </LoadingButton>
            </ThemeProvider>
          </Grid>
        </Grid>
        <Grid>
          <Container align="center" className="today-value">
            <p>
              {t.common.todayValue}
              <span style={{ color: "#2c82c9" }}> {todayValue}</span>
            </p>
          </Container>
          <Container id="scrolling-container">
            {t.arctic.paragraphs.map((parts, i) => (
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
                <AccordionArctic />
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

export default ParentArctic;
