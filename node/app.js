var express = require('express');
var app = express();

var net = require('net');
var client = new net.Socket();
client.connect(11502, '127.0.0.1', function() {
  console.log('Connected to FamilyScreen');
  //client.write('Hello, server! Love, Client.');
});
client.on('close', function() {
  console.log('Connection closed');
});

app.get('/', function(req, res) {
  client.write('123456');
  client.on('data', function(data) {
    console.log('Received: ' + data);
    //client.destroy(); // kill client after server's response
    res.send(data)
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});