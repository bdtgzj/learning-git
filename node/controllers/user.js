/**
 * Controllers - user
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorUser = require('../validators').User;
var validator = require('validator');
// error
var error = require('../libs/error');
// proxy
//var User = require('../proxy').User;
var Log = require('../proxy').Log;
// mail
var mail = require('../services/mail');
// crypto
var crypto = require('crypto');
var hashcrypt = require('../libs/hashcrypt');
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var UserSerializer = require('../serializers').UserSerializer;
// bluebird
var Promise = require('bluebird');
Promise.config({cancellation: true});
var User = Promise.promisifyAll(require('../proxy').User);

/**
 * User authentication.
 */
exports.signin = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((user) => validatorUser.validateSignin(user))
    .then((validatedUser)=>{
      if (!validatedUser.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUser.error));
      }
      User.getUserByNameEmailMPhonePass(validatedUser.data.name, hashcrypt.sha1(validatedUser.data.password), function(err, users) {
        if (err) {
          return next(err);
        }
        var user = users.length > 0 ? users[0] : null;
        // log
        if (user) {
          Log.create(user._id, {category: 1, log: STRINGS.LOG_SIGNIN_OK, ip: req.ip}, function(err) {
            if (err) {
              console.log(err);
            }
          });
        }
        //
        res.json(UserSerializer.serialize(user));
        //res.json({desc: '用户名或密码不正确，请重新输入！', valid: false});
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * User update.
 * Data patch: id is must, others is optional.
 */
exports.updateOneByMobile = function(req, res, next) {
  var tmpUser = {};
  var funcs = [];

  new JSONAPIDeserializer({keyForAttribute: 'camelCase'}).deserialize(req.body, function(err, user) {
    if (err) {
      return next(err);
    }
    // id
    if (!user.id || user.id != req.uid) {
      return res.json(error('数据异常', 'id信息不存在或不正确！'));
    }
    // name
    if (user.name) {
      if (validator.isLength(user.name, {min:6, max: 18})) {
        tmpUser['name'] = user.name;
        funcs.push(User.getUserByNameExceptSelfAsync(user.id, user.name).then((data)=>{
          if (data) {
            return error('数据异常', '新更改的用户登录名已被注册，请更换！');
          }
        }));
      } else {
        return res.json(error('数据异常', '用户登录名至少6个字符，最多18个字符！'));
      }
    }
    // nickName
    if (user.nickName) {
      if (validator.isLength(user.nickName, {min:3, max: 18})) {
        tmpUser['nickName'] = user.nickName;
      } else {
        return res.json(error('数据异常', '用户昵称至少3个字符，最多18个字符！'));
      }
    }
    // email
    if (user.email) {
      if (validator.isEmail(user.email)) {
        tmpUser['email'] = user.email;
        funcs.push(User.getUserByEmailExceptSelfAsync(user.id, user.email).then((data)=>{
          if (data) {
            return error('数据异常', '新更改的Email已被注册，请更换！');
          }
        }));
      } else {
        return res.json(error('数据异常', 'Email格式不正确！'));
      }
    }
    // mphone
    if (user.mphone) {
      if (validator.isMobilePhone(user.mphone, 'zh-CN')) {
        tmpUser['mphone'] = user.mphone;
        funcs.push(User.getUserByMphoneExceptSelfAsync(user.id, user.mphone).then((data)=>{
          if (data) {
            return error('数据异常', '新更改的手机号码已被注册，请更换！');
          }
        }));
      } else {
        return res.json(error('数据异常', '手机号码格式不正确！'));
      }
    }
    // password
    if (user.oldPass) {
      if (validator.isLength(user.oldPass, {min:6, max: 18})) {
        tmpUser['oldPass'] = user.oldPass;
      } else {
        return res.json(error('数据异常', '原用密码至少6个字符，最多18个字符！'));
      }
    }
    if (user.newPass) {
      if (validator.isLength(user.newPass, {min:6, max: 18})) {
        tmpUser['newPass'] = user.newPass;
      } else {
        return res.json(error('数据异常', '新设密码至少6个字符，最多18个字符！'));
      }
    }
    // state
    // familyId
    // screenId
    
    if (funcs.length > 0) {
      Promise.all(funcs)
        .then((datas) => { // datas = [null, obj]
          var errs = [];
          datas.forEach(function(data) {
            if (data) {
              errs.push(data);
            }
          });
          if (errs.length > 0) {
            res.json(errs[0]);
          } else {
            User.updateOneAsync(user.id, tmpUser)
              .then((data) => {
                res.json(UserSerializer.serialize(data));
              })
              .catch((err) => {
                return next(err);
              });
          }
        })
        .catch((err) => {
          return next(err);
        });
    } else {
      User.updateOneAsync(user.id, tmpUser)
        .then((data) => {
          res.json(UserSerializer.serialize(data));
        })
        .catch((err) => {
          return next(err);
        });
    }

  });
/*
    p = User.getUserByNameExceptSelfAsync(user.id, tmpUser.name)
      .then((data) => {
        if (data) {
          res.json(error('数据异常', '新更改的用户登录名已被注册，请更换！'));
          p.cancel();
        } else {
          return User.getUserByEmailExceptSelfAsync(user.id, tmpUser.email);
        }
      })
      .then((data) => {
        //console.log(p.isPending());
        //console.log(p.isFulfilled());
        if (data) {
          res.json(error('数据异常', '新更改的Email已被注册，请更换！'));
          p.cancel();
        } else {
          return User.getUserByMphoneExceptSelfAsync(user.id, tmpUser.mphone);
        }
      })
      .then((data) => {
        if (data) {
          res.json(error('数据异常', '新更改的移动电话已被注册，请更换！'));
          p.cancel();
        }
      })
      .then((data) => {
        res.json({a:1});
      })
      .catch((err) => {
        next(err);
      });

    });
*/


};

exports.update = function(req, res, next) {
  new JSONAPIDeserializer().deserialize(req.body)
    .then(function(users) {
      users.forEach(function(user) {

      });
    })
    .catch(function(err) {
      return next(err);
    });
};

exports.retrieve11 = function(req, res, next) {
  User.getUserAllAsync()
    .then((data) => {
      res.json(UserSerializer.serialize(data));
    })
    .catch((err) => {
      return next(err);
    });
};





exports.init = function(req, res, next) {
  if (!req.tokenId) {
    return res.json({desc: '', valid: false});
  }
  User.getUserById(req.tokenId, function(err, user) {
    if (err) {
      return next(err);
    } 
    if (!user) {
      res.json({desc: '', valid: false});
    } else {
      res.json({desc: '', valid: true, data: {name: user.name, email: user.email}});
    }
  });
};



exports.retrievePassword = function(req, res, next) {
  var filteredEmail = filterEmail(req.body.email);
  if (!filteredEmail.valid) {
    res.json(filteredEmail);
    return;
  }

  var email = filteredEmail.msg;
  User.getUserByEmail(email, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return {desc: '该邮件地址不存在！', msg: '',  valid: false};
    }
    var retrieveToken = randomString(15);
    var retrieveTime = new Date().getTime();
    user.retrieveToken = retrieveToken;
    user.retrieveTime = retrieveTime;
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      mail.sendResetPassMail(user.name, email, retrieveToken);
      res.json({desc: '我们已给您填写的电子邮箱发送了一封邮件，请在24小时内点击里面的链接来重置密码！', msg: '',  valid: true});
    });
  });
};

exports.resetPassword = function(req, res, next) {
  var key = req.query.key;
  var username = req.query.account;
  var filteredUserName = filterUserName(username);
  if (!filteredUserName.valid) {
    res.render('notify', {header: '', body: filteredUserName.desc});
    return;
  }
  username = filteredUserName.msg;
  User.getUserByName(username, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user || user.retrieveToken !== key) {
      return res.render('notify', {header: '', body: '信息有误，密码无法重置。'});
    }
    if (!user.retrieveTime || (new Date().getTime() - user.retrieveTime) > 24 * 60 * 60 * 1000) {
      return res.render('notify', {header: '', body: '密码重置链接已过期，请<a href="/app/#/retrieve_password">重新申请</a>。'});
    }
    res.cookie('key', key, {});
    res.cookie('account', username, {});
    // 302 Found
    res.redirect(302,'/app/#/reset_password');
  });
};

exports.updatePassword = function(req, res, next) {
  var filteredPassword = filterPassword(req.body.password);
  var filteredPasswordRep = filterPassword(req.body.passwordrep);
  if (!filteredPassword.valid || !filteredPasswordRep.valid) {
    res.json(filteredPassword);
    return;
  }
  if (filteredPassword.msg !== filteredPasswordRep.msg) {
    res.json({desc: '输入的密码不一致！', msg: '', valid: false});
    return;
  }

  var password = sha1(filteredPassword.msg);
  var key = req.cookies.key;
  var username = req.cookies.account;

  User.getUserByName(username, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user || user.retrieveToken !== key) {
      res.json({desc: '错误的激活链接！', msg: '', valid: false});
      return;
    }
    user.password = password;
    user.retrieveTime = null;
    user.retrieveToken = null;
    user.active = true;
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.clearCookie('key');
      res.clearCookie('account');
      res.json({desc: '您的密码已重置，请重新登录！', msg: '', valid: true});
    });
  });
};

exports.nameAvailable = function(req, res, next) {
  existUserName(req.query.username, function(err, result) {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
};

exports.emailAvailable = function(req, res, next) {
  existEmail(req.query.email, function(err, result) {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
};

function existUserName(username, callback) {
  var filteredUserName = filterUserName(username);
  if (!filteredUserName.valid) {
    callback(null, filteredUserName);
    return;
  }
  username = filteredUserName.msg;

  User.getUserByName(username, function(err, user) {
    if (err) {
      callback(err);
      return;
    }
    if (user !== null) {
      callback(null, {desc: '该用户名已被注册！', msg: '',  valid: false});
      return;
    }
    callback(null, {desc: 'Username available', msg: username, valid: true});
  });
}

function existEmail(email, callback) {
  var filteredEmail = filterEmail(email);
  if (!filteredEmail.valid) {
    callback(null, filteredEmail);
    return;
  }
  email = filteredEmail.msg;
  User.getUserByEmail(email, function(err, doc) {
    if (err) {
      callback(err);
      return;
    }
    if (doc !== null) {
      callback(null, {desc: '该邮件地址已被注册！', msg: '',  valid: false});
      return;
    }
    callback(null, {desc: 'Email available', msg: email, valid: true});
  });
}
///////////////////
// Retrieve
exports.retrieve = function(req, res, next) {

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error));
  }
  // page.limit must positive for aggregate
  if (!validatedPage.data.limit) validatedPage.data.limit = CONFIG.MONGOOSE.AGGREGATE_QUERY_LIMIT;

  var validatedIdNameNicknameEmailMphoneStateFamilyid = validatorUser.validateIdNameNicknameEmailMphoneStateFamilyid(req.query);
  if (!validatedIdNameNicknameEmailMphoneStateFamilyid.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedIdNameNicknameEmailMphoneStateFamilyid.error));
  }

  User.retrieve(validatedPage.data, validatedIdNameNicknameEmailMphoneStateFamilyid.data, function(err, users) {
    if (err) {
      return next(err);
    }
    res.json(UserSerializer.serialize(users));
  });
};

// Create
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((user) => validatorUser.validateUser(user))
    .then((validatedUser)=>{
      if (!validatedUser.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUser.error));
      }
      User.create(validatedUser.data, function(err, users) {
        if (err) {
          return next(err);
        }
        res.json(UserSerializer.serialize(users[0]));
      });
    })
    .catch((err)=>{
      return next(err);
    });
};

// Update
exports.updateOne = function(req, res, next) {
  var validatedID = validatorCommon.validateUID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedUser = validatorUser.validateUser(req.body.data.attributes);
  if (!validatedUser.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUser.error));
  }

  User.updateOne(validatedID.data, validatedUser.data, function(err, users) {
    if (err) {
      return next(err);
    }
    res.json(UserSerializer.serialize(users[0]));
  });
};

// Delete
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateUID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedUser = validatorUser.validateUser(req.body.data.attributes);
  if (!validatedUser.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUser.error));
  }

  User.deleteOne(validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};