import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { co2Service } from "../../services/dataService";

function Co2Recent({ parentCallBackRecent }) {
  const [graphError, setGraphError] = useState("");
  const url = "api/co2-api";
  useEffect(() => {
    parentCallBackRecent(true);
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          displayCo2Graph(data);
          co2Service.setData(data.co2.pop());
          parentCallBackRecent(false);
        }
      } catch (error) {
        console.error(error);
        setGraphError(
          "There was an error while trying to retrieve the graph data. Please try again in a few minutes. If the error persists, please use our contact form to report it. Thank you."
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
        if (ctx) {
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
                    pointHoverBackgroundColor: "white",
                    pointHoverBorderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 0.5,
                    pointHoverRadius: 10,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  y: {
                    stacked: true,
                    title: {
                      display: true,
                      text: "Part Per million (ppm)",
                    },
                  },
                  x: {
                    stacked: true,
                    title: {
                      display: true,
                      text: "Year",
                    },
                    ticks: {
                      maxRotation: 90,
                    },
                  },
                },
              },
            }))();
        }
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
          <Container
            component="footer"
            className="chart-footer"
            sx={{ marginTop: "-5px" }}
          >
            <p>
              <span style={{ color: "#FD4659" }}>{graphError}</span>
            </p>
            <p>
              From 10 years ago to present, the measurements of carbon dioxide
              concentrations are done on a quasi daily basis by Mauna Loa
              Observatory. Source: Ed Dlugokencky and Pieter Tans, NOAA/GML (
              <a href="https://www.esrl.noaa.gov/gmd/ccgg/trends/">
                <em> https://www.esrl.noaa.gov/gmd/ccgg/trends/</em>
              </a>
              )
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
