/**
 * Proxy - user
 */
var User = require('../models').User;

var getAggregate = function(condition) {
  return [
    { $match: condition },
    { $lookup: { from: "families", localField: "familyId", foreignField: "_id", as: "family_docs" } },
    { $unwind: {path: "$family_docs", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, nickName: 1, email: 1, mphone: 1, state: 1, familyId: 1, created:1, familyName: "$family_docs.name", fid: "$family_docs.fid" } }
  ]
};

/**
 * Retrieve
 * Retrieve返回
 */
exports.retrieve = function(page, condition, callback) {
  var aggr = getAggregate(condition);
  User.aggregate(aggr).skip(page.skip).limit(page.limit).sort({created: page.sort}).exec(callback);
}

exports.getUserById = function(id, callback) {
  User.findOne({_id: id}, callback);
};

exports.getUserByName = function(name, callback) {
  User.findOne({name: name}, callback);
};

exports.getUserByEmail = function(email, callback) {
  User.findOne({email: email}, callback);
};

exports.getUserByMphone = function(mphone, callback) {
  User.findOne({mphone: mphone}, callback);
};

exports.getUserByNameExceptSelf = function(id, name, callback) {
  User.findOne({name: name, _id: {$ne: id}}, callback);
};

exports.getUserByEmailExceptSelf = function(id, email, callback) {
  User.findOne({email: email, _id: {$ne: id}}, callback);
};

exports.getUserByMphoneExceptSelf = function(id, mphone, callback) {
  User.findOne({mphone: mphone, _id: {$ne: id}}, callback);
};

exports.getUserByNameEmailMPhonePass = function(name, password, callback) {
  var aggr = getAggregate({$or: [{name: name}, {email: name}, {mphone: name}], password: password});
  User.aggregate(aggr).exec(callback);
  //User.find({$or: [{name: name}, {email: name}, {mphone: name}], password: password}, callback);
  //此条件查询mongoose只支持find，不支持findOne，mongo shell中是支持findOne的。
  //注：find返回数组[]，不能直接对象操作；findOne返回对象null
};

exports.getUserAll = function(callback) {
  User.find({state: {$eq: 0}}, callback);
};

exports.getUserByCondition = function(condition, callback) {
  User.find(condition, callback);
};

/**
 * Create
 * Create返回
 */
exports.create = function(user, callback) {
  User.create(user, function(err, user) {
    if (err) {
      return callback(err);
    }
    var aggr = getAggregate({_id: user._id});
    User.aggregate(aggr, callback);
  });
};

/**
 * Update
 * Update返回
 */
exports.updateOne = function(id, user, callback) {
  User.findOneAndUpdate({_id: id}, {$set: user}, {new: true}, function(err, user) {
    if (err) {
      return callback(err);
    }
    var aggr = getAggregate({_id: user._id});
    User.aggregate(aggr, callback);
  });
};

/**
 * Delete
 * Delete返回
 */
exports.deleteOne = function(id, callback) {
  User.remove({_id: id}, callback);
};