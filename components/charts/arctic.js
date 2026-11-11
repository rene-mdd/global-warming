import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useT } from "../../lib/i18n";
import { arcticService } from "../../services/dataService";

function Arctic({ parentCallBack }) {
  const t = useT().charts;
  const url = "/api/arctic-api";
  const [graphError, setGraphError] = useState("");
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    parentCallBack(true);

    async function fetchArcticData() {
      try {
        const response = await fetch(url);
        const { arcticData } = await response.json();

        if (arcticData?.data) {
          displayArcticGraph(arcticData.data);
          parentCallBack(false);
        }
      } catch (error) {
        console.error(error);
        setGraphError(
          t.dataError
        );
      }
    }

    fetchArcticData();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  const displayArcticGraph = (arcticData) => {
    const amount = [];
    const year = [];

    try {
      if (!arcticData || !canvasRef.current) return;

      const filterArcticData = {};

      Object.keys(arcticData)
        .filter((objKey) => objKey !== "198712" && objKey !== "198801")
        .forEach((key) => {
          filterArcticData[key] = arcticData[key];
        });

      for (const [key, squareKm] of Object.entries(filterArcticData)) {
        amount.push(squareKm.value);
        year.push(`${key.slice(0, 4)}.${key.slice(-2)}`);
      }

      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: year,
          datasets: [
            {
              label: t.extent,
              borderColor: "rgba(44, 130, 201, 1)",
              data: amount,
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              stacked: false,
              suggestedMax: 30,
              suggestedMin: 10,
              title: {
                display: true,
                text: t.millionKm2,
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

      arcticService.setData(amount[amount.length - 1] ?? null);
    } catch (error) {
      console.error(error);
      setGraphError(
        t.loadErrorArctic
      );
    }
  };

  return (
    <>
      <Container className="chart-container">
        <canvas ref={canvasRef} id="arcticChart" />
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
              <span>{t.title}</span> {t.arcticTitle}
            </p>
            <p>
              <span>{t.basePeriod}</span> 1991-2020
            </p>
            <p>
              <span>{t.dataSource}</span> National Centers for Environmental
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
  parentCallBack: () => {},
};

export default Arctic;