var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'data/clear-data-1979.json');

 fs.readFile(filePath, {encoding: 'utf-8'}, function (err,data){

    if (!err) {
        const parsedData = JSON.parse(data)
        delete parsedData[0];
        console.log(parsedData);
        const array = [];
        for (var i = 1; i < 1979; i++) {
            const time = parsedData[i].split(" ")[0];
            const temperature = parsedData[i].split(" ")[3] ? parsedData[i].split(" ")[3] : parsedData[i].split(" ")[4];
            console.log(temperature)
            const land = temperature.slice(0, 5)
            array[i] = {time, land}
            console.log(array[i])
           
        }
        return array
        // console.log(array)
        // response.writeHead(200, {'Content-Type': 'application/json'});
        // response.write(array);
        // response.end(array);
    } else {
        console.log(err);
    }
    
});
