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
    this.url = "http://localhost:3000/api/ftp-methane";
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
        this.setState({ methaneData: jsonObj })
      })
    } catch (error) {
      console.log(error)
    }
  }


  methaneData = (mData) => {
    const oldKey = "# --------------------------------------------------------------------";
    let mDataCopy = mData;
    console.log(mDataCopy);
    let parsedCopy = JSON.parse(JSON.stringify(mDataCopy));
    console.log(parsedCopy);
    let sliced = parsedCopy.slice(62);
    console.log(sliced);
    const mDate = [];
    const methane = [];
   
    sliced.forEach((obj) => {
      if (oldKey !== "year") {
        Object.defineProperty(obj, ["year"],
            Object.getOwnPropertyDescriptor(obj, oldKey));
        delete obj[oldKey];
    }
    mDate.push(` ${obj.year.split(' ').filter(f => f)[0]}.${obj.year.split(' ').filter(f => f)[1]}`);
    methane.push(obj.year.split(' ').filter(f => f)[3]);
  })
  console.log(sliced)
  console.log(mDate)
  console.log(methane)
  
    //  date.push(`${obj.year}.${obj.field2}.${obj.field3}`);
    //  co2.push(obj.field4)
    // })
    // console.log(date)
    // console.log(co2);
    // console.log(sliced);

    return parsedData({mDate, methane});
 

   function parsedData(cleanMethData){
   
      try {
        var ctx = 'myMethChart';
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cleanMethData.mDate,
            datasets: [
              {
                label: 'Methane',
                data: cleanMethData.methane,
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
    console.log(this.state.methaneData)
    return (<div>
      <button onClick={this.methaneData(this.state.methaneData)}>GET</button>
      {/* <button  onClick={this.prehistoricData(this.state.prehistoric)}>Antique GET</button> */}
      <h1>Hello,</h1>
      <canvas id="myMethChart" width="800" height="800"></canvas>
      
    </div>);
  }
}


export default Methane;


