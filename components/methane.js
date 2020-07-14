// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
const csv=require('csvtojson')
// import axios from "axios"



// const fetcher = url => fetch(url).then(r => r.json());
class Methane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { methaneData: [],
    prehistoricMethane: [] }
    this.url = "api/methane-api";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
  
    try {
      const response = await fetch(this.url)
      const data = await response.json();
      this.setState({ methaneData: data })
    } catch (error) {
      console.log(error)
    }
  }

   parsedData = (methApiData) => {
   
      try {
        var ctx = 'myMethChart';
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: methApiData.date,
            datasets: [
              {
                label: 'Methane',
                data: methApiData.average,
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
   
  //  prehistoricData = () => {

  //  }



  render() {
    console.log(this.state.methaneData)
    return (<div>
      <button onClick={this.parsedData(this.state.methaneData)}>GET</button>
      {/* <button  onClick={this.prehistoricData(this.state.prehistoric)}>Antique GET</button> */}
      <h1>Hello,</h1>
      <canvas id="myMethChart" width="800" height="800"></canvas>
      
    </div>);
  }
}


export default Methane;


