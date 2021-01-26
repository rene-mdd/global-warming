/* eslint-disable react/destructuring-assignment */
import React from "react";
import fetch from "unfetch";
import Chart from "chart.js";
import { Container, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import nitrousLocalData from "../public/data/csvjson-nitrous.json";

class Nitrous extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nitrousData: {},
      prehistoricNitrous: {},
      isLoading: true,
      graphError: "",
    };
    this.url = "api/nitrous-oxide-api";
  }

  async componentDidMount() {
    const { isLoading } = this.state;
    this.props.loadingNitrousCallback(isLoading);

    const date = [];
    const amount = [];

    nitrousLocalData.forEach((obj) => {
      date.push(obj.year.split(",").filter((x) => x)[0]);
      amount.push(
        parseFloat(obj.year.split(",").filter((x) => x)[1]).toFixed(1)
      );
    });

    const nitrousObject = { date, amount };

    this.setState({ prehistoricNitrous: nitrousObject });

    try {
      const response = await fetch(this.url);
      const data = await response.json();
      if (data) {
        this.setState({ nitrousData: data, isLoading: false });
        this.props.loadingNitrousCallback(false);
      }
    } catch (error) {
      // console.log(error)
      this.setState({
        graphError:
          "There was an error trying to get the graph data. Please refer to our contact form and report it. Thank you.",
      });
    }
  }

  parsedNitrousData = (cleanNitrousPrehistoricData, cleanNitrousData) => {
    const date = [];
    const average = [];
    try {
      if (cleanNitrousData.nitrous) {
        cleanNitrousData.nitrous.forEach((obj) => {
          date.push(obj.date);
          average.push(obj.average);
        });
        const ctx = document.getElementById("myNitrousChart");
        (() =>
          new Chart(ctx, {
            type: "line",
            data: {
              labels: cleanNitrousPrehistoricData.date.concat(date),
              datasets: [
                {
                  label: "Nitrous Oxide",
                  data: cleanNitrousPrehistoricData.amount.concat(average),
                  fill: false,
                  borderColor: "#FDB147",
                  backgroundColor: "rgba(255, 0, 0, 0.1);",
                  pointRadius: 1.5,
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
                    stacked: false,
                    scaleLabel: {
                      display: true,
                      labelString: "Nitrous Oxide mole fraction (ppb)",
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
      graphError,
      prehistoricNitrous,
      nitrousData,
      isLoading,
    } = this.state;
    return (
      <>
        <div onLoad={this.parsedNitrousData(prehistoricNitrous, nitrousData)} />

        <Container
          className="chart-container"
          style={{ position: "relative", width: "80vw" }}
        >
          <canvas id="myNitrousChart" />
        </Container>
        <Grid width="equal" centered>
          <Grid.Column width="14">
            {!isLoading && (
              <Container as="footer">
                <p>
                  <span style={{ color: "#FD4659" }}>{graphError}</span>
                </p>
                <p>
                  Data 800,000 ago to 2001 source: United States, Environmental
                  Protection Agency (EPA), (
                  <a href="https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases">
                    https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases
                  </a>
                  )
                </p>
                <p>
                  Ed Dlugokencky, NOAA/GML (
                  <a href="www.esrl.noaa.gov/gmd/ccgg/trends_n2o/">
                    www.esrl.noaa.gov/gmd/ccgg/trends_n2o/
                  </a>
                  )
                </p>
                <p>
                  <b> From 2001.01 the data is measured on a monthly basis</b>
                </p>
              </Container>
            )}
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

Nitrous.propTypes = {
  loadingNitrousCallback: PropTypes.func,
};

Nitrous.defaultProps = {
  loadingNitrousCallback: true,
};

export default Nitrous;
