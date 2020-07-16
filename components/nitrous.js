import fetch from 'unfetch';
import Chart from 'chart.js';
import nitrousData from "../public/data/csvjson-nitrous.json"
const csv=require('csvtojson')

class Nitrous extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nitrousData: {},
    prehistoricNitrous: {} }
    this.url = "api/nitrous-oxide-api";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
  
    console.log(nitrousData)
    const date = [];
    const amount = [];
   
    nitrousData.forEach((obj) => {
      date.push(obj.year.split(",").filter(x => x)[0]);
      amount.push(parseFloat(obj.year.split(",").filter(x => x)[1]).toFixed(1));
    })

    const nitrousObject = { date: date, amount: amount }

    this.setState({ prehistoricNitrous: nitrousObject })

     try {
      const response = await fetch(this.url)
      const data = await response.json();
      this.setState({ nitrousData: data })
    } catch (error) {
      console.log(error)
    }
  }

 parsedNitrousData = (cleanNitrousPrehistoricData, cleanNitrousData) => {
 
  try {
    var ctx = 'myNitrousChart';
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...cleanNitrousPrehistoricData.date, ...cleanNitrousData.date],
        datasets: [
          {
            label: 'Nitrous Oxide',
            data: [...cleanNitrousPrehistoricData.amount, ...cleanNitrousData.average],
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
          text: 'Nitrous oxide levels from 800,000 years ago to present'
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
    console.log(this.state.nitrousData)
    console.log(this.state.prehistoricNitrous)
    return (<div>
      {/* <button onClick={this.nitrousData(this.state.nitrousData)}>GET</button> */}
      <button  onClick={this.parsedNitrousData(this.state.prehistoricNitrous, this.state.nitrousData)}>Antique GET</button>
      <h1>Hello,</h1>
      <canvas id="myNitrousChart" width="800" height="800"></canvas>
      
    </div>);
  }
}


export default Nitrous;


