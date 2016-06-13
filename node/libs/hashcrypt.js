var crypto = require('crypto');

exports.encrypt = function(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
};

exports.decrypt = function(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

exports.randomString = function(size) {
  size = size || 6;
  var metaStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var maxLenth = metaStr.length;
  var randomStr = '';
  
  while (size > 0) {
    randomStr += metaStr.charAt(Math.floor(Math.random() * maxLenth));
    size--;
  }
  return randomStr;
};

exports.md5 = function(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
};

exports.sha1 = function(str) {
  var sha1sum = crypto.createHash('sha1');
  sha1sum.update(str);
  str = sha1sum.digest('hex');
  return str;
};