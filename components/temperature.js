import fetch from 'unfetch';
import Chart from 'chart.js';
import temperatureFile from '../public/data/csvjson-temperature.json'


class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatureData: {},
      aWarmingData: {}
    }
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
                borderColor: '#FF073A',
                backgroundColor: 'black',
                pointRadius: false,
                pointHoverBorderWidth: 7,
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
                pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointHoverBorderColor: 'black',
                borderWidth: 0.5,
                pointHoverRadius: 5
              }
            ]
          },
          options: {
            scales: {
              ticks: {
                suggestedMax: 800000,
                suggestedMin: -800000
              },
              yAxes: [{
                stacked: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Celsius'
                },
              }],
              xAxes: [{
                stacked: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Year'
                }
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
      <div onLoad={this.displayTempGraph(this.state.aWarmingData, this.state.temperatureData.result)}></div>

      {this.state.temperatureData ? <div>
        <div className="chart-container" >
          <canvas id="tempChart" ></canvas> </div>
       
          <footer className="ui center aligned column">
            <p>Source: GISTEMP Team, 2020: GISS Surface Temperature Analysis (GISTEMP), version 4. NASA Goddard Institute for Space Studies. Dataset accessed 20YY-MM-DD at <a href="https://data.giss.nasa.gov/gistemp/" target="_blank">https://data.giss.nasa.gov/gistemp/</a>.</p>
            <p>Source data 1880 - present: Lenssen, N., G. Schmidt, J. Hansen, M. Menne, A. Persin, R. Ruedy, and D. Zyss, 2019: Improvements in the GISTEMP uncertainty model. J. Geophys. Res. Atmos., 124, no. 12, 6307-6326, doi:10.1029/2018JD029522.</p>
            <p>Source data year 1 – 1979:  <a href="https://cmr.earthdata.nasa.gov/search/concepts/C1215197080-NOAA_NCEI" target="_blank">https://cmr.earthdata.nasa.gov/search/concepts/C1215197080-NOAA_NCEI</a></p>
          </footer>
     
      </div> : <div className="ui very padded center aligned segment column" style={{ margin: "35px 0 35px 0" }}>The graph is not available right now. Please try again later.</div>}
    </>);
  }
}


export default Temperature;

