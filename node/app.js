var express = require('express');
var app = express();

var net = require('net');

var ConnectionPool = require('jackpot');
var pool = new ConnectionPool(5, {
  retries: 5, // allow 5 failures for the #pull method
  min: 100,
  max: 50000
});
// factory produce connections.
pool.factory(function () {
  var socket = new net.Socket;
  socket.connect(11502, '127.0.0.1')
  // socket.setTimeout(10000000);
  return socket
});

const SN = [0x00, 0x00, 0x00, 0x11];
const UID = [0x00, 0x00, 0x00, 0x00];
const T_GET_SN = [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x06,
                   0x01, 0x03, 0x00, 0x00, 0x00, 0x02 ];
const R_GET_SN = [ 0x00, 0x01, 0x00, 0x00, 0x00, 0x07,
                   0x01, 0x03, 0x04 ];

app.get('/', function(req, res) {
  pool.pull(function (err, connection) {
    if (err) {
      console.log("connection.pull() is error" + err)
      return;
    }
    connection.write((SN.join() + UID.join() + T_GET_SN.join()).replace(/,/g,""));
    var cb = (data) => {
      res.send(data);
      connection.removeListener('data', cb);
      //console.log(data);
      // use the inner api of net package, to remove repeated register of data, so can reuse socket.
      // or use connection.end();
      /*
      if (connection._events.hasOwnProperty('data') && connection._events['data'].length > 0) {
        delete connection._events['data'];
        connection._events['data'] = null;
      }
      */
      //connection.end();
    };
    connection.on('data', cb);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});