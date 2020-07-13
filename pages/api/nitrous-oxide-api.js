// import useSWR from 'swr'
import fetch from 'unfetch';
import Chart from 'chart.js';
const csv = require('csvtojson')
// import axios from "axios"

// function nitrousData(nData) {
//     const array = []
//   csv()
//         .fromString(nData)
//         .then((jsonObj) => {
//             array.push(jsonObj)
//         })

//     return array
//     // const oldKey = "# --------------------------------------------------------------------";
//     // let nDataCopy = csvToJson;
//     // console.log(nDataCopy);
//     // let parsedCopy = JSON.parse(JSON.stringify(nDataCopy));
//     // console.log(parsedCopy);
//     // let sliced = parsedCopy.slice(60);
//     // console.log(sliced);
//     // const nDate = [];
//     // const nitrous = [];

//     // sliced.forEach((obj) => {
//     //   if (oldKey !== "year") {
//     //     Object.defineProperty(obj, ["year"],
//     //         Object.getOwnPropertyDescriptor(obj, oldKey));
//     //     delete obj[oldKey];
//     // }
//     // nDate.push(` ${obj.year.split(' ').filter(f => f)[0]}.${obj.year.split(' ').filter(f => f)[1]}`);
//     // nitrous.push(obj.year.split(' ').filter(f => f)[3]);
//     // })


//     // return {date: nDate, average: nitrous } 
//     //    function jsonFunc(nData){
//     //     const oldKey = "# --------------------------------------------------------------------";
//     //     let nDataCopy = nData;
//     //     console.log(nDataCopy);
//     //     let parsedCopy = JSON.parse(JSON.stringify(nDataCopy));
//     //     console.log(parsedCopy);
//     //     let sliced = parsedCopy.slice(60);
//     //     console.log(sliced);
//     //     const nDate = [];
//     //     const nitrous = [];

//     //     sliced.forEach((obj) => {
//     //       if (oldKey !== "year") {
//     //         Object.defineProperty(obj, ["year"],
//     //             Object.getOwnPropertyDescriptor(obj, oldKey));
//     //         delete obj[oldKey];
//     //     }
//     //     nDate.push(` ${obj.year.split(' ').filter(f => f)[0]}.${obj.year.split(' ').filter(f => f)[1]}`);
//     //     nitrous.push(obj.year.split(' ').filter(f => f)[3]);
//     //   })


//     // }
//     // return {date: nDate, average: nitrous }

// }

export default async function (req, res) {
    const obj = {};
    try {
        
        const response = await fetch('http://localhost:3000/api/ftp-nitrous');
        const data = await response.text();
        csv()
            .fromString(data)
            .then((jsonObj) => {
                Object.assign(obj, jsonObj)
            })
        // const result = nitrousData(data);
        res.setHeader("Cache-Control", "s-maxage=86400");
        res.status(200).json({ error: null, obj });

    } catch (error) {
        res.status(500).send({ result: null, error });
    }
}