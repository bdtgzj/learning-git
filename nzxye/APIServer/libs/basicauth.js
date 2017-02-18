var config = require('../config');
var auth = require('basic-auth');
var User = require('../proxy').User;
var Admin = require('../proxy').Admin;
var hashcrypt = require('./hashcrypt');

/**
 * api access authentication according basic authentication.
 */
var basicAuth = function(req, res, next) {
  var credentials = auth(req);
  if (!credentials) {
    res.set('WWW-Authenticate', 'Basic realm="ehomeguru.com.cn"');
    return res.status(401).end('Access denied.');
  }
  // parse client key, id/tname/tpass
  var key = hashcrypt.decrypt(credentials.pass, config.clientSecret).split('\t');
  //
  User.getUserByNameEmailMPhonePass(credentials.name, key[2], function(err, users) { // hashcrypt.sha1(personPass)
    if (err) {
      next(err);
    } else {
      // console.log(credentials.user + credentials.pass + users + users[0]);
      var user = users.length > 0 ? users[0] : null;
      if (!user) {
        res.set('WWW-Authenticate', 'Basic realm="ehomeguru.com.cn"');
        res.status(401).end('Access denied.');
        //res.json({desc: '', valid: false});
      } else {
        req.uid = user._id;
        next();
      }
    }
  });
};

module.exports = basicAuth;