// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
import methaneDataFile from '../public/data/csvjson-methane.json'
import {Container} from 'semantic-ui-react';

// import axios from "axios"



// const fetcher = url => fetch(url).then(r => r.json());
class Methane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      methaneData: {},
      prehistoricMethane: {},
      isLoading: true
    }
    this.url = "api/methane-api";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
    this.props.callBackPropMethane(this.state.isLoading)
    // processing of json file
    const date = [];
    const amount = [];
   
    methaneDataFile.forEach((obj) => {
      date.push(obj.year.split(",").filter(x => x)[0]);
      amount.push(Number(parseFloat(obj.year.split(",").filter(x => x)[1]).toFixed(1)));
    })
    const methaneObject = { date: date, amount: amount }

    this.setState({ prehistoricMethane: methaneObject })


    try {
      const response = await fetch(this.url)
      const data = await response.json();
      if (data){
      this.setState({ methaneData: data, isLoading: false })
      this.props.callBackPropMethane(false)}
    } catch (error) {
      console.log(error)
    }
  }

  go = (isLoading) => {
    this.props.callBackPropMethane(isLoading)
  } 

   parsedData = (methPrehistoricData, methaneData) => {
     const date = [];
     const average = [];
      try {
        if (methaneData.methane) {
        methaneData.methane.forEach((obj) => {
        date.push(obj.date);
        average.push(obj.average)
        })
        var ctx = 'myMethChart';
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: methPrehistoricData.date.concat(date),
            datasets: [
              {
                label: 'Methane',
                data: methPrehistoricData.amount.concat(average),
                fill: false,
                borderColor: '#A75E09',
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
    console.log(this.state.methaneData)
    console.log(this.state.prehistoricMethane)
    return (<>
      <div onLoad={this.parsedData(this.state.prehistoricMethane, this.state.methaneData)}/>
      <div onLoad={() => {this.go(this.state.isLoading)}}/>
      <div className="chart-container ui row">
      <canvas id="myMethChart" ></canvas>
      <Container as="footer" className="ui center aligned column" style={{ marginTop: "-5px" }}>
      {!this.state.isLoading &&  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              </p>}
              </Container>
      </div>
    </>);
  }
}


export default Methane;


