var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'public/data/clear-data-1979.json');

export default function (req, response) {
    const array = [];
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
     
        if (!err) {
            const parsedData = JSON.parse(data)
            delete parsedData[0];
            console.log(parsedData);
            
            for (var i = 1; i < 1979; i++) {
                const time = parsedData[i].split(" ")[0];
                const temperature = parsedData[i].split(" ")[3] ? parsedData[i].split(" ")[3] : parsedData[i].split(" ")[4];
                console.log(temperature)
                const land = temperature.slice(0, 5)
                array[i] = { time, land }
            }
          
        } else {
            console.log(err);
        }
    });
   
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({error: null, array});
}
