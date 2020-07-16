// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
import methaneData from '../public/data/csvjson-methane.json'
const csv = require('csvtojson')

// import axios from "axios"



// const fetcher = url => fetch(url).then(r => r.json());
class Methane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      methaneData: {},
      prehistoricMethane: {}
    }
    this.url = "api/methane-api";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
    // processing of json file
    const date = [];
    const amount = [];
   
    methaneData.forEach((obj) => {
      date.push(obj.year.split(",").filter(x => x)[0]);
      amount.push(parseFloat(obj.year.split(",").filter(x => x)[1]).toFixed(1));
    })
    const methaneObject = { date: date, amount: amount }

    this.setState({ prehistoricMethane: methaneObject })


    try {
    
      const response = await fetch(this.url)
      const data = await response.json();
      this.setState({ methaneData: data })
    } catch (error) {
      console.log(error)
    }

    
  }


   parsedData = (methPrehistoricData, methaneData) => {
    
    
      try {
        var ctx = 'myMethChart';
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [...methPrehistoricData.date, ...methaneData.date],
            datasets: [
              {
                label: 'Methane',
                data: [...methPrehistoricData.amount, ...methaneData.average],
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
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
            title: {
              display: true,
              text: 'Methane levels from 800,000 years ago to present'
            },
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
        });
      } catch (error) {
        console.log(error)
      }
    }




  render() {
    console.log(this.state.methaneData)
    console.log(this.state.prehistoricMethane)
    return (<div>
      <button onClick={this.parsedData(this.state.prehistoricMethane, this.state.methaneData)}>GET</button>
      {/* <button  onClick={this.prehistoricData(this.state.prehistoric)}>Antique GET</button> */}
      <h1>Hello,</h1>
      <div>
      <canvas id="myMethChart" width="800" height="800"></canvas>
      </div>
    </div>);
  }
}


export default Methane;


