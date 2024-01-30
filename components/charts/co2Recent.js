/* eslint-disable */
import React, { useEffect, useState } from "react";
import fetch from "unfetch";
import Chart from "chart.js";
import {
  Container,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { co2Service } from "../../services/dataService";

function Co2Recent(props) {
  const [graphError, setGraphError] = useState("");
  const url = "api/co2-api";

  useEffect(() => {
    props.parentCallBackRecent(true);

    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          displayCo2Graph(data);
          co2Service.setData(data.co2.pop());
          props.parentCallBackRecent(false);
        }
      } catch (error) {
        console.error(error);
        setGraphError(
          "There was an error trying to get the graph data. Please refer to our contact form and report it. Thank you."
        );
      }
    }
    fetchData();
  }, []);

  const displayCo2Graph = (latestCo2Data) => {
    const date = [];
    const amount = [];
    try {
      if (latestCo2Data) {
        latestCo2Data.co2.forEach((obj) => {
          date.push(`${obj.year}.${obj.month}.${obj.day}`);
          amount.push(obj.trend);
        });
        const ctx = document.getElementById("myRecentCo2Chart");
        (() =>
          new Chart(ctx, {
            type: "line",
            data: {
              labels: date,
              datasets: [
                {
                  label: "Carbon Dioxide",
                  data: amount,
                  fill: false,
                  borderColor: "#4984B8",
                  backgroundColor: "black",
                  pointRadius: false,
                  pointHoverBorderWidth: 10,
                  pointBackgroundColor: "rgba(255, 99, 132, 1)",
                  pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
                  pointHoverBorderColor: "black",
                  borderWidth: 1,
                  pointHoverRadius: 5,
                },
              ],
            },
            options: {
              scales: {
                bounds: "ticks",
                yAxes: [
                  {
                    stacked: true,
                    scaleLabel: {
                      display: true,
                      labelString: "Part Per million (ppm)",
                    },
                    ticks: {
                      min: 390,
                      max: 440,
                    },
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                    scaleLabel: {
                      display: true,
                      labelString: "Year",
                    },
                    ticks: {
                      maxRotation: 90,
                    },
                  },
                ],
              },
            },
          }))();
      }
    } catch (error) {
      console.error(error);
      setGraphError(
        "There was an error trying to load the graph. Please refer to our contact form and report it. Thank you."
      );
    }
  };

  return (
    <>
      <Container className="chart-container">
        <canvas id="myRecentCo2Chart" />
      </Container>
      <Grid container columns={10} justifyContent="center">
        <Grid item xs={9}>
          <Container component="footer" sx={{ marginTop: "-5px" }}>
            <p>
              <span style={{ color: "#FD4659" }}>{graphError}</span>
            </p>
            <p>
              From 10 years ago to present, the measurements of carbon dioxide concentrations are
              done by Mauna Loa Observatory. Source: Ed Dlugokencky and Pieter
              Tans, NOAA/GML (
              <a href="https://www.esrl.noaa.gov/gmd/ccgg/trends/">
                <em> https://www.esrl.noaa.gov/gmd/ccgg/trends/</em>
              </a>
              )
            </p>
            <p>
              Data source: 800,000 years ago to 2021
              <a href="https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases">
                <em>
                  {" "}
                  https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases
                </em>
              </a>
            </p>
            <p>
              <b>
                From 10 years ago to present the data is measured on a quasi daily basis
              </b>
            </p>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

Co2Recent.propTypes = {
  parentCallBackRecent: PropTypes.func,
};

Co2Recent.defaultProps = {
  parentCallBackRecent: true,
};

export default Co2Recent;
