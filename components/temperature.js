/* eslint-disable no-nested-ternary */
import React from "react";
import { Container, Grid } from "semantic-ui-react";
import fetch from "unfetch";
import Chart from "chart.js";
import localTemperatureData from "../public/data/csvjson-temperature.json";

class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestTemperatureData: {},
      commonEraData: {},
    };
    this.url = "api/temperature-api";
  }

  async componentDidMount() {
    const date = [];
    const amount = [];
    localTemperatureData.forEach((obj) => {
      date.push(obj.year.split(" ").filter((x) => x)[0]);
      amount.push(
        parseFloat(
          obj.year
            .split(" ")
            .filter((x) => x)[1]
            .slice(0, 5)
        )
      );
    });

    const parsedToObject = { date, amount };

    this.setState({ commonEraData: parsedToObject });

    try {
      const response = await fetch(this.url);
      const data = await response.json();
      this.setState({ latestTemperatureData: data });
    } catch (error) {
      // console.log(error);
    }
  }

  displayTempGraph = (commonEraData, temperatureLiveData) => {
    const date = [];
    const station = [];

    try {
      if (temperatureLiveData) {
        // transform api to arrays. Using ternary experison to save space.
        temperatureLiveData.forEach((obj) => {
          date.push(
            obj.time.split(".")[1] === "04"
              ? `${obj.time.slice(0, 4)} Jan`
              : obj.time.split(".")[1] === "13"
              ? `${obj.time.slice(0, 4)} Feb`
              : obj.time.split(".")[1] === "21"
              ? `${obj.time.slice(0, 4)} Mar`
              : obj.time.split(".")[1] === "29"
              ? `${obj.time.slice(0, 4)} Apr`
              : obj.time.split(".")[1] === "38"
              ? `${obj.time.slice(0, 4)} May`
              : obj.time.split(".")[1] === "46"
              ? `${obj.time.slice(0, 4)} Jun`
              : obj.time.split(".")[1] === "54"
              ? `${obj.time.slice(0, 4)} Jul`
              : obj.time.split(".")[1] === "63"
              ? `${obj.time.slice(0, 4)} Aug`
              : obj.time.split(".")[1] === "71"
              ? `${obj.time.slice(0, 4)} Sept`
              : obj.time.split(".")[1] === "79"
              ? `${obj.time.slice(0, 4)} Oct`
              : obj.time.split(".")[1] === "88"
              ? `${obj.time.slice(0, 4)} Nov`
              : obj.time.split(".")[1] === "96"
              ? `${obj.time.slice(0, 4)} Dec`
              : obj.time
          );
          station.push(obj.station);
        });
        // chart js
        const ctx = document.getElementById("tempChart");
        (() =>
          new Chart(ctx, {
            type: "line",
            data: {
              labels: commonEraData.date.concat(date),
              datasets: [
                {
                  label: "Temperature",
                  data: commonEraData.amount.concat(station),
                  fill: false,
                  borderColor: "#FF073A",
                  backgroundColor: "black",
                  pointRadius: 1,
                  pointHoverBorderWidth: 1,
                  pointBackgroundColor: "rgba(255, 0, 0, 0.1);",
                  pointHoverBackgroundColor: "white",
                  pointHoverBorderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 0.5,
                  pointHoverRadius: 10,
                },
              ],
            },
            options: {
              animation: {
                onComplete: ({ chart }) => {
                  const completeAnimation = chart.canvas.classList.add(
                    "animation-complete"
                  );
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
      // console.log(error);
    }
  };

  render() {
    const { commonEraData, latestTemperatureData } = this.state;
    return (
      <>
        <div
          className="hide"
          onLoad={this.displayTempGraph(
            commonEraData,
            latestTemperatureData.result
          )}
        />

        <Container
          className="chart-container"
          style={{ position: "relative", width: "80vw" }}
        >
          <canvas id="tempChart" />
        </Container>
        <Grid centered columns="equal">
          <Grid.Column width="14">
            <Container as="footer">
              <p>
                Source: GISTEMP Team, 2020: GISS Surface Temperature Analysis
                (GISTEMP), version 4. NASA Goddard Institute for Space Studies.
                Dataset accessed 20YY-MM-DD at
                <a href="https://data.giss.nasa.gov/gistemp/">
                  <em> https://data.giss.nasa.gov/gistemp/</em>
                </a>
                . Source data 1880 - present: Lenssen, N., G. Schmidt, J.
                Hansen, M. Menne, A. Persin, R. Ruedy, and D. Zyss, 2019:
                Improvements in the GISTEMP uncertainty model. J. Geophys. Res.
                Atmos., 124, no. 12, 6307-6326, doi:10.1029/2018JD029522. Source
                data year 1 – 1979: &nbsp;
                <a href="https://earthdata.nasa.gov/">
                  https://earthdata.nasa.gov/
                </a>
              </p>

              <p>
                <b>From 1880.04 the data is measured on a monthly basis</b>
              </p>
            </Container>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

export default Temperature;
