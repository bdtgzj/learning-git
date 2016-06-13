var config = require('../config');
var auth = require('basic-auth');
var User = require('../proxy').User;

/**
 * api access authentication according basic authentication.
 */
var basicAuth = function(req, res, next) {
  var credentials = auth(req);
  if (!credentials) {
    res.set('WWW-Authenticate', 'Basic realm="ehomeguru.com.cn"');
    return res.status(401).end('Access denied');
  }
  User.getUserByNameEmailMPhonePass(credentials.name, credentials.pass, function(err, users) {
    if (err) {
      next(err);
    } else {
      var user = users.length > 0 ? users[0] : null;
      if (!user) {
        res.set('WWW-Authenticate', 'Basic realm="ehomeguru.com.cn"');
        res.status(401).end('Access denied');
        //res.json({desc: '', valid: false});
      } else {
        next();
      }
    }
  });
};

module.exports = basicAuth;