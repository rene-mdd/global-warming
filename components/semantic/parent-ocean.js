/* eslint-disable */
import React, { useEffect, useState } from "react";
import { oceanService } from "../../services/dataService";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Ocean from "../charts/ocean";
import { AccordionTemp, AccordionShare, AccordionOcean } from "./accordion";
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
  const [todayValue, setTodayValue] = useState("");
  const [description, setDescription] = useState({});
  const [oceanLoading, setOceanLoading] = useState(false);
  const [ocean, setOcean] = useState(false);

  useEffect(() => {
    const subscription = oceanService.getData().subscribe((message) => {
      if (message.value) {
        setTodayValue(message.value.temperature.pop());
        setDescription(message.value.description);
      }
    });
    return subscription.unsubscribe.bind(subscription);
  }, []);

  return (
    <Container component="section" className="temperature-background">
      <Container>
        <Typography component="h2" align="center" className="h2-general">
          Global Ocean Temperature Anomalies, January-December
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
                {ocean ? "Hide graph" : "Load graph"}
              </LoadingButton>
            </ThemeProvider>
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: "7vh" }}>
          <Container align="center" className="today-value">
            <p>
              Today's value:
              <span> {todayValue + " °C"}</span>
            </p>
          </Container>
          <Container>
            <p>
              The Co2 we produce is absorbed and dissolved into the ocean,
              making it more acidic. The ocean is also suffering from
              deoxygenation, due to contamination and global warming, making it
              less habitable for marine organism.
            </p>
            <p>
              The ocean modulates earth temperature. It takes up most of the
              excess heat that we humans produce, making it warmer, and as
              result, less able to absorb heat. Without the ocean temperature
              regulatory effect, the global average temperature would be around
              50 degrees Celsius instead of 15.
            </p>
            <Grid
              container
              spacing={3}
              mt={10}
              mb={10}
              className="api-segment"
              justifyContent="space-around"
            >
              <Grid item xs sx={{ minWidth: "250px" }}>
                <AccordionOcean props={description.title} />
              </Grid>
              <Grid item xs sx={{ minWidth: "250px" }}>
                <AccordionShare />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Container>
      <Container component="ocean-footer" align="center">
        <p>
          {`Copyright ©${new Date().getFullYear()}
              Climate Accountability API. All Rights Reserved`}
        </p>
      </Container>
    </Container>
  );
}
export default ParentOcean;
