import React, { useEffect, useRef, useState } from "react";
import { Container, Grid } from "@mui/material";
import { Chart } from "chart.js/auto";
import { useT } from "../../lib/i18n";
import localTemperatureData from "../../public/data/csvjson-temperature.json";
import { temperatureService } from "../../services/dataService";

function Temperature() {
  const t = useT().charts;
  const url = "/api/temperature-api";
  const [graphError, setGraphError] = useState("");
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const date = [];
    const amount = [];
    localTemperatureData.forEach((obj) => {
      const parts = obj.year.split(" ").filter((x) => x);
      date.push(parts[0]);
      const localValue = Number(parseFloat(parts[1].slice(0, 5)));
      amount.push(Number.isFinite(localValue) ? localValue : null);
    });

    const parsedToObject = { date, amount };
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        displayTempGraph(parsedToObject, data.result);
      } catch (error) {
        console.error(error);
        setGraphError(
          t.dataError
        );
      }
    }
    fetchData();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  // GISTEMP encodes months as hundredths of a year ("1880.04" = January).
  const getMonthName = (monthNumber) => {
    const monthIndex = {
      "04": 0,
      "13": 1,
      "21": 2,
      "29": 3,
      "38": 4,
      "46": 5,
      "54": 6,
      "63": 7,
      "71": 8,
      "79": 9,
      "88": 10,
      "96": 11,
    };
    return t.months[monthIndex[monthNumber]] || monthNumber;
  };

  const displayTempGraph = (commonEraData, temperatureLiveData) => {
    const date = [];
    const station = [];

    try {
      if (!temperatureLiveData || !canvasRef.current) return;
      temperatureService.setData(temperatureLiveData);
      // transform api to arrays.
      temperatureLiveData.forEach((obj) => {
        const monthNumber = obj.time.split(".")[1];
        const monthName = getMonthName(monthNumber);
        const formattedDate = `${obj.time.slice(0, 4)} ${monthName}`;
        date.push(formattedDate);
        const value = Number(obj.station);
        station.push(Number.isFinite(value) ? value : null);
      });
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      // chart js
      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: commonEraData.date.concat(date),
          datasets: [
            {
              label: t.temperature,
              data: commonEraData.amount.concat(station),
              fill: false,
              borderColor: "#FF073A",
              backgroundColor: "black",
              pointRadius: 1,
              pointHoverBorderWidth: 1,
              pointBackgroundColor: "rgba(255, 0, 0, 0.1)",
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
              chart.canvas.classList.add("animation-complete");
            },
          },
          scales: {
            y: {
              stacked: false,
              title: {
                display: true,
                text: t.celsius,
              },
            },
            x: {
              stacked: false,
              title: {
                display: true,
                text: t.year,
              },
              ticks: {
                maxRotation: 90,
              },
            },
          },
        },
      });

    } catch (error) {
      console.error(error);
      setGraphError(
        t.dataError
      );
    }
  };

  return (
    <>
      <Container className="chart-container">
        <canvas ref={canvasRef} id="tempChart" />
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
              <span>{t.source}</span> GISTEMP Team, 2020: GISS Surface Temperature
              Analysis (GISTEMP), version 4. NASA Goddard Institute for Space
              Studies. Dataset accessed 20YY-MM-DD at
              <a href="https://data.giss.nasa.gov/gistemp/">
                <em> https://data.giss.nasa.gov/gistemp/</em>
              </a>
              .
            </p>
            <p>
              <span>{t.temperatureSourceModern}</span> Lenssen, N., G. Schmidt,
              J. Hansen, M. Menne, A. Persin, R. Ruedy, and D. Zyss, 2019:
              Improvements in the GISTEMP uncertainty model. J. Geophys. Res.
              Atmos., 124, no. 12, 6307-6326, doi:10.1029/2018JD029522.{" "}
              {t.temperatureSourceAncient} &nbsp;
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
