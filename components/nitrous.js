import fetch from 'unfetch';
import Chart from 'chart.js';
import nitrousData from '../public/data/csvjson-nitrous.json';
import { Container, Grid } from 'semantic-ui-react';
import PropTypes from "prop-types";

class Nitrous extends React.Component {
  constructor (props) {
    super(props);
    this.state = { nitrousData: {}, prehistoricNitrous: {}, isLoading: true };
    this.url = 'api/nitrous-oxide-api';
  }

  async componentDidMount () {
    this.props.callBackPropNitrous(this.state.isLoading);
    const date = [];
    const amount = [];

    nitrousData.forEach(obj => {
      date.push(obj.year.split(',').filter(x => x)[0]);
      amount.push(parseFloat(obj.year.split(',').filter(x => x)[1]).toFixed(1));
    });

    const nitrousObject = { date: date, amount: amount };

    this.setState({ prehistoricNitrous: nitrousObject });

    try {
      const response = await fetch(this.url);
      const data = await response.json();
      if (data) {
        this.setState({ nitrousData: data, isLoading: false });
        this.props.callBackPropNitrous(this.state.isLoading);
      }
    } catch (error) {
      console.log(error);
    }
  }

  goNitrous = isLoading => {
    this.props.callBackPropNitrous(isLoading);
  }

  parsedNitrousData = (cleanNitrousPrehistoricData, cleanNitrousData) => {
    const date = [];
    const average = [];
    try {
      if (cleanNitrousData.nitrous) {
        cleanNitrousData.nitrous.forEach(obj => {
          date.push(obj.date);
          average.push(obj.average);
        });
        var ctx = document.getElementById("myNitrousChart");
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: cleanNitrousPrehistoricData.date.concat(date),
            datasets: [
              {
                label: 'Nitrous Oxide',
                data: cleanNitrousPrehistoricData.amount.concat(average),
                fill: false,
                borderColor: '#FDB147',
                backgroundColor: 'rgba(255, 0, 0, 0.1);',
                pointRadius: 1.5,
                pointHoverBorderWidth: 1,
                pointBackgroundColor: 'rgba(255, 0, 0, 0.1);',
                pointHoverBackgroundColor: 'white',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                pointHoverRadius: 10
              }
            ]
          },
          options: {
            scales: {
              bounds: 'ticks',
              ticks: {
                suggestedMax: 800000,
                suggestedMin: -800000
              },
              yAxes: [
                {
                  stacked: false,
                  scaleLabel: {
                    display: true,
                    labelString: 'Nitrous Oxide mole fraction (ppb)'
                  }
                }
              ],
              xAxes: [
                {
                  stacked: false,
                  scaleLabel: {
                    display: true,
                    labelString: 'Year'
                  },
                  ticks:{
                  maxRotation: 90}
                }
              ]
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render () {
    return (
      <>
        <div
          onLoad={this.parsedNitrousData(
            this.state.prehistoricNitrous,
            this.state.nitrousData
          )}
        />
        <div
          onLoad={() => {
            this.goNitrous(this.state.isLoading);
          }}
        />

        
          <Container
            className='chart-container'
            style={{ position: 'relative', width: '80vw' }}
          >
            <canvas id='myNitrousChart'></canvas>
          </Container>
          <Grid width='equal' centered>
            <Grid.Column width='14'>
          {!this.state.isLoading && (
            <Container as='footer'>
              <p>Data 800,000 ago to 2001 source: United States, Environmental Protection Agency (EPA), (<a href='https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases'>https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases</a>) </p>
              <p>
              Ed Dlugokencky, NOAA/GML (<a href='www.esrl.noaa.gov/gmd/ccgg/trends_n2o/'>www.esrl.noaa.gov/gmd/ccgg/trends_n2o/</a>)</p>
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
  callBackPropNitrous: PropTypes.func,
};

export default Nitrous;
