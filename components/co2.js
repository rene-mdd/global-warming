// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
import preCo2Data from '../public/data/csvjson-co2.json'

class Co2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      co2Data: [],
      prehistoric: {}
    }
    this.url = "api/co2-api";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {

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
    this.setState({co2Data: data})
    } catch (error) {
      console.log(error)
    }
  }


  parsedCo2Data = (prehistoricData, currentData) => {
    try {
      if (currentData.co2) {
      var ctx = 'myCo2Chart';
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: prehistoricData.date.concat(currentData.date),
          datasets: [
            {
              label: 'Carbon Dioxide',
              data: prehistoricData.amount.concat(currentData.trend),
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
            text: 'Carbon dioxide levels from 800,000 years ago to present'
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
      })
    }
    } catch (error) {
      console.log(error)
    }

  }

  render() {
    console.log(this.state.prehistoric)
    console.log(this.state.co2Data)
    return (<div>
      <button onClick={this.parsedCo2Data(this.state.prehistoric, this.state.co2Data)}>GET</button>
      {/* <button  onClick={this.prehistoricData(this.state.prehistoric)}>Antique GET</button> */}
      <h1>Hello,</h1>
      <div className="chart-container" style={{ position: 'relative', width:'80vw'}}>
      <canvas id="myCo2Chart" width="800" height="800"></canvas>
      </div>

    </div>);
  }
}


export default Co2;


