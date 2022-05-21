/* eslint-disable */
import React, { useEffect, useState } from "react";
import fetch from "unfetch";
import Chart from "chart.js";
// import { Container, Grid } from "semantic-ui-react";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import localMethaneData from "../public/data/csvjson-methane.json";
import { methaneService } from "../services/dataService";

function Methane(props) {
  const [graphError, setGraphError] = useState("");
  const url = "api/methane-api";

  useEffect(() => {
    // processing of json file
    props.parentCallBack(true);

    const date = [];
    const amount = [];

    localMethaneData.forEach((obj) => {
      date.push(obj.year.split(",").filter((x) => x)[0]);
      amount.push(
        Number(parseFloat(obj.year.split(",").filter((x) => x)[1]).toFixed(1))
      );
    });
    const parsedToObject = { date, amount };

    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          methaneService.setData(data.methane.pop());
          displayMethaneGraph(parsedToObject, data);
          props.parentCallBack(false);
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

  const displayMethaneGraph = (methPrehistoricData, latestMethaneData) => {
    const date = [];
    const average = [];
    try {
      if (latestMethaneData.methane) {
        latestMethaneData.methane.forEach((obj) => {
          date.push(obj.date);
          average.push(obj.average);
        });
        const ctx = document.getElementById("myMethChart");
        (() =>
          new Chart(ctx, {
            type: "line",
            data: {
              labels: methPrehistoricData.date.concat(date),
              datasets: [
                {
                  label: "Methane",
                  data: methPrehistoricData.amount.concat(average),
                  fill: false,
                  borderColor: "#A75E09",
                  backgroundColor: "rgba(255, 0, 0, 0.1);",
                  pointRadius: 0.5,
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
              scales: {
                bounds: "ticks",
                ticks: {
                  suggestedMax: 800000,
                  suggestedMin: -800000,
                },
                yAxes: [
                  {
                    stacked: true,
                    scaleLabel: {
                      display: true,
                      labelString: "Part Per million (ppm)",
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
        <canvas id="myMethChart" />
      </Container>
      <Grid container columns={10} justifyContent="center">
        <Grid item xs={9}>
          <Container component="footer" sx={{ marginTop: "-5px" }}>
            <p>
              <span style={{ color: "#FD4659" }}>{graphError}</span>
            </p>
            <p>
              Year 1983 to present data source: Global Monitoring Division of
              NOAA’s Earth System Research Laboratory Ed Dlugokencky, NOAA/GML (
              <a href="https://www.esrl.noaa.gov/gmd/ccgg/trends_ch4/">
                <em> https://www.esrl.noaa.gov/gmd/ccgg/trends_ch4/</em>
              </a>
              ).
            </p>
            <p>
              Data 800,000 years ago to 1983 source: United States,
              Environmental Protection Agency (EPA), (
              <a href="https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases">
                <em>
                  https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases
                </em>
              </a>
              )
            </p>
            <p>
              <b>From 1983.07 this data is measured on a monthly basis</b>
            </p>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

Methane.propTypes = {
  parentCallBack: PropTypes.func,
};

Methane.defaultProps = {
  parentCallBack: true,
};

export default Methane;
