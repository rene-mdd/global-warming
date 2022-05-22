/* eslint-disable */
import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Arctic from "../charts/arctic";
import { AccordionArctic, AccordionShare } from "./accordion";
import { arcticService } from "../../services/dataService";
import { LoadingButton } from "@mui/lab";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1687a7",
    },
  },
});

function SemanticArctic() {
  const [arctic, setArctic] = useState(false);
  const [arcticLoading, setArcticLoading] = useState(false);
  const [todayValue, setTodayValue] = useState({});

  useEffect(() => {
    const subscription = arcticService.getData().subscribe((data) => {
      if (data) {
        setTodayValue(data.value.pop());
      }
    });
    return subscription.unsubscribe.bind(subscription);
  });

  return (
    <Container component="section">
      <Container>
        <Typography component="h2" align="center" className="h2-general">
          Melted Polar Ice Caps
        </Typography>
        <Grid container>
          {arctic ? (
            <Arctic parentCallBack={(loading) => setArcticLoading(loading)} />
          ) : null}
          <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
            <ThemeProvider theme={theme}>
              <LoadingButton
                onClick={() => setArctic((prevState) => !prevState)}
                loading={arcticLoading ? true : false}
                variant="contained"
              >
                {arctic ? "Hide graph" : "Load graph"}
              </LoadingButton>
            </ThemeProvider>
          </Grid>
        </Grid>
        <Grid>
          <Container align="center" className="today-value">
            <p>
              Today's value:
              <span style={{ color: "#2c82c9" }}>
                {" "}
                {`Extent ${todayValue.extent ? todayValue.extent : 0}, Area ${
                  todayValue.area ? todayValue.area : 0
                }`}
              </span>
            </p>
          </Container>
          <Container id="scrolling-container">
            <p>
              The arctic is warming around twice as fast as global average. Some
              of the reasons for this are: The arctic amplification, the albedo
              effect, and black carbon. From 1979 to 1996, we lost 2.2 – 3% of
              the arctic ice cover. From 2010 to present we are losing 12.85%
              per decade!
            </p>

            <p>
              Another consequence is permafrost thawing. This is a process in
              which large amounts of methane is released to the atmosphere,
              fueling more the process of global warming.
            </p>
            <p>
              For more details please visit:&nbsp;
              <a href="https://www.npolar.no/en/themes/climate-change-in-the-arctic/#toggle-id-8">
                Climate change in the Arctic
              </a>
              <span> and </span>
              <a href="https://www.igsoc.org/annals/46/a46a005.pdf">
                Recent air-temperature changes in the Arctic
              </a>
              .
            </p>
            <Grid
              container
              spacing={3}
              className="api-segment"
              justifyContent="space-around"
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
      <Container component="footer" align="center">
        <p>
          {`Copyright ©${new Date().getFullYear()}
              René Rodríguez. All Rights Reserved`}
        </p>
      </Container>
    </Container>
  );
}

export default SemanticArctic;
