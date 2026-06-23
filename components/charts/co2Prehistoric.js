import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import localCo2Data from "../../public/data/csvjson-co2-prehistoric.json";

function Co2Prehistoric({ parentCallBackPrehist }) {
  const [graphError, setGraphError] = useState("");
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    parentCallBackPrehist(true);

    const date = [];
    const amount = [];

    localCo2Data.forEach((obj) => {
      const parts = obj.year.split(",").filter((x) => x);
      date.push(parts[0]);

      const localValue = Number(parseFloat(parts[1]).toFixed(1));
      amount.push(Number.isFinite(localValue) ? localValue : null);
    });

    const parsedPrehistoricData = { date, amount };
    displayCo2Graph(parsedPrehistoricData);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  const displayCo2Graph = (prehistoricData) => {
    try {
      if (!prehistoricData || !canvasRef.current) return;

      parentCallBackPrehist(false);

      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: prehistoricData.date,
          datasets: [
            {
              label: "Carbon Dioxide",
              data: prehistoricData.amount,
              fill: false,
              borderColor: "#4984B8",
              backgroundColor: "black",
              pointRadius: 0,
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
              stacked: false,
              title: {
                display: true,
                text: "Part Per million (ppm)",
              },
            },
            x: {
              stacked: false,
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
      });
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
        <canvas ref={canvasRef} id="myPrehistoricCo2Chart" />
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
              Data source: 800,000 years ago to 2021
              <a href="https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases">
                <em>
                  {" "}
                  [https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases](https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases)
                </em>
              </a>
            </p>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

Co2Prehistoric.propTypes = {
  parentCallBackPrehist: PropTypes.func,
};

Co2Prehistoric.defaultProps = {
  parentCallBackPrehist: () => {},
};

export default Co2Prehistoric;