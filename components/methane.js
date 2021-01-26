/* eslint-disable react/destructuring-assignment */
import React from "react";
import fetch from "unfetch";
import Chart from "chart.js";
import { Container, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import methaneDataFile from "../public/data/csvjson-methane.json";

class Methane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      methaneData: {},
      prehistoricMethane: {},
      isLoading: true,
      graphError: "",
    };
    this.url = "api/methane-api";
  }

  async componentDidMount() {
    const { isLoading } = this.state;
    this.props.loadingMethaneCallback(isLoading);

    // processing of json file
    const date = [];
    const amount = [];

    methaneDataFile.forEach((obj) => {
      date.push(obj.year.split(",").filter((x) => x)[0]);
      amount.push(
        Number(parseFloat(obj.year.split(",").filter((x) => x)[1]).toFixed(1))
      );
    });
    const methaneObject = { date, amount };

    this.setState({ prehistoricMethane: methaneObject });

    try {
      const response = await fetch(this.url);
      const data = await response.json();
      if (data) {
        this.setState({ methaneData: data, isLoading: false });
        this.props.loadingMethaneCallback(false);
      }
    } catch (error) {
      // console.log(error)
      this.setState({
        graphError:
          "There was an error trying to get the graph data. Please refer to our contact form and report it. Thank you.",
      });
    }
  }

  parsedData = (methPrehistoricData, methaneData) => {
    const date = [];
    const average = [];
    try {
      if (methaneData.methane) {
        methaneData.methane.forEach((obj) => {
          date.push(obj.date);
          average.push(obj.average);
        });
        const ctx = document.getElementById("myMethChart");
        (() =>
          new Chart(ctx, {
            type: "line",
            data: {
              labels: methPrehistoricData.date.concat(date),
              datasets: [
                {
                  label: "Methane",
                  data: methPrehistoricData.amount.concat(average),
                  fill: false,
                  borderColor: "#A75E09",
                  backgroundColor: "rgba(255, 0, 0, 0.1);",
                  pointRadius: 0.5,
                  pointHoverBorderWidth: 1,
                  pointBackgroundColor: "rgba(255, 0, 0, 0.1);",
                  pointHoverBackgroundColor: "white",
                  pointHoverBorderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                  pointHoverRadius: 10,
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
      methaneData,
      prehistoricMethane,
      isLoading,
      graphError,
    } = this.state;
    return (
      <>
        <div onLoad={this.parsedData(prehistoricMethane, methaneData)} />

        <Container
          className="chart-container"
          style={{ position: "relative", width: "80vw" }}
        >
          <canvas id="myMethChart" />
        </Container>
        <Grid width="equal" centered>
          <Grid.Column width="fourteen">
            {!isLoading && (
              <Container as="footer">
                <p>
                  <span style={{ color: "#FD4659" }}>{graphError}</span>
                </p>
                <p>
                  Year 1983 to present data source: Global Monitoring Division
                  of NOAA’s Earth System Research Laboratory Ed Dlugokencky,
                  NOAA/GML (
                  <a
                    href="www.esrl.noaa.gov/gmd/ccgg/trends_ch4/"
                    target="_blank"
                  >
                    <em> www.esrl.noaa.gov/gmd/ccgg/trends_ch4/</em>
                  </a>
                  ).
                </p>
                <p>
                  Data 800,000 years ago to 1983 source: United States,
                  Environmental Protection Agency (EPA), (
                  <a href="https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases">
                    <em>
                      https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases
                    </em>
                  </a>
                  )
                </p>
                <p>
                  <b>From 1983.07 this data is measured on a monthly basis</b>
                </p>
              </Container>
            )}
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

Methane.propTypes = {
  loadingMethaneCallback: PropTypes.func,
};

Methane.defaultProps = {
  loadingMethaneCallback: true,
};

export default Methane;
