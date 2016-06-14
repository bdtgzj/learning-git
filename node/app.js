var express = require('express');
var path = require('path');
var config = require('./config');
var router = require('./router');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');
//var tokenAuth = require('./libs/middleware').tokenAuth;
var basicAuth = require('./libs/basicauth');
var app = express();

var net = require('net');
var ConnectionPool = require('jackpot');
var connectionPool = new ConnectionPool(5, {
  retries: 5, // allow 5 failures for the #pull method
  min: 100,
  max: 50000
});
// factory produce connections.
connectionPool.factory(function () {
  var socket = new net.Socket;
  socket.connect(config.screenHostPort, config.screenHostName);
  // socket.setTimeout(10000000);
  return socket
});

var ismap = require('./ismap');

// set(configuration)
//app.set('views', path.join(__dirname, '/views'));
//app.set('view engine', 'html');
//app.engine('html', require('ejs').renderFile);
//app.set('jsonp callback name', 'jsonpcb');

// use(middleware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
//app.use(cookieParser());//req.cookies To get cookie
//app.use(express.static(path.join(__dirname, 'public')));
//custom middleware, can't tokenAuth().
app.use(function(req, res, next) {
  if (req.path === '/user/signin') {
    return next();
  }
  basicAuth(req, res, next);
});

//static helpers(for the lifetime of the application.)
// how to use? `req.app.locals`
app.locals.config = config;
app.locals.connectionPool = connectionPool;
app.locals.ismap = ismap;
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
    // return res.send(500, '500 status');
    return res.json({desc: '抱歉，系统异常，请联系管理员！', valid: false});
  });
}

app.listen(config.port, function () {
  console.log("eHomeGuru-Screen listening on port %d in %s mode", config.port, app.settings.env);
  console.log("You can debug your app with http://" + config.hostname + ':' + config.port);
});

module.exports = app;