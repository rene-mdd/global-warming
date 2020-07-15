// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
const csv=require('csvtojson')
// import axios from "axios"



// const fetcher = url => fetch(url).then(r => r.json());
class Nitrous extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nitrousData: {},
    prehistoricNitrous: [] }
    this.url = "http://localhost:3000/api/ftp-nitrous";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
  
    try {
      const response = await fetch(this.url)
      const data = await response.json();
      csv()
      .fromString(data)
      .then((jsonObj) => {
        this.setState({ nitrousData: jsonObj })
      })
    } catch (error) {
      console.log(error)
    }
  }

 

//    function parsedData(cleanNitrousData) {
   
//       try {
//         var ctx = 'myNitrousChart';
//         const myChart = new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels: cleanNitrousData.nDate,
//             datasets: [
//               {
//                 label: 'Nitrous Oxide',
//                 data: cleanNitrousData.nitrous,
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
   
  //  prehistoricData = () => {

  //  }

  

  render() {
    console.log(this.state.nitrousData)
    return (<div>
      {/* <button onClick={this.nitrousData(this.state.nitrousData)}>GET</button> */}
      {/* <button  onClick={this.prehistoricData(this.state.prehistoric)}>Antique GET</button> */}
      <h1>Hello,</h1>
      <canvas id="myNitrousChart" width="800" height="800"></canvas>
      
    </div>);
  }
}


export default Nitrous;


