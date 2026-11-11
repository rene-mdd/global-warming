/* eslint-disable */
import React, { useEffect, useState } from "react";
import { oceanService } from "../../services/dataService";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Ocean from "../charts/ocean";
import { AccordionTemp, AccordionShare, AccordionOcean } from "./accordion";
import RichText from "./richText";
import { useLocale, useT } from "../../lib/i18n";
import useLocalizedDecimal from "./localizedDecimal";
import { Container, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1687a7",
    },
  },
});

function ParentOcean() {
  const t = useT();
  const locale = useLocale();
  const decimal = useLocalizedDecimal();
  const [todayValue, setTodayValue] = useState("0");
  const [description, setDescription] = useState({});
  const [oceanLoading, setOceanLoading] = useState(false);
  const [ocean, setOcean] = useState(false);

  useEffect(() => {
    const subscription = oceanService.getData().subscribe((message) => {
      if (message.value) {
        setTodayValue(message.value.temperature[message.value.temperature.length - 1]);
        setDescription(message.value.description);
      }
    });
    return subscription.unsubscribe.bind(subscription);
  }, []);

  return (
    <Container component="section" className="temperature-background">
      <Container>
        <Typography component="h2" align="center" className="h2-general">
          {t.ocean.title}
        </Typography>
        <Grid container>
          {ocean ? (
            <Ocean parentCallBack={(loading) => setOceanLoading(loading)} />
          ) : null}
          <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
            <ThemeProvider theme={theme}>
              <LoadingButton
                onClick={() => setOcean((prevState) => !prevState)}
                loading={oceanLoading ? true : false}
                variant="contained"
              >
                {ocean ? t.common.hideGraph : t.common.loadGraph}
              </LoadingButton>
            </ThemeProvider>
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: "7vh" }}>
          <Container align="center" className="today-value">
            <p>
              {t.common.todayValue}
              <span> {todayValue ? decimal(todayValue) : 0 + " °C"}</span>
            </p>
          </Container>
          <Container>
            {t.ocean.paragraphs.map((parts, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={i}>
                <RichText parts={parts} />
              </p>
            ))}
            <Grid
              container
              spacing={3}
              mt={10}
              mb={10}
              className="api-segment"
              justifyContent="space-around"
            >
              <Grid item xs sx={{ minWidth: "250px" }}>
                {/* NOAA's title is English only, so German pages use the dictionary's. */}
                <AccordionOcean
                  props={
                    locale !== "de" && description?.title
                      ? description.title
                      : t.ocean.apiTitleFallback
                  }
                />
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
export default ParentOcean;
