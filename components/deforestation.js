// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
import axios from "axios"



class Deforestation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deforestationData: "" }
    this.url = "";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
    try {
      const response = await axios.get(this.url)
      const data = await response.text();
      this.setState({ deforestationData: response })
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
    console.log(this.state.deforestationData)
    return (<div>
      <button >GET</button>
      <h1>Hello,</h1>
      {/* <div class="embed-container"><iframe width="500" height="400" frameborder="0" scrolling="no" marginHeight="0" marginWidth="0" title="Forest loss copy" src="//www.arcgis.com/apps/Embed/index.html?webmap=ed33972acffc4e7c9b260c753f1a6bd4&extent=-157.4447,-41.8564,177.9459,71.6&home=true&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&disable_scroll=false&theme=light"></iframe></div> */}
      <iframe width="870"
        height="690"
        frameBorder="0"
        src="https://my.gfw-mapbuilder.org/v1.latest/?appid=e53c3a031fa6479ab09ef9171ee91c03"></iframe>
      <canvas id="tempChart" width="800" height="800"></canvas>
    </div>);
  }
}

export default Deforestation;




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