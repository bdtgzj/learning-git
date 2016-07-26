/**
 * Controllers - user
 */
var config = require('../config');
//var User = require('../proxy').User;
var mail = require('../services/mail');
var crypto = require('crypto');
var validator = require('validator');
var hashcrypt = require('../libs/hashcrypt');
var error = require('../libs/error');
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var UserSerializer = require('../serializers').UserSerializer;
var ErrorSerializer = require('../serializers').ErrorSerializer;

// bluebird
var Promise = require('bluebird');
Promise.config({cancellation: true});
var User = Promise.promisifyAll(require('../proxy').User);

/**
 * User authentication.
 */
exports.signin = function(req, res, next) {
  new JSONAPIDeserializer().deserialize(req.body)
    .then(function(user) {
      var name = validator.trim(user.name);
      var password = validator.trim(user.password);
      User.getUserByNameEmailMPhonePass(name, hashcrypt.sha1(password), function(err, users) {
        if (err) {
          return next(err);
        }
        var user = users.length > 0 ? users[0] : null;
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
exports.updateOne = function(req, res, next) {
  var tmpUser = {};
  var funcs = [];

  new JSONAPIDeserializer({keyForAttribute: 'camelCase'}).deserialize(req.body, function(err, user) {
    if (err) {
      return next(err);
    }
    // id
    if (!user.id || user.id != req.uid) {
      return res.json(ErrorSerializer.serialize(error('数据异常', 'id信息不存在或不正确！')));
    }
    // name
    if (user.name) {
      if (validator.isLength(user.name, {min:6, max: 18})) {
        tmpUser['name'] = user.name;
        funcs.push(User.getUserByNameExceptSelfAsync(user.id, user.name).then((data)=>{
          if (data) {
            return ErrorSerializer.serialize(error('数据异常', '新更改的用户登录名已被注册，请更换！'));
          }
        }));
      } else {
        return res.json(ErrorSerializer.serialize(error('数据异常', '用户登录名至少6个字符，最多18个字符！')));
      }
    }
    // nickName
    if (user.nickName) {
      if (validator.isLength(user.nickName, {min:3, max: 18})) {
        tmpUser['nickName'] = user.nickName;
      } else {
        return res.json(ErrorSerializer.serialize(error('数据异常', '用户昵称至少3个字符，最多18个字符！')));
      }
    }
    // email
    if (user.email) {
      if (validator.isEmail(user.email)) {
        tmpUser['email'] = user.email;
        funcs.push(User.getUserByEmailExceptSelfAsync(user.id, user.email).then((data)=>{
          if (data) {
            return ErrorSerializer.serialize(error('数据异常', '新更改的Email已被注册，请更换！'));
          }
        }));
      } else {
        return res.json(ErrorSerializer.serialize(error('数据异常', 'Email格式不正确！')));
      }
    }
    // mphone
    if (user.mphone) {
      if (validator.isMobilePhone(user.mphone, 'zh-CN')) {
        tmpUser['mphone'] = user.mphone;
        funcs.push(User.getUserByMphoneExceptSelfAsync(user.id, user.mphone).then((data)=>{
          if (data) {
            return ErrorSerializer.serialize(error('数据异常', '新更改的手机号码已被注册，请更换！'));
          }
        }));
      } else {
        return res.json(ErrorSerializer.serialize(error('数据异常', '手机号码格式不正确！')));
      }
    }
    // password
    if (user.oldPass) {
      if (validator.isLength(user.oldPass, {min:6, max: 18})) {
        tmpUser['oldPass'] = user.oldPass;
      } else {
        return res.json(ErrorSerializer.serialize(error('数据异常', '原用密码至少6个字符，最多18个字符！')));
      }
    }
    if (user.newPass) {
      if (validator.isLength(user.newPass, {min:6, max: 18})) {
        tmpUser['newPass'] = user.newPass;
      } else {
        return res.json(ErrorSerializer.serialize(error('数据异常', '新设密码至少6个字符，最多18个字符！')));
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
          res.json(ErrorSerializer.serialize(error('数据异常', '新更改的用户登录名已被注册，请更换！')));
          p.cancel();
        } else {
          return User.getUserByEmailExceptSelfAsync(user.id, tmpUser.email);
        }
      })
      .then((data) => {
        //console.log(p.isPending());
        //console.log(p.isFulfilled());
        if (data) {
          res.json(ErrorSerializer.serialize(error('数据异常', '新更改的Email已被注册，请更换！')));
          p.cancel();
        } else {
          return User.getUserByMphoneExceptSelfAsync(user.id, tmpUser.mphone);
        }
      })
      .then((data) => {
        if (data) {
          res.json(ErrorSerializer.serialize(error('数据异常', '新更改的移动电话已被注册，请更换！')));
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

exports.retrieve = function(req, res, next) {
  var type = req.query.type;
  if (type === '0') {
    getInterestedUser(res, next);
  }
};

function getInterestedUser(res, next) {
  /*
  User.getUserByName('test', function(err, user) {
    if (err) {
      return next(err);
    }
    res.json({desc:'', valid: true, data: user});
  });
  */
  User.getUserByCondition({$or: [{name: 'test'}, {name: 'z'}]}, function(err, user) {
    if (err) {
      return next(err);
    }
    res.json({desc:'', valid: true, data: user});
  });
}

exports.login = function(req, res){
  //console.log(req.cookies);
  //console.log(app.locals.config.description);
  res.render('user/login', { title: '筑智' });
};

exports.reg = function(req, res) {
  res.render('user/reg', { title: '注册 - 筑智' });
};

exports.tokenAuth = function(req, res, next) {
  
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

exports.signup = function(req, res, next) {
  var user = {};
  //asyn fn
  existUserName(req.body.name, function(err, result) {
    if (err) {
      return next(err);
    }
    if (!result.valid) {
      res.json(result);
      return;
    }
    user.name = result.msg;
    //asyn fn
    existEmail(req.body.email, function(err, result) {
      if (err) {
        return next(err);
      }
      if (!result.valid) {
        res.json(result);
        return;
      }
      user.email = result.msg;
      //syn fn
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
      user.password = sha1(filteredPassword.msg);

      //asyn fn
      User.newAndSave(user.name, user.email, user.password, false, function(err) {
        if (err) {
          return next(err);
        }
        mail.sendActiveMail(user.name, user.email, md5(user.email + config.cookieSecret));
        res.json({desc: '欢迎加入' + config.name + '社区！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号，谢谢！', msg: '筑智提示：', valid: true});
      });
    });
  });
};



/**
 * According cookie allow users automatically signin.
 */
exports.isSignin = function(req, res, next) {
  if (req.tokenId) {
    //res.redirect('/administrate/home.html');
    res.json({desc: '', valid: true});
  }
};

exports.activeAccount = function(req, res, next) {
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
    if (!user || md5(user.email + config.cookieSecret) !== key) {
      return res.render('notify', {header: '', body: '信息有误，帐号无法被激活。'});
    } 
    if (user.active) {
      return res.render('notify', {header: '', body: '帐号已经是激活状态，请<a href="/app">登录</a>。'});
    }
    user.active = true;
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.render('notify', {header: '', body: '帐号已被激活，请<a href="/app">登录</a>。'});
    });
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

function filterUserName(username) {
  if (typeof username === 'undefined') {
    return {desc: '用户名不存在！', msg: '', valid: false};
  }
  username = username.trim().toLowerCase();
  username = sanitize(username).xss();
  if (username === '') {
     return {desc: '用户名不能为空！', msg: '', valid: false};
  }
  try {
    check(username, '用户名只能使用0-9，a-z，A-Z，_。').regex(/^\w+$/g);
  } catch(e) {
    return {desc: e.message, msg: '', valid: false};
  }
  return {desc: '', msg: username, valid: true};
}

function filterEmail(email) {
  if (typeof email === 'undefined') {
    return {desc: '邮箱地址不存在！', msg: '', valid: false};
  }
  email = email.trim().toLowerCase();
  email = sanitize(email).xss();
  if (email === '') {
     return {desc: '邮箱地址不能为空！', msg: '', valid: false};
  }
  try {
    check(email, '请输入正确的邮箱地址！').isEmail();
  } catch(e) {
    return {desc: e.message, msg: '',  valid: false};
  }
  return {desc: '', msg: email, valid: true};
}

function filterPassword(password) {
  if (typeof password === 'undefined') {
    return {desc: '密码不存在！', msg: '', valid: false};
  }
  password = sanitize(password.trim()).xss();
  if (password === '') {
    return {desc: '密码不能为空！', msg: '', valid: false};
  }
  try {
    check(password, '密码至少6个字符，最多20个字符！').len(6, 20);
  } catch(e) {
    return{desc: e.message, msg: '', valid: false};
  }
  return {desc: '', msg: password, valid: true}; 
}

function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

function sha1(str) {
  var sha1sum = crypto.createHash('sha1');
  sha1sum.update(str);
  str = sha1sum.digest('hex');
  return str;
}

function setCookie(user, res) {
  var token = encrypt(user._id + '\t' + user.name + '\t' + user.password + '\t' + user.email, config.cookieSecret);
  //cookie有效期30天 1000 * 60 * 60 * 24 *30
  res.cookie(config.token, token, {path: '/', maxAge: 30 * 24 * 60 * 60 * 1000});
  res.cookie(config.tokenStatus, true);
  res.cookie(config.tokenId, user._id);
}

function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function randomString(size) {
  size = size || 6;
  var metaStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var maxLenth = metaStr.length;
  var randomStr = '';
  while (size > 0) {
    randomStr += metaStr.charAt(Math.floor(Math.random() * maxLenth));
    size--;
  }
  return randomStr;
}