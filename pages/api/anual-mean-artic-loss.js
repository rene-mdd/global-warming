import axios from "axios";



const line2Array = (line) => line.split(" ").filter((ele) => ele);
export default async function(req, res) {
    try {
      const { data } = await axios.get(
        "https://climate.nasa.gov/system/internal_resources/details/original/1929_Arctic_data_1979-2019.txt"
      )
      const lines = data.split("\n")
      // in the _ vars we store the dashed lines
      const [heading, ...stats] = lines;

      const dataAs2dArray = stats.map(line2Array)
  
    function cleanFunc(clean) {
        const target = [];
        for(var i = 0; i < clean.length; i++) {
            const year = clean[i][0].slice(0, 4);
            const extent = parseFloat(clean[i][2].slice(2, 6));
            const area = parseFloat(clean[i][2].slice(6, 12));
          target[i] = {year, extent, area};
        }
     return target
    } 
    const result = cleanFunc(dataAs2dArray)

    res.setHeader("Cache-Control", "s-maxage=86400");
    res.status(200).json({error: null, result })

} catch(error){console.log(error)}
}
