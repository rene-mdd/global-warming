/* eslint-disable */
import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import fetch from "unfetch";
import Chart from "chart.js";
import { oceanService } from "../../services/dataService";
import PropTypes from "prop-types";

function Ocean(props) {
  const url = "api/ocean-warming-api";

  useEffect(() => {
    props.parentCallBack(true);
    async function fetchData() {
      try {
        const response = await fetch(url);
        const oceanWarmingData = await response.json();
        if (oceanWarmingData) {
          props.parentCallBack(false);
          displayOceanGraph(oceanWarmingData);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const displayOceanGraph = (oceanWarmingData) => {
    const { result, description } = oceanWarmingData;
    const date = [];
    const temperature = [];

    try {
      if (result) {
        for (const [key, value] of Object.entries(result)) {
          date.push(key);
          temperature.push(value);
        }
        oceanService.setData({ temperature, description });
        const ctx = document.getElementById("oceanChart");
        (() =>
          new Chart(ctx, {
            type: "line",
            data: {
              labels: date,
              datasets: [
                {
                  label: "Ocean warming",
                  data: temperature,
                  fill: false,
                  borderColor: "#1da2d8",
                  backgroundColor: "black",
                  pointRadius: 1,
                  pointHoverBorderWidth: 1,
                  pointBackgroundColor: "rgba(255, 0, 0, 0.1);",
                  pointHoverBackgroundColor: "white",
                  pointHoverBorderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                  pointHoverRadius: 10,
                },
              ],
            },
            options: {
              animation: {
                onComplete: ({ chart }) => {
                  const completeAnimation =
                    chart.canvas.classList.add("animation-complete");
                  return completeAnimation;
                },
              },
              scales: {
                ticks: {
                  suggestedMax: 800000,
                  suggestedMin: -800000,
                },
                yAxes: [
                  {
                    stacked: true,
                    scaleLabel: {
                      display: true,
                      labelString: "Celsius",
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
    }
  };

  return (
    <>
      <Container className="chart-container">
        <canvas id="oceanChart" />
      </Container>
      <Grid container columns={10} justifyContent="center">
        <Grid item xs={9}>
          <Container component="footer" sx={{ marginTop: "-5px" }}>
            <p>
              NOAA National Centers for Environmental information, Climate at a
              Glance: Global Time Series, published January 2023, retrieved on
              January 19, 2023 from &nbsp;
              <a href="https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series">
                <em>
                  https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series
                </em>
              </a>
            </p>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

Ocean.propTypes = {
  parentCallBack: PropTypes.func,
};

Ocean.defaultProps = {
  parentCallBack: true,
};

export default Ocean;
