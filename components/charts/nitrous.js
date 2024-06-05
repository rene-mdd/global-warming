import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import nitrousLocalData from "../../public/data/csvjson-nitrous.json";
import { nitrousService } from "../../services/dataService";

function Nitrous({ parentCallBack }) {
  const [graphError, setGraphError] = useState("");
  const url = "api/nitrous-oxide-api";
  useEffect(() => {
    parentCallBack(true);
    const date = [];
    const amount = [];
    nitrousLocalData.forEach((obj) => {
      date.push(obj.year.split(",").filter((x) => x)[0]);
      amount.push(
        parseFloat(obj.year.split(",").filter((x) => x)[1]).toFixed(1)
      );
    });

    const parsedToObject = { date, amount };

    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          displayNitrousGraph(parsedToObject, data);
          parentCallBack(false);
          nitrousService.setData(data.nitrous.pop());
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

  const displayNitrousGraph = (
    cleanNitrousPrehistoricData,
    latestNitrousData
  ) => {
    const date = [];
    const average = [];
    try {
      if (latestNitrousData.nitrous) {
        latestNitrousData.nitrous.forEach((obj) => {
          date.push(obj.date);
          average.push(obj.average);
        });
        const ctx = document.getElementById("myNitrousChart");
        if (ctx) {
          (() =>
            new Chart(ctx, {
              type: "line",
              data: {
                labels: cleanNitrousPrehistoricData.date.concat(date),
                datasets: [
                  {
                    label: "Nitrous Oxide",
                    data: cleanNitrousPrehistoricData.amount.concat(average),
                    fill: false,
                    borderColor: "#FDB147",
                    backgroundColor: "rgba(255, 0, 0, 0.1);",
                    pointRadius: 1.5,
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
                  y: {
                    stacked: false,
                    title: {
                      display: true,
                      text: "Nitrous Oxide mole fraction (ppb)",
                    },
                  },

                  x: {
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
        <canvas id="myNitrousChart" />
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
              Data 800,000 ago to 2001 source: United States, Environmental
              Protection Agency (EPA), (
              <a href="https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases">
                https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases
              </a>
              )
            </p>
            <p>
              <span>2001 - present: </span>Ed Dlugokencky, NOAA/GML (
              <a href="https://www.esrl.noaa.gov/gmd/ccgg/trends_n2o/">
                https://www.esrl.noaa.gov/gmd/ccgg/trends_n2o/
              </a>
              )
            </p>
            <p>
              <b> From 2001.01 the data is measured on a monthly basis</b>
            </p>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

Nitrous.propTypes = {
  parentCallBack: PropTypes.func,
};

Nitrous.defaultProps = {
  parentCallBack: true,
};

export default Nitrous;
