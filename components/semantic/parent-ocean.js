/* eslint-disable */
import React, { useEffect, useState } from "react";
import { oceanService } from "../../services/dataService";
import Ocean from "../charts/temperature";
import { AccordionTemp, AccordionShare } from "./accordion";
import { Container, Grid, Typography } from "@mui/material";

function ParentOcean() {
  // const [todayValue, setTodayValue] = useState({});

  useEffect(() => {
    // const subscription = oceanService.getData().subscribe((message) => {
    //   if (message.value) {
    //     setTodayValue(message.value.pop());
    //   }
    // });
    // return subscription.unsubscribe.bind(subscription);
  }, []);

  return (
    <Container component="section" className="temperature-background">
      <Container>
        <Typography component="h2" align="center" className="h2-general">
          Global ocean temperature anomalies from year 1880 to present
        </Typography>
        {/* <Grid container>{todayValue === {} ? null : <Temperature />}</Grid> */}
        <Grid sx={{ marginTop: "7vh" }}>
          <Container align="center" className="today-value">
            <p>
              Today's value:
              {/* <span> {todayValue.station}</span> */}
            </p>
          </Container>
          <Container>
           
            <Grid
              container
              spacing={3}
              mt={10}
              mb={10}
              className="api-segment"
              justifyContent="space-around"
            >
              <Grid item xs sx={{ minWidth: "250px" }}>
                <AccordionTemp />
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
