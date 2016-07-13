
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
var FS = Promise.promisifyAll(require('./proxy/fs'));

FS.getFileContentAsync('/Users/xiaodongyu/Downloads/url.html')
  .then((data) => {
    console.log(data.toString());
    return '1';
  })
  .then((data) => {
    console.log(data);
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