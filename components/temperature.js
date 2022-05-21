/* eslint-disable */ 
import React, { useEffect } from "react";
import {
  Container,
  Grid,
} from "@mui/material";
import fetch from "unfetch";
import Chart from "chart.js";
import localTemperatureData from "../public/data/csvjson-temperature.json";
import { temperatureService } from "../services/dataService";

function Temperature() {
  const url = "api/temperature-api";

  useEffect(() => {
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
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        displayTempGraph(parsedToObject, data.result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const displayTempGraph = (commonEraData, temperatureLiveData) => {
    const date = [];
    const station = [];

    try {
      if (temperatureLiveData) {
        temperatureService.setData(temperatureLiveData);
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
      <Container
        className="chart-container"
      >
        <canvas id="tempChart" />
      </Container>
      <Grid container columns={10} justifyContent="center">
        <Grid item xs={9}>
          <Container component="footer" sx={{ marginTop: "-5px" }}>
            <p>
              Source: GISTEMP Team, 2020: GISS Surface Temperature Analysis
              (GISTEMP), version 4. NASA Goddard Institute for Space Studies.
              Dataset accessed 20YY-MM-DD at
              <a href="https://data.giss.nasa.gov/gistemp/">
                <em> https://data.giss.nasa.gov/gistemp/</em>
              </a>
              . Source data 1880 - present: Lenssen, N., G. Schmidt, J. Hansen,
              M. Menne, A. Persin, R. Ruedy, and D. Zyss, 2019: Improvements in
              the GISTEMP uncertainty model. J. Geophys. Res. Atmos., 124, no.
              12, 6307-6326, doi:10.1029/2018JD029522. Source data year 1 –
              1979: &nbsp;
              <a href="https://earthdata.nasa.gov/">
                https://earthdata.nasa.gov/
              </a>
            </p>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default Temperature;
