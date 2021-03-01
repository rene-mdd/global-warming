/* eslint-disable react/destructuring-assignment */
import React from "react";
import fetch from "unfetch";
import Chart from "chart.js";
import { Container, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import localCo2Data from "../public/data/csvjson-co2.json";

class Co2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestCo2Data: [],
      prehistoricData: {},
      isLoading: true,
      graphError: "",
    };
    this.url = "api/co2-api";
  }

  async componentDidMount() {
    const { isLoading } = this.state;
    this.props.loadingCo2Callback(isLoading);

    const date = [];
    const amount = [];
    localCo2Data.forEach((obj) => {
      date.push(obj.year.split(",").filter((x) => x)[0]);
      amount.push(
        Number(parseFloat(obj.year.split(",").filter((x) => x)[1]).toFixed(1))
      );
    });
    const parsedToObject = { date, amount };
    this.setState({ prehistoricData: parsedToObject });
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      if (data) {
        this.setState({ latestCo2Data: data, isLoading: false });
        this.props.loadingCo2Callback(false);
      }
    } catch (error) {
      // console.log(error)
      this.setState({
        graphError:
          "There was an error trying to get the graph data. Please refer to our contact form and report it. Thank you.",
      });
    }
  }

  parsedCo2Data = (prehistoricData, latestCo2Data) => {
    const date = [];
    const amount = [];
    try {
      if (latestCo2Data.co2) {
        latestCo2Data.co2.forEach((obj) => {
          date.push(`${obj.year}.${obj.month}.${obj.day}`);
          amount.push(obj.trend);
        });
        const ctx = document.getElementById("myCo2Chart");
        (() =>
          new Chart(ctx, {
            type: "line",
            data: {
              labels: prehistoricData.date.concat(date),
              datasets: [
                {
                  label: "Carbon Dioxide",
                  data: prehistoricData.amount.concat(amount),
                  fill: false,
                  borderColor: "#4984B8",
                  backgroundColor: "black",
                  pointRadius: false,
                  pointHoverBorderWidth: 10,
                  pointBackgroundColor: "rgba(255, 99, 132, 1)",
                  pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
                  pointHoverBorderColor: "black",
                  borderWidth: 1,
                  pointHoverRadius: 5,
                },
              ],
            },
            options: {
              scales: {
                bounds: "ticks",
                ticks: {
                  suggestedMax: 800000,
                  suggestedMin: -800000,
                },
                yAxes: [
                  {
                    stacked: true,
                    scaleLabel: {
                      display: true,
                      labelString: "Part Per million (ppm)",
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
      // console.log(error)
      this.setState({
        graphError:
          "There was an error trying to load the graph. Please refer to our contact form and report it. Thank you.",
      });
    }
  };

  render() {
    const {
      isLoading,
      latestCo2Data,
      prehistoricData,
      graphError,
    } = this.state;
    return (
      <>
        <div onLoad={this.parsedCo2Data(prehistoricData, latestCo2Data)} />

        <Container className="chart-container">
          <canvas id="myCo2Chart" />
          <Grid centered columns="equal">
            <Grid.Column width="14" fluid="true">
              {!isLoading && (
                <Container as="footer">
                  <p>
                    <span style={{ color: "#FD4659" }}>{graphError}</span>
                  </p>
                  <p>
                    From 1958, the measurements of carbon dioxide concentrations
                    are done by Mauna Loa Observatory. Source: Ed Dlugokencky
                    and Pieter Tans, NOAA/GML (
                    <a href="https://www.esrl.noaa.gov/gmd/ccgg/trends/">
                      <em> https://www.esrl.noaa.gov/gmd/ccgg/trends/</em>
                    </a>
                    )
                  </p>
                  <p>
                    Data source: 800,000 years ago to 1958
                    <a href="https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases">
                      <em>
                        {" "}
                        https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases
                      </em>
                    </a>
                  </p>
                  <p>
                    <b>
                      From 2010.01.01 the data is measured on a quasi daily
                      basis
                    </b>
                  </p>
                </Container>
              )}
            </Grid.Column>
          </Grid>
        </Container>
      </>
    );
  }
}

Co2.propTypes = {
  loadingCo2Callback: PropTypes.func,
};

Co2.defaultProps = {
  loadingCo2Callback: true,
};

export default Co2;
