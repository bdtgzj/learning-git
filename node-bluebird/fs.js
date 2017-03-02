
/*
var FS = require('./proxy/fs');

FS.getFileContent('/Users/xiaodongyu/Downloads/url.html', function(err, data) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.toString());
});
*/

var Promise = require('bluebird');
Promise.config({cancellation: true});
var FS = Promise.promisifyAll(require('./proxy/fs'));

p = FS.getFileContentAsync('/Users/xiaodongyu/Downloads/url.html')
  .then((data1) => {
    console.log(data1.toString());
    // p.cancel();
    // console.log("continue?");
    return FS.getFileContentAsync('/Users/xiaodongyu/Downloads/url.html');
    //return '1';
  })  
  .then((data2) => {
    //console.log(data1);
    console.log(data2.toString());
    require('./proxy/fs').getFileContent('/Users/xiaodongyu/Downloads/url.html', function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(data.toString());
    });
  })
  . catch((err) => {
    console.log(err);
  });