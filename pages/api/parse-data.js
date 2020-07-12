import fs from 'fs'
import path from 'path'
    
export async function getStaticProps() {

    const warmingAntiqueFile = path.join(process.cwd(), '../public/data/clear-data-1979.json')
   fs.readdirSync(warmingAntiqueFile, { encoding: 'utf-8' }, function(err, data){
        var array = [];
        if (!err) {
           const parsedData = JSON.parse(data)
           console.log(parsedData)
            
            for (var i = 0; i < 1979; i++) {
                const time = parsedData[i].split(" ")[0];
                const temperature = parsedData[i].split(" ")[3] ? parsedData[i].split(" ")[3] : parsedData[i].split(" ")[4];
                console.log(temperature)
                const land = temperature.slice(0, 5);
              
                array[i] = { time, land }
            }
            array.splice(0, 1);
            return {props: array}
         
        } else {
            console.log(err);
        }

    })
    //     response.setHeader('Content-Type', 'application/json');
//     response.status(200).json({error: null, newArray});
        
    return {props: array}
}

