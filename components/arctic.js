/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from "react";
import fetch from "unfetch";
import Chart from "chart.js";
import { Container, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import { arcticService } from "../services/dataService";

function Arctic() {
  // constructor(props) {
  //   super(props);
  //   this.state = { arcticData: [], isLoading: true, graphError: "" };
  const url = "api/arctic-api";
  // }
  const [isLoading, setIsLoading] = useState(true);
  const [arcticData, setArcticData] = useState([]);
  const [graphError, setGraphError] = useState("");

  useEffect(() => {
    async function fetchArcticData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          console.log(data)
          setIsLoading(false);
          setArcticData(data);
          arcticService.setData({value: data.result, isLoading: isLoading});
        }
      } catch (error) {
        setGraphError(
          "There was an error trying to get the graph data. Please refer to our contact form and report it. Thank you."
        );
      }
    }
    fetchArcticData();
  }, []);

  const displayArcticGraph = (arcticDataResult) => {
    const yearArray = [];
    const extentArray = [];
    const areaArray = [];
    try {
      const ctx = document.getElementById("arcticChart");
      if (arcticDataResult) {
        // arcticService.setData(arcticDataResult);

        arcticDataResult.forEach(({ year, extent, area }) => {
          yearArray.push(year);
          extentArray.push(parseFloat(extent));
          areaArray.push(parseFloat(area));
        });
        (() =>
          new Chart(ctx, {
            type: "line",
            data: {
              labels: yearArray,
              datasets: [
                {
                  label: "Extent",
                  data: extentArray,
                  fill: false,
                  borderColor: "rgba(44, 130, 201, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Area",
                  data: areaArray,
                  fill: false,
                  borderColor: "rgba(137, 196, 244, 1)",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                yAxes: [
                  {
                    stacked: false,
                    scaleLabel: {
                      display: true,
                      labelString: "Million square km",
                    },
                  },
                ],
                xAxes: [
                  {
                    stacked: false,
                    scaleLabel: {
                      display: true,
                      labelString: "Year",
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
      <div onLoad={displayArcticGraph(arcticData.result)} />

      <Container
        className="chart-container"
        style={{ position: "relative", width: "80vw" }}
      >
        <canvas id="arcticChart" />
      </Container>
      <Grid width="equal" centered>
        <Grid.Column fluid="true" width="14">
          {!isLoading && (
            <Container as="footer" style={{ marginTop: "-5px" }}>
              <p>
                <span style={{ color: "#FD4659" }}>{graphError}</span>
              </p>
              <p>
                Data source: Satellite observations. Credit:
                <a href="https://nsidc.org/">NSIDC</a>
                /NASA.
              </p>
            </Container>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
}

Arctic.propTypes = {
  arcticLoadingCallback: PropTypes.func,
};

Arctic.defaultProps = {
  arcticLoadingCallback: true,
};

export default Arctic;
