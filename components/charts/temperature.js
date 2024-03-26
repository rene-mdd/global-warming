import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { Chart } from "chart.js/auto";
import localTemperatureData from "../../public/data/csvjson-temperature.json";
import { temperatureService } from "../../services/dataService";

function Temperature() {
  const url = "api/temperature-api";
  const [graphError, setGraphError] = useState("");

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

  // Helper function to get month name from month number
  const getMonthName = (monthNumber) => {
    const monthMap = {
      "04": "Jan",
      "13": "Feb",
      "21": "Mar",
      "29": "Apr",
      "38": "May",
      "46": "Jun",
      "54": "Jul",
      "63": "Aug",
      "71": "Sept",
      "79": "Oct",
      "88": "Nov",
      "96": "Dec",
    };
    return monthMap[monthNumber] || monthNumber;
  };

  const displayTempGraph = (commonEraData, temperatureLiveData) => {
    const date = [];
    const station = [];

    try {
      if (temperatureLiveData) {
        temperatureService.setData(temperatureLiveData);
        // transform api to arrays.
        temperatureLiveData.forEach((obj) => {
          const monthNumber = obj.time.split(".")[1];
          const monthName = getMonthName(monthNumber);
          const formattedDate = `${obj.time.slice(0, 4)} ${monthName}`;
          date.push(formattedDate);
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
              responsive: true,
              animation: {
                onComplete: ({ chart }) => {
                  const completeAnimation =
                    chart.canvas.classList.add("animation-complete");
                  return completeAnimation;
                },
              },
              scales: {
                y: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Celsius",
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
    } catch (error) {
      console.error(error);
      setGraphError(
        "There was an error while trying to retrieve the graph data. Please try again in a few minutes. If the error persists, please use our contact form to report it. Thank you."
      );
    }
  };

  return (
    <>
      <Container className="chart-container">
        <canvas id="tempChart" />
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
              <span>Source:</span> GISTEMP Team, 2020: GISS Surface Temperature
              Analysis (GISTEMP), version 4. NASA Goddard Institute for Space
              Studies. Dataset accessed 20YY-MM-DD at
              <a href="https://data.giss.nasa.gov/gistemp/">
                <em> https://data.giss.nasa.gov/gistemp/</em>
              </a>
              .
            </p>
            <p>
              <span>Source data 1880 - present:</span> Lenssen, N., G. Schmidt,
              J. Hansen, M. Menne, A. Persin, R. Ruedy, and D. Zyss, 2019:
              Improvements in the GISTEMP uncertainty model. J. Geophys. Res.
              Atmos., 124, no. 12, 6307-6326, doi:10.1029/2018JD029522. Source
              data year 1 – 1979: &nbsp;
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
