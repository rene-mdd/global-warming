// 'https://climate.nasa.gov/system/internal_resources/details/original/1929_Arctic_data_1979-2019.txt'

import fetch from 'unfetch';
import Chart from 'chart.js';

class Arctic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arcticData: [] }
    this.url = 'api/anual-mean-artic-loss';
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
    try {
      const response = await fetch(this.url)
      const data = await response.json();
      this.setState({ arcticData: data })
    } catch (error) {
      console.log(error)
    }
  }


  displayArcticGraph = (AData) => {
  console.log(AData)
      
      const yearArray = [];
      const extentArray = [];
      const areaArray = [];
      try {
        if(AData) {
        AData.forEach(row => {
          const date = row.year;
          const extent = row.extent;
          const area = row.area;
          yearArray.push(date);
          extentArray.push(parseFloat(extent));
          areaArray.push(parseFloat(area));
        })}
        var ctx = 'arcticChart';
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: yearArray,
            datasets: [
              {
                label: 'Extent',
                data: extentArray,
                fill: false,
                borderColor: 'rgba(44, 130, 201, 1)',
                borderWidth: 1
              },
              {
                  label: 'Area',
                  data: areaArray,
                  fill: false,
                  borderColor: 'rgba(137, 196, 244, 1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio : false,
            title: {
              display: true,
              text: 'Global temperature anomalies since year 1 to present'
            },
            scales: {
              yAxes: [{
                stacked: false,
                scaleLabel: {
                  display: true,
                  labelString: 'Million square km'
                },
            }],
            xAxes: [{
              stacked: false,
              scaleLabel: {
                display: true,
                labelString: 'Year'
              },
            }],
          }
          }
        });
      } catch (error) {
        console.log(error)
      }

  }

  render() {
    console.log(this.state.arcticData)
    return (<>
      <button onClick={this.displayArcticGraph(this.state.arcticData.result)}>GET</button>
      <h1>Hello, arctic</h1>
      <div className="chart-container" >
      <canvas id="arcticChart"></canvas>
      </div>
      </>);
  }
}

export default Arctic;