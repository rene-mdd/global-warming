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


//   displayTempGraph = (tData) => {
//     function parsedTempData() {
//       const stateCopy = tData;
//       const dateArray = [];
//       const tempArray = [];
//       const landArray = [];

//       stateCopy.forEach(row => {
//         const date = row.time;
//         const station = row.station;
//         const land = row.land;
//         dateArray.push(date);
//         tempArray.push(parseFloat(station));
//         landArray.push(parseFloat(land));
//       });
//       return { dateArray, tempArray, landArray }

//     }

//     async function tempChart() {
//       try {
//         var ctx = 'tempChart';
//         const globalTemps = await parsedTempData();
//         const myChart = new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels: globalTemps.dateArray,
//             datasets: [
//               {
//                 label: '℃',
//                 data: globalTemps.tempArray,
//                 fill: false,
//                 borderColor: 'rgba(255, 99, 132, 1)',
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                 borderWidth: 1
//               }
//             ]
//           },
//           options: {}
//         });
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     tempChart()

//   }

  render() {
    
    
    console.log(this.state.arcticData)
    return (<div>
      <button >GET</button>
      <h1>Hello,</h1>
      <canvas id="tempChart" width="800" height="800"></canvas>
    </div>);
  }
}

export default Arctic;