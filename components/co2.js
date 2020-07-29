// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
import preCo2Data from '../public/data/csvjson-co2.json'
import {Container} from 'semantic-ui-react';

class Co2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      co2Data: [],
      prehistoric: {},
      isLoading: true
    }
    this.url = "api/co2-api";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
    console.log(this.state.co2Data)
  }

  async componentDidMount() {
    this.props.callBackPropCo2(this.state.isLoading)

    const date = [];
    const amount = [];
    preCo2Data.forEach((obj) => {
      date.push(obj.year.split(",").filter(x => x)[0]);
      amount.push(Number(parseFloat(obj.year.split(",").filter(x => x)[1]).toFixed(1)));
    })

    const co2Object = { date: date, amount: amount }

    this.setState({ prehistoric: co2Object })

    try {
      const response = await fetch(this.url)
      const data = await response.json();
      if (data){
    this.setState({co2Data: data, isLoading: false})
    this.props.callBackPropCo2(this.state.isLoading)
    }
    } catch (error) {
      console.log(error)
    }
  }

  goCo2 = (isLoading) => {
    this.props.callBackPropCo2(isLoading)
  } 
  

  parsedCo2Data = (prehistoricData, currentData) => {
    const date = [];
    const trend = [];
    try {
      if (currentData.co2) {
        currentData.co2.forEach((obj) => {
          date.push(`${obj.year}.${obj.month}.${obj.day}`);
          trend.push(obj.trend);
        })
      var ctx = 'myCo2Chart';
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: prehistoricData.date.concat(date),
          datasets: [
            {
              label: 'Carbon Dioxide',
              data: prehistoricData.amount.concat(trend),
              fill: false,
              borderColor: '#4984B8',
              backgroundColor: 'black',
              pointRadius: false,
              pointHoverBorderWidth: 10,
              pointBackgroundColor: "rgba(255, 99, 132, 1)",
              pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
              pointHoverBorderColor: 'black',
              borderWidth: 1,
              pointHoverRadius: 5
            }
          ]
        },
        options: {
          scales: {
            bounds: 'ticks',
            ticks: {
              suggestedMax: 800000,
              suggestedMin: -800000,
              stepSize: 2
            },
            yAxes: [{
              stacked: true
            }],
            xAxes: [{
              stacked: true
            }],
          }
        }
      })
    }
    } catch (error) {
      console.log(error)
    }

  }

  render() {
    console.log(this.state.prehistoric)
    console.log(this.state.co2Data)
    return (<>
      <div onLoad={this.parsedCo2Data(this.state.prehistoric, this.state.co2Data)}/>
      <div onLoad={() => {this.goCo2(this.state.isLoading)}}/>
      <div className="chart-container">
      <canvas id="myCo2Chart" ></canvas>
      <Container as="footer" className="ui center aligned column" style={{ marginTop: "-25px" }}>
      {!this.state.isLoading &&  <p>This graph represents the Co2 concentration levels in the atmosphere. From 1958, the measurements are done on a quasi daily basis by Mauna Loa Observatory.
          Source: Ed Dlugokencky and Pieter Tans, NOAA/GML (<a href="https://www.esrl.noaa.gov/gmd/ccgg/trends/" target="_blank">https://www.esrl.noaa.gov/gmd/ccgg/trends/</a>)
              </p>}
              </Container>
      </div>
    </>);
  }
}


export default Co2;


