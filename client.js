/*
function httpPost(){
    const http = require('http');

    var postData = JSON.stringify({
        'temp': 0,
        'humid': 1,
        'rain': 2,
    });

}
// echo the data from server that we fetched with 'get'

setInterval(loadtest, 100); //time is in ms
function loadtest()
{
 http.get('http://Load-bal-2-858821152.us-east-1.elb.amazonaws.com', (res) => {
 res.on('data', function (chunk) {
 console.log('' + chunk);
});
 });
}
*/ 

function httpPost() {
    var http = require("http");

    randomTemp = Math.floor(20+Math.random() * 40);  
    randomHumidity = Math.floor(5+Math.random()*90);
    randomRain = Math.floor(4 +Math.random() * 20) // in mm

    var postData = JSON.stringify({
        'temp': randomTemp,
        'humid': randomHumidity,
        'rain': randomRain,
    });

    var options = {
        host: "Load-bal-2-858821152.us-east-1.elb.amazonaws.com",    
        port: 3000,
        method: 'POST',
        path: '/',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };

    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(postData);
    req.end();
}

httpPost();


