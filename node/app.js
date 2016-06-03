var express = require('express');
var app = express();

var bs = require('nodestalker');
var client = bs.Client('127.0.0.1:11300');

app.get('/', function(req, res) {
  client.put('123456', 0, 0, 100000).onSuccess(function(jobid) {
    console.log(jobid);
    client.watch('123').onSuccess(function(data) {
      client.reserve_with_timeout(5).onSuccess(function(job) {
        console.log('reserved', job);

        client.deleteJob(job.id).onSuccess(function(del_msg) {
          console.log('deleted', job);
          console.log('message', del_msg);
          client.disconnect();
          res.send(job.data);
        });
      }).onError(function() {
        client.disconnect();
        res.send("timeout");
      });
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});