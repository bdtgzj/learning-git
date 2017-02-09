var express = require('express');
var path = require('path');
var config = require('./config');
var router = require('./router');
var bodyParser = require('body-parser'); // the base for parsing http body
//var methodOverride = require('method-override'); // use PUT or DELETE for the client doesn't support it.
// var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');
//var tokenAuth = require('./libs/middleware').tokenAuth;
var basicAuth = require('./libs/basicauth');
var app = express();
// error
var error = require('./libs/error');

/*
// tcp connection pool
var net = require('net');
var ConnectionPool = require('jackpot');
var connectionPool = new ConnectionPool(5, { // size of the connection pool
  retries: 5, // allow 5 failures for the #pull method
  min: 100,
  max: 50000
});
// factory produce connections.
connectionPool.factory(function () {
  var socket = new net.Socket; // net.Socket from node.
  var handlerDatas = [];
  // configure
  socket.setTimeout(10000);
  // async api
  socket.connect(config.screenHostPort, config.screenHostName);
  // on data
  socket.on('data', function(buf) {
    //console.log(buf);
    var fid = buf.readUInt32BE(0);
    var handlerData = handlerDatas[fid].pop();
    if (typeof handlerData  === 'function') handlerData(null, buf);
  });
  // on error
  socket.on('error', function(err) {
    //var handlerData = handlerDatas.pop();
    //if (typeof handlerData  === 'function') handlerData(err);
    console.log(err);
  });
  // on timeout
  socket.on('timeout', function() {
    console.log('timeout');
    // Half-closes the socket.sends a FIN packet.server will still send some data.
    socket.end();
  });
  // on handlerData
  socket.on('handlerData', function(fid, fn) {
    if (!handlerDatas[fid]) handlerDatas[fid] = [];
    handlerDatas[fid].unshift(fn);
  });
  // 
  return socket;
});

var ismap = require('./ismap');
*/

// set(configuration)
app.enable('trust proxy'); // trust nginx
//app.set('views', path.join(__dirname, '/views'));
//app.set('view engine', 'html');
//app.engine('html', require('ejs').renderFile);
//app.set('jsonp callback name', 'jsonpcb');

// use(middleware)
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // not for parsing application/x-www-form-urlencoded
//app.use(methodOverride());
//app.use(cookieParser());//req.cookies To get cookie
//app.use(express.static(path.join(__dirname, 'public')));
//custom middleware, can't tokenAuth().
app.use(function(req, res, next) {
  if (req.path === '/user/signin' || req.path === '/admin/signin' || req.method === 'OPTIONS') {
    return next();
  }
  basicAuth(req, res, next);
});

//static helpers(for the lifetime of the application.)
// how to use? `req.app.locals`
app.locals.config = config;
// app.locals.connectionPool = connectionPool;
// app.locals.ismap = ismap;
//dynamic helpers(for the lifetime of the request.)
/**app.use(function(req, res, next) {
  *res.locals.ip = req.ip;
  *next();
  *});
**/

// CORS
app.use((req, res, next) => {
  res.set({'Access-Control-Allow-Origin': '*'}); // http://ehomeguru.com.cn
  if (req.method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, X-Requested-With, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE'
    });
  }
  next();
});

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
  console.log("eHomeGuru-Screen listening on port %d in %s mode", config.port, app.settings.env);
  console.log("You can debug your app with http://" + config.hostname + ':' + config.port);
});

module.exports = app;