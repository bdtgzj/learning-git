/**
 * 远程短信http接口
 */
var http = require('http');
var config = require('../config');
var parseString = require('xml2js').parseString;

function httpRequest(postData, path, callback) {
  // 上传的key-value数据
  if (postData)
    postData += '&cdkey=' + config.sms.cdkey + '&password=' + config.sms.password;
  else
    postData = 'cdkey=' + config.sms.cdkey + '&password=' + config.sms.password;
  // 把中文字符编码为utf8格式，api服务端会按照此格式解码；
  // 如果不编码，api服务端会乱码，且postData.length把中文字只算为1个字符，而在底层网络字节码发送时，会把中文字当作多个字符，导致上传字符丢失；
  postData = encodeURI(postData);
  // HTTP协议设置
  var options = {
    host: config.sms.host,
    port: config.sms.port,
    path: path,
    method: 'POST',
    headers: {
      // 表单form格式(body中的key-value)，非JSON
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };
  // 发送http请求
  var req = http.request(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      parseString(chunk, function(err, data) {
        if (err) {
          return callback(err);
        }
        callback(null, data.response.error[0]);
        //console.log(JSON.stringify(data));
        // 被xml2js解析为：{"response":{"error":["0"],"message":[{"$":{"dd":"dd"},"srctermid":["13312345678"],"sendTime":["20080101043659"],"msgcontent":["短信内容1"]}]}}
      });
    });
  });
  // error handler
  req.on('error', function(e) {
    callback(e.message);
  });
  // write data to request body
  req.write(postData);
  req.end();
}

// 第一次发短信，需要激活账户，通过命令行or批处理来激活。
exports.register = function(callback) {
  httpRequest(null, config.sms.path.register, callback);
};
// 即时短信
exports.realtime = function(postData, callback) {
  httpRequest(postData, config.sms.path.realtime, callback);
};
// 定时短信
exports.timing = function() {

};
// 余额查询
exports.balance = function(callback) {
  httpRequest(null, config.sms.path.balance, callback);
};
// 状态报告
exports.report = function(callback) {
  httpRequest(null, config.sms.path.report, callback);
};