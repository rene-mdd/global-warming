import fetch from 'unfetch';
import Chart from 'chart.js';
// import fs from 'fs'
// import path from 'path'


class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperatureData: [],
    aWarmingData: [] }
    this.url = 'http://localhost:3000/api/mth-mean-surface-temp';
    this.antiqueUrl = 'http://localhost:3000/pages/api/parse-data'
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  
  }
 
  async componentDidMount() {

  
  }


  // displayTempGraph = (tData) => {
  //   function parsedTempData() {
  //     const stateCopy = tData;
  //     const dateArray = [];
  //     const tempArray = [];
  //     const landArray = [];

  //     stateCopy.forEach(row => {
  //       const date = row.time;
  //       const station = row.station;
  //       const land = row.land;
  //       dateArray.push(date);
  //       tempArray.push(parseFloat(station));
  //       landArray.push(parseFloat(land));
  //     });
  //     return { dateArray, tempArray, landArray }

  //   }

  //   async function tempChart() {
  //     try {
  //       var ctx = 'tempChart';
  //       const globalTemps = await parsedTempData();
  //       const myChart = new Chart(ctx, {
  //         type: 'line',
  //         data: {
  //           labels: globalTemps.dateArray,
  //           datasets: [
  //             {
  //               label: '℃',
  //               data: globalTemps.landArray,
  //               fill: false,
  //               borderColor: 'rgba(255, 99, 132, 1)',
  //               backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //               borderWidth: 1
  //             }
  //           ]
  //         },
  //         options: {}
  //       });
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   tempChart()

  // }

  render() {
    console.log(this.props)
    console.log(this.state.temperatureData)
    return (<div>
      {/* <button onClick={this.displayTempGraph(this.state.temperatureData.result)}>GET</button> */}
      <h1>Hello,</h1>
      {/* <canvas id="tempChart" width="800" height="800"></canvas> */}
    </div>);
  }
}


// export async function getStaticProps() {

//   const warmingAntiqueFile = path.join(process.cwd(), '../public/data/clear-data-1979.json')
//  fs.readdirSync(warmingAntiqueFile, { encoding: 'utf-8' }, function(err, data){
//       var array = [];
//       if (!err) {
//          const parsedData = JSON.parse(data)
//          console.log(parsedData)
          
//           for (var i = 0; i < 1979; i++) {
//               const time = parsedData[i].split(" ")[0];
//               const temperature = parsedData[i].split(" ")[3] ? parsedData[i].split(" ")[3] : parsedData[i].split(" ")[4];
//               console.log(temperature)
//               const land = temperature.slice(0, 5);
            
//               array[i] = { time, land }
//           }
//           array.splice(0, 1);
//           return {props: array}
       
//       } else {
//           console.log(err);
//       }

//   })
      
//   return {props: array}
// }


export default Temperature;

