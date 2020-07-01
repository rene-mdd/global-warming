// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
import axios from "axios"



class Antarctica extends React.Component {
  constructor(props) {
    super(props);
    this.state = { antarcticaData: "" }
    this.url = 'https://podaac-tools.jpl.nasa.gov/drive/files/allData/tellus/L4/ice_mass/RL06/v02/mascon_CRI/antarctica_mass_200204_202004.txt';
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
    try {
      const response = await axios.get(this.url)
      const data = await response.text();
      this.setState({ antarcticaData: response })
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
    console.log(this.state.antarcticaData)
    return (<div>
      <button >GET</button>
      <h1>Hello,</h1>
      <iframe width="670" height="490" frameBorder="0" src="https://my.gfw-mapbuilder.org/v1.latest/?appid=e53c3a031fa6479ab09ef9171ee91c03"></iframe>
      <canvas id="tempChart" width="400" height="400"></canvas>
    </div>);
  }
}

export default Antarctica;




// import fetch from 'unfetch'


// const fetcher = url => fetch(url).then(r => r.json());


// export default function Temperature() {
//   const { data, error } = fetch('http://localhost:3000/api/mth-mean-surface-temp', fetcher);
//     console.log(data)
//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>

//   return <div>hello !</div>
// }

// "test api:  'https://jsonplaceholder.typicode.com/todos/1'"