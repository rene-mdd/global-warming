// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
// import axios from "axios"


// const fetcher = url => fetch(url).then(r => r.json());
class Co2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { co2Data: [] }
    this.url = 'https://pkgstore.datahub.io/core/co2-ppm-daily/co2-ppm-daily_json/data/3c5ec59370a85880da58d61fa4c47ce3/co2-ppm-daily_json.json';
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
    try {
      const response = await fetch(this.url)
      const data = await response.json();
      this.setState({ co2Data: data })
    } catch (error) {
      console.log(error)
    }
  }


  displayGraph = (cdata) => {
    function parsedData() {
      const stateCopy = cdata;
      const dateArray = [];
      const co2Array = [];

      stateCopy.forEach(row => {
        const date = row.date;
        const value = row.value;
        dateArray.push(date)
        co2Array.push(parseFloat(value))
      });
      return { dateArray, co2Array }

    }

    async function chart() {
      try {
        var ctx = 'myChart';
        const globalCo2 = await parsedData();
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: globalCo2.dateArray,
            datasets: [
              {
                label: 'CO2',
                data: globalCo2.co2Array,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1
              }
            ]
          },
          options: {}
        });
      } catch (error) {
        console.log(error)
      }
    }
    chart()

  }

  render() {
    console.log(this.state.co2Data)
    return (<div>
      <button onClick={this.displayGraph(this.state.co2Data)}>GET</button>
      <h1>Hello,</h1>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>);
  }
}

export default Co2;

// export default function Co2() {
//   async function fetcher(){
//   const { data, error } = await fetch('https://datahub.io/core/co2-ppm-daily/datapackage.json', {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     }})
//     console.log(data)
//     console.log(error)
//   }
//   // if (error) return <div>failed to load</div>
//   // if (!data) return <div>loading...</div>

//   return <div>hello !</div>
// }
