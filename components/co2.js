// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
const csv=require('csvtojson')

// import axios from "axios"



// const fetcher = url => fetch(url).then(r => r.json());
class Co2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { co2Data: [],
    prehistoric: [] }
    this.url = "http://localhost:3000/api/ftp";
    this.testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.url3 = "http://localhost:3001/data";
  }

  async componentDidMount() {
  
    try {
      const response = await fetch(this.url)
      const data = await response.text();
      csv()
      .fromString(data)
      .then((jsonObj) => {
        this.setState({ co2Data: jsonObj })
      })
    } catch (error) {
      console.log(error)
    }
  
  
  }


  liveData = (co2Data) => {
    const oldKey = "# --------------------------------------------------------------------";
    let co2DataCopy = co2Data;
    console.log(co2DataCopy);
    let parsedCopy = JSON.parse(JSON.stringify(co2DataCopy));
    console.log(parsedCopy);
    let sliced = parsedCopy.slice(60);
    console.log(sliced);
    const date = [];
    const co2 = [];
   
    sliced.forEach((obj) => {
      if (oldKey !== "year") {
        Object.defineProperty(obj, ["year"],
            Object.getOwnPropertyDescriptor(obj, oldKey));
        delete obj[oldKey];
        
    }
     date.push(`${obj.year}.${obj.field2}.${obj.field3}`);
     co2.push(obj.field4)
    })
    console.log(date)
    console.log(co2);
    console.log(sliced);

    return parsedData({date, co2});

 

   function parsedData(cleanCo2Data){
   
      try {
        var ctx = 'myChart';
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cleanCo2Data.date,
            datasets: [
              {
                label: 'CO2',
                data: cleanCo2Data.co2,
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

  }

  render() {
  
    return (<div>
      <button onClick={this.liveData(this.state.co2Data)}>GET</button>
      {/* <button  onClick={this.prehistoricData(this.state.prehistoric)}>Antique GET</button> */}
      <h1>Hello,</h1>
      <canvas id="myChart" width="800" height="800"></canvas>
      
    </div>);
  }
}


export default Co2;


