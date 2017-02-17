var express = require('express');
var path = require('path');
var config = require('./config');
var router = require('./router');
var bodyParser = require('body-parser'); // the base for parsing http body
var errorhandler = require('errorhandler');
//var tokenAuth = require('./libs/middleware').tokenAuth;
var basicAuth = require('./libs/basicauth');
var app = express();
// error
var error = require('./libs/error');

// set(configuration)
app.enable('trust proxy'); // trust nginx

// use(middleware)
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // not for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
  if (req.path === '/user/signin' || req.method === 'OPTIONS') {
    return next();
  }
  basicAuth(req, res, next);
});
// CORS
app.use((req, res, next) => {
  res.set({'Access-Control-Allow-Origin': '*'}); // http://xxx.com.cn
  if (req.method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, X-Requested-With, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE'
    });
  }
  next();
});

// static helpers(for the lifetime of the application.)
// how to use? `req.app.locals`
app.locals.config = config;

//dynamic helpers(for the lifetime of the request.)
/**app.use(function(req, res, next) {
  *res.locals.ip = req.ip;
  *next();
  *});
**/

// routes
app.use('/', router);

//Error Handler must place it to last.
/*
app.use(function(err, req, res, next){
  if(~err.message.indexOf('not found')) return next();
  console.error(err.stack);
  res.status(500).render('5xx');
  //res.json({desc: 'Internal Server Error', msg: '', valid: false});
});
*/
if (config.debug) {
  app.use(errorhandler());
} else {
  app.use(function (err, req, res, next) {
    return res.status(500).json(error('网络服务异常', '抱歉，网络服务异常，您可请联系客服，谢谢！', '500'));
  });
}

app.listen(config.port, function () {
  console.log("%s %s listening on port %d in %s mode", config.description, config.version, config.port, app.settings.env);
  console.log("You can debug your app with http://" + config.hostname + ':' + config.port);
});

module.exports = app;