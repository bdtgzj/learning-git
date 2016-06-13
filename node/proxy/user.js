/**
 *
 */

var models = require('../models');
var User = models.User;

exports.newAndSave = function(name, email, password, active, callback) {
  var user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  user.active = active;
  user.save(callback);
};

exports.getUserById = function(id, callback) {
  User.findOne({_id: id}, callback);
};

exports.getUserByEmail = function(email, callback) {
  User.findOne({email: email}, callback);
};

exports.getUserByName = function(name, callback) {
  User.findOne({name: name}, callback);
};

exports.getUserByNameEmailMPhonePass = function(name, password, callback) {
  User.find({$or: [{loginName: name}, {email: name}, {mphone: name}], password: password}, callback);
  //此条件查询mongoose只支持find，不支持findOne，mongo shell中是支持findOne的。
  //注：find返回数组[]，不能直接对象操作；findOne返回对象null
};

exports.getUserByCondition = function(condition, callback) {
  User.find(condition, callback);
};