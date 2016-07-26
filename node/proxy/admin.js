/**
 *
 */

var models = require('../models');
var Admin = models.Admin;

exports.newAndSave = function(name, email, password, active, callback) {
  var admin = new Admin();
  admin.name = name;
  admin.email = email;
  admin.password = password;
  admin.active = active;
  admin.save(callback);
};

exports.getAdminById = function(id, callback) {
  Admin.findOne({_id: id}, callback);
};

exports.getAdminByName = function(name, callback) {
  Admin.findOne({name: name}, callback);
};

exports.getAdminByEmail = function(email, callback) {
  Admin.findOne({email: email}, callback);
};

exports.getAdminByMphone = function(mphone, callback) {
  Admin.findOne({mphone: mphone}, callback);
};

exports.getAdminByNameExceptSelf = function(id, name, callback) {
  Admin.findOne({name: name, _id: {$ne: id}}, callback);
};

exports.getAdminByEmailExceptSelf = function(id, email, callback) {
  Admin.findOne({email: email, _id: {$ne: id}}, callback);
};

exports.getAdminByMphoneExceptSelf = function(id, mphone, callback) {
  Admin.findOne({mphone: mphone, _id: {$ne: id}}, callback);
};

exports.getAdminByNameEmailMPhonePass = function(name, password, callback) {
  Admin.find({$or: [{name: name}, {email: name}, {mphone: name}], password: password}, callback);
  //此条件查询mongoose只支持find，不支持findOne，mongo shell中是支持findOne的。
  //注：find返回数组[]，不能直接对象操作；findOne返回对象null
};

exports.getAdminByCondition = function(condition, callback) {
  Admin.find(condition, callback);
};

/**
 * Update
 * Update返回
 */
exports.update = function(id, admin, callback) {
  Admin.update({_id: id}, {$set: admin}, callback);
};

// return new document, if {new: true}, than return new document.
exports.updateOne = function(id, admin, callback) {
  Admin.findOneAndUpdate({_id: id}, admin, {new: true}, callback);
};

/**
 * Delete
 * Delete返回
 */
exports.delete = function(id, callback) {
  Admin.remove({_id: id}, callback);
};