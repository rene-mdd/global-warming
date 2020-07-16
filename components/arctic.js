// 'https://climate.nasa.gov/system/internal_resources/details/original/1929_Arctic_data_1979-2019.txt'

import fetch from 'unfetch';
import Chart from 'chart.js';

class Arctic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arcticData: [] }
    this.url = 'http://localhost:3000/api/anual-mean-artic-loss';
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
  
      const stateCopy = AData;
      const yearArray = [];
      const extentArray = [];
      const areaArray = [];
      try {
        stateCopy.forEach(row => {
          const date = row.year;
          const extent = row.extent;
          const area = row.area;
          yearArray.push(date);
          extentArray.push(parseFloat(extent));
          areaArray.push(parseFloat(area));
        });
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
          options: {}
        });
      } catch (error) {
        console.log(error)
      }

   

  }

  render() {
    console.log(this.state.arcticData)
    return (<div>
      <button onClick={this.displayArcticGraph(this.state.arcticData.result)}>GET</button>
      <h1>Hello, arctic</h1>
      <canvas id="arcticChart" width="800" height="800"></canvas>
      {/* <iframe src="http://energyatlas.iea.org/embed.jsp?subject=1378539487&lang=en" frameborder="0" height="800" scrolling="no" width="800"></iframe>     */}
      </div>);
  }
}

export default Arctic;