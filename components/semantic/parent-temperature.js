/* eslint-disable */
import React, { useEffect, useState } from "react";
import { temperatureService } from "../../services/dataService";
import Temperature from "../charts/temperature";
import { AccordionTemp, AccordionShare } from "./accordion";
import RichText from "./richText";
import { useT } from "../../lib/i18n";
import { Container, Grid, Typography } from "@mui/material";

function ParentTemperature() {
  const t = useT();
  const [todayValue, setTodayValue] = useState("");
  useEffect(() => {
    const subscription = temperatureService.getData().subscribe((message) => {
      const values = message?.value;
      if (!Array.isArray(values) || values.length === 0) return;
      setTodayValue(values[values.length - 1]);

    });
    return subscription.unsubscribe.bind(subscription);
  }, []);

  return (
    <Container component="section" className="temperature-background">
      <Container>
        <Typography component="h2" align="center" className="h2-general">
          {t.temperature.title}
        </Typography>
        <Grid container><Temperature /></Grid>
        <Grid sx={{ marginTop: "7vh" }}>
          <Container align="center" className="today-value">
            <p>
              {t.common.todayValue}
              <span> {todayValue?.station ? todayValue?.station : t.common.unavailable}</span>
            </p>
          </Container>
          <Container>
            {t.temperature.paragraphs.map((parts, i) => (
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
export default ParentTemperature;
