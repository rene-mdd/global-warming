var fs = require('fs'),
    path = require('path'),
    //in next js we use process.cwd() and not __dirname
    filePath = path.join(process.cwd(), '../public/data/clear-data-1979.json');
    
    fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
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
            return warmingFunc(array)
         
        } else {
            console.log(err);
        }
    });

export  default async function warmingFunc(data) {
    
//     response.setHeader('Content-Type', 'application/json');
//     response.status(200).json({error: null, newArray});
    return data
}

