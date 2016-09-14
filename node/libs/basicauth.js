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
  var personType = credentials.pass.substr(-2);
  var personPass = credentials.pass.substr(0, credentials.pass.length-2);
  if (personType === 'us') {
    User.getUserByNameEmailMPhonePass(credentials.name, hashcrypt.sha1(personPass), function(err, users) {
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
  } else if (personType === 'ad') {
    Admin.getAdminByNameEmailMPhonePass(credentials.name, hashcrypt.sha1(personPass), function(err, admins) {
      if (err) {
        next(err);
      } else {
        // console.log(credentials.user + credentials.pass + admins + admins[0]);
        var admin = admins.length > 0 ? admins[0] : null;
        if (!admin) {
          res.set('WWW-Authenticate', 'Basic realm="ehomeguru.com.cn"');
          res.status(401).end('Access denied.');
          //res.json({desc: '', valid: false});
        } else {
          req.aid = admin._id;
          next();
        }
      }
    });
  }
};

module.exports = basicAuth;