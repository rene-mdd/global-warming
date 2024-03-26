import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { arcticService } from "../../services/dataService";

function Arctic({ parentCallBack }) {
  const url = "api/arctic-api";
  const [graphError, setGraphError] = useState("");

  useEffect(() => {
    parentCallBack(true);
    async function fetchArcticData() {
      try {
        const response = await fetch(url);
        const { arcticData } = await response.json();
        if (arcticData.data) {
          displayArcticGraph(arcticData.data);
          parentCallBack(false);
        }
      } catch (error) {
        console.error(error);
        setGraphError(
          "There was an error while trying to retrieve the graph data. Please try again in a few minutes. If the error persists, please use our contact form to report it. Thank you."
        );
      }
    }
    fetchArcticData();
  }, []);

  const displayArcticGraph = (arcticData) => {
    // const anomaly = [];
    const amount = [];
    const year = [];
    try {
      const ctx = document.getElementById("arcticChart");
      if (arcticData) {
        const filterArcticData = Object.keys(arcticData)
          .filter((objKey) => objKey !== "198712" && objKey !== "198801")
          .reduce((newObj, key) => {
            const filterObject = newObj;
            filterObject[key] = arcticData[key];
            return newObj;
          }, {});
        for (const [key, squareKm] of Object.entries(filterArcticData)) {
          // anomaly.push(squareKm.anom);
          amount.push(squareKm.value);
          year.push(`${key.slice(0, 4)}.${key.slice(-2)}`);
        }
        (() =>
          new Chart(ctx, {
            type: "line",
            data: {
              labels: year,
              datasets: [
                {
                  label: "Extent",
                  borderColor: "rgba(44, 130, 201, 1)",
                  data: amount,
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  stacked: true,
                  suggestedMax: 30,
                  suggestedMin: 10,
                  title: {
                    display: true,
                    text: "Million square km",
                  },
                },
                x: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "year",
                  },
                  ticks: {
                    maxRotation: 90,
                  },
                },
              },
            },
          }))();
        arcticService.setData(amount.slice(-1));
      }
    } catch (error) {
      console.error(error);
      setGraphError(
        "There was an error trying to load the graph. If the problem persists, please refer to our contact form and report it. Thank you."
      );
    }
  };

  return (
    <>
      <Container className="chart-container">
        <canvas id="arcticChart" />
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
              <span>Title:</span> Global Sea Ice Extent 1979-2024 (on a monthly
              basis)
            </p>
            <p>
              <span>Base period:</span> 1991-2020
            </p>
            <p>
              <span>Data source:</span> National Centers for Environmental
              Information:
              <a href="https://www.ncei.noaa.gov/access/monitoring/snow-and-ice-extent/sea-ice/G/0">
                {" "}
                NOAA
              </a>
            </p>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

Arctic.propTypes = {
  parentCallBack: PropTypes.func,
};

Arctic.defaultProps = {
  parentCallBack: true,
};

export default Arctic;
