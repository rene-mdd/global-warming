import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useT } from "../../lib/i18n";
import nitrousLocalData from "../../public/data/csvjson-nitrous.json";
import { nitrousService } from "../../services/dataService";

function Nitrous({ parentCallBack }) {
  const t = useT().charts;
  const [graphError, setGraphError] = useState("");
  const url = "/api/nitrous-oxide-api";
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    parentCallBack(true);

    const date = [];
    const amount = [];

    nitrousLocalData.forEach((obj) => {
      const parts = obj.year.split(",").filter((x) => x);
      date.push(parts[0]);

      const localValue = Number(parseFloat(parts[1]).toFixed(1));
      amount.push(Number.isFinite(localValue) ? localValue : null);
    });

    const parsedToObject = { date, amount };

    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
          displayNitrousGraph(parsedToObject, data);
          parentCallBack(false);
          nitrousService.setData(data.nitrous?.[data.nitrous.length - 1] ?? null);
        }
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

  const displayNitrousGraph = (
    cleanNitrousPrehistoricData,
    latestNitrousData
  ) => {
    const date = [];
    const average = [];

    try {
      if (!latestNitrousData?.nitrous || !canvasRef.current) return;

      latestNitrousData.nitrous.forEach((obj) => {
        date.push(obj.date);

        const liveValue = Number(obj.average);
        average.push(Number.isFinite(liveValue) ? liveValue : null);
      });

      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: cleanNitrousPrehistoricData.date.concat(date),
          datasets: [
            {
              label: t.nitrous,
              data: cleanNitrousPrehistoricData.amount.concat(average),
              fill: false,
              borderColor: "#FDB147",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              pointRadius: 1.5,
              pointHoverBorderWidth: 1,
              pointBackgroundColor: "rgba(255, 0, 0, 0.1)",
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
                text: t.nitrousAxis,
              },
            },
            x: {
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
        t.loadError
      );
    }
  };

  return (
    <>
      <Container className="chart-container">
        <canvas ref={canvasRef} id="myNitrousChart" />
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
              {t.nitrousAncientSource} United States, Environmental
              Protection Agency (EPA), (
              <a href="https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases">
                [https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases](https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases)
              </a>
              )
            </p>
            <p>
              <span>{t.nitrousModernSource} </span>Ed Dlugokencky, NOAA/GML (
              <a href="https://www.esrl.noaa.gov/gmd/ccgg/trends_n2o/">
                [https://www.esrl.noaa.gov/gmd/ccgg/trends_n2o/](https://www.esrl.noaa.gov/gmd/ccgg/trends_n2o/)
              </a>
              )
            </p>
            <p>
              <b> {t.nitrousMonthly}</b>
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
  parentCallBack: () => { },
};

export default Nitrous;