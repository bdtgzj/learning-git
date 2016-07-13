var fs = require('fs');

exports.getFileContent = function(filename, callback) {
  fs.readFile(filename, callback);
};