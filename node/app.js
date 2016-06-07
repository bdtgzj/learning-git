var express = require('express');
var path = require('path');
var config = require('./config');
var routes = require('./routes');
var tokenAuth = require('./libs/middleware').tokenAuth;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');
var app = express();

var net = require('net');
//var Buffer = require('buffer');

var ConnectionPool = require('jackpot');
var pool = new ConnectionPool(5, {
  retries: 5, // allow 5 failures for the #pull method
  min: 100,
  max: 50000
});
// factory produce connections.
pool.factory(function () {
  var socket = new net.Socket;
  socket.connect(11502, '127.0.0.1')
  // socket.setTimeout(10000000);
  return socket
});

var SN = [0x00, 0x00, 0x00, 0x11];
const UID = [0x00, 0x00, 0x00, 0x00];
const T_GET_SN = [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x06,
                   0x01, 0x03, 0x00, 0x00, 0x00, 0x02 ];
const R_GET_SN = [ 0x00, 0x01, 0x00, 0x00, 0x00, 0x07,
                   0x01, 0x03, 0x04 ];

// set(configuration)
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('jsonp callback name', 'jsonpcb');

// use(middleware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());//req.cookies To get cookie
app.use(express.static(path.join(__dirname, 'public')));
//custom middleware, can't tokenAuth().
app.use(function(req, res, next) {
  if (req.path === '/api/user/signin') {
    return next();
  }
  tokenAuth(req, res, next);
});

//static helpers
app.locals.config = config;
//dynamic helpers
/**app.use(function(req, res, next) {
  *res.locals.ip = req.ip;
  *next();
  *});
**/

// routes
routes(app);

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

app.get('/', function(req, res) {
  pool.pull(function (err, connection) {
    if (err) {
      console.log("connection.pull() is error" + err)
      return;
    }
    const buf = new Buffer(SN.concat(UID, T_GET_SN));
    connection.write(buf.toString('binary'), 'binary');
    var cb = (data) => {
      res.send(data);
      connection.removeListener('data', cb);
      //console.log(data);
      // use the inner api of net package, to remove repeated register of data, so can reuse socket.
      // or use connection.end();
      /*
      if (connection._events.hasOwnProperty('data') && connection._events['data'].length > 0) {
        delete connection._events['data'];
        connection._events['data'] = null;
      }
      */
      //connection.end();
    };
    connection.on('data', cb);
  });
});

app.listen(config.port, function () {
  console.log("eHomeGuru-FamilyScreen listening on port %d in %s mode", config.port, app.settings.env);
  console.log("You can debug your app with http://" + config.hostname + ':' + config.port);
});

module.exports = app;