import fetch from 'unfetch';
import Chart from 'chart.js';
import temperatureFile from '../public/data/csvjson-temperature.json'


class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperatureData: {},
    aWarmingData: {} }
    this.url = 'api/temperature-api';
    this.antiqueUrl = 'http://localhost:3000/pages/api/parse-data'
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  
  }
 
  async componentDidMount() {

    const date = [];
    const amount = [];
    temperatureFile.forEach((obj) => {
      date.push(obj.year.split(" ").filter(x => x)[0]);
      amount.push(parseFloat(obj.year.split(" ").filter(x => x)[1].slice(0, 5)));
    })

    const temperatureObject = { date: date, amount: amount };

    this.setState({ aWarmingData: temperatureObject });

    try {
      const response = await fetch(this.url)
      const data = await response.json();
      this.setState({ temperatureData: data })
    } catch (error) {
      console.log(error)
    }
  }


  displayTempGraph = (aWarmingData, temperatureLiveData) => {

    const date = [];
    const station = [];
  
      try {
        if (temperatureLiveData) {
        //transform api to arrays
        temperatureLiveData.forEach((obj) => {
          date.push(obj.time);
          station.push(obj.station);
        })
        //chart js
        var ctx = 'tempChart';
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: aWarmingData.date.concat(date),
            datasets: [
              {
                label: 'Temperature',
                data: aWarmingData.amount.concat(station),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'black',
                pointRadius: false,
                pointHoverBorderWidth: 7,
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
              text: 'Global temperature anomalies since year 1 to present'
            },
            scales: {
              ticks: {
                suggestedMax: 800000,
                suggestedMin: -800000
      },
              yAxes: [{
                stacked: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Hola'
                },
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
    console.log(this.state.temperatureData)
    console.log(this.state.aWarmingData)
    return (<>
      {!this.state.temperatureData ? <p>loading...</p> : 
      <div className="chart-container ui row" >
      <canvas id="tempChart" ></canvas> </div>}
      <div onLoad={this.displayTempGraph(this.state.aWarmingData, this.state.temperatureData.result)}></div>
    </>);
  }
}


export default Temperature;

