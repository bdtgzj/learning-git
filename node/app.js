var express = require('express');
var app = express();

var fivebeans = require('fivebeans');
var client = new fivebeans.client('127.0.0.1', 11300);

app.get('/', function (req, res) {
  client
    .on('connect', function()
    {
      // produce
      client.put(0, 0, 120, '123456', function(err, jobid) {
        if (err) {
          console.log('put error');
          res.send('put error');
          return;
        }
        // consume, watch tube
        client.watch('123', function(err, numwatched) {
          if (err) {
            console.log('consume error');
            return;
          }
          // consume, reserve
          client.reserve_with_timeout(5, function(err, jobid, payload) {
            if (err) {
              console.log('consume error');
              res.send(err);
              return;
            }
            client.destroy(jobid, function(err) {
              res.send(err);
              return;
            });
            res.send(payload);
          });
        });
      });
    })
    .on('error', function(err)
    {
        // connection failure
    })
    .on('close', function()
    {
        // underlying connection has closed
    })
    .connect();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});