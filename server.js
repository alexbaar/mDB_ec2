/*
const express = require('express');
const app = express();
const port = 3000;

// create a data structure for the sensors
var sensorData = {
    temp: 0,
    humid: 0,
    rain: 0,
}

app.get('/', (req, res) => {
 
 for (i=0;i<100;i++) {
 randomTemp = Math.floor(20+Math.random() * 40);  
 randomHumidity = Math.floor(5+Math.random()*90);
 randomRain = Math.floor(4 +Math.random() * 20) // in mm

sensorData = {
    temp: randomTemp,
    humid: randomHumidity,
    rain: randomRain,
}

 }
 results = "temp: " + randomTemp + "humid: " + randomHumidity + "rain: " + randomRain
 console.log(results);
 res.send(results);
});

app.listen(port, () => {
 console.log(`listening on port ${port}`);
});
*/
//---



const express = require("express");
const app = express();
var mongodb=require('mongodb');  
const MongoClient = require('mongodb').MongoClient;
// database

app.use(express.json());


function insertDocument(data) {
    // Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb://54.196.92.34:27017/';
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("insertDB");
    const col1 = database.collection("col1");
    // create a document to insert
    const doc = {
      rec: data ,
    }
    const result = await col1.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
}


var http = require("http");

function startServer(port, ip) {
    // requestListener handles incoming requests
    function requestListener(request, response) {
        if (request.method == 'POST') {
            var body = '';
            request.on('data', function (data) {
                body += data;
                // destroys connection if too long
                if (body.length > 1e6) {
                    request.connection.destroy();
                }
            });
            request.on('end', function() {
                // checks for json, otherwise destroys connection
                try {
                    var POST = JSON.parse(body);
                    console.log('valid post:')
                    console.log(POST)

                    // save to mongo  **
                    insertDocument(POST);
                    // save to mongo end **

                    response.end('post accepted');
                }
                catch(err) {
                    console.log('bad post, ending connection')
                    response.connection.destroy();
                }
            });
        }
        else {
            response.end();
        }
    };
    // creates the eventEmitter
    var server = http.createServer(requestListener);
    // beigns listening on specified port
    server.listen(port, ip);
    // logs when someone attempts to connect
    server.on('connection', function (stream) {
      console.log('someone connected!');
    });
    // notifies when server has started
    console.log('Server running at http://'+ip+':'+port);
}
insertDocument("abc");
startServer(3000, '0.0.0.0');