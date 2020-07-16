// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
import preCo2Data from '../public/data/csvjson-co2.json'
// import axios from "axios"



// const fetcher = url => fetch(url).then(r => r.json());
class Co2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { co2Data: {},
    prehistoric: {} }
    this.url = "api/co2-api";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
    // processing of json file
    console.log(preCo2Data)
    const date = [];
    const amount = [];
   
    preCo2Data.forEach((obj) => {
      date.push(obj.year.split(",").filter(x => x)[0]);
      amount.push(parseFloat(obj.year.split(",").filter(x => x)[1]).toFixed(1));
    })
    const co2Object = { date: date, amount: amount }

    this.setState({ prehistoric: co2Object })

    try {
      const response = await fetch(this.url)
      const data = await response.json();
      this.setState({ co2Data: data })
    } catch (error) {
      console.log(error)
    }
  }

  parseCo2Data = (co2PrehistoricData, co2LiveData) => {
    
    
    try {
      var ctx = 'myCo2Chart';
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...co2PrehistoricData.date, ...co2LiveData.date],
          datasets: [
            {
              label: 'Co2',
              data: [...co2PrehistoricData.amount, ...co2LiveData.average],
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
            text: 'Co2 levels from 800,000 years ago to present'
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
  console.log(this.state.co2Data)
    return (<div>
      <button onClick={this.parseCo2Data(this.state.prehistoric, this.state.co2Data)}>GET</button>
      {/* <button  onClick={this.prehistoricData(this.state.prehistoric)}>Antique GET</button> */}
      <h1>Hello,</h1>
      <canvas id="myCo2Chart" width="800" height="800"></canvas>
      
    </div>);
  }
}


export default Co2;


   // function parsedTempData() {
    //   const stateCopy = temperatureData;
    //   const dateArray = [];
    //   const tempArray = [];
    //   const landArray = [];

    //   stateCopy.forEach(row => {
    //     const date = row.time;
    //     const station = row.station;
    //     const land = row.land;
    //     dateArray.push(date);
    //     tempArray.push(parseFloat(station));
    //     landArray.push(parseFloat(land));
    //   });
      // return { dateArray, tempArray, landArray }
    // }