var express = require('express');
var app = express();

var net = require('net');
var client = new net.Socket();

client.connect(11502, '127.0.0.1', function() {
  console.log('Connected to FamilyScreen');
  //client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
  console.log('Received: ' + data);
  //client.destroy(); // kill client after server's response
  //res.send(data)
});

client.on('end', function() {
  // recevied a FIN packet
  console.log('recevied a FIN packet');
});

client.on('error', function(err) {
  // The 'close' event will be called directly following this event.
  if (err) {
    console.log('error' + err);
  }
});

client.on('close', function(err) {
  if (err) {
    console.log('Have a transmission error' + err);
  }
  console.log('Connection closed');
});



app.get('/', function(req, res) {
  client.write('12345678data');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});