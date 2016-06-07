var config = require('../config');
var User = require('../proxy').User;
var hashgen = require('./hashgen');

/**
 * api access authentication according cookie.
 */
exports.tokenAuth = function(req, res, next) {
  if (req.cookies[config.tokenStatus] && req.cookies[config.tokenId]) {
    User.getUserById(req.cookies[config.tokenId], function(err, user) {
      if (err) {
        next(err);
      } else {
        if (!user) {
          res.json({desc: '', valid: false});
        } else {
          req.tokenId = user._id;
          next();
        }
      }
    });
  } else {
    var token = req.cookies[config.token];
    if (!token) {
      res.json({desc: '', valid: false});
    } else {
      var auth = hashgen.decrypt(token, config.cookieSecret).split('\t');
      if (auth.length !== 4) {
        res.json({desc: '', valid: false});
      } else {
        User.getUserByNameEmailPass(auth[1], auth[2], function(err, users) {
          if (err) {
            next(err);
          } else {
            var user = users.length > 0 ? users[0] : null;
            if (!user) {
              res.json({desc: '', valid: false});
            } else {
              req.tokenId = user._id;
              res.cookie(config.tokenId, user._id);
              res.cookie(config.tokenStatus, true);
              next();
            }
          }
        });
      }
    }
  }
};