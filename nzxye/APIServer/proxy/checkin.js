/**
 * Proxy - checkin.js
 */

var mongoose = require('mongoose');
var CheckinSchema = require('../models').CheckinSchema;

var getAggregate = function(uid, condition) {
  return [
    { $match: condition },
    { $lookup: { from: "customers", localField: "cid", foreignField: "_id", as: "customer_docs" } },
    { $unwind: { path: "$customer_docs", preserveNullAndEmptyArrays: true} },
    { $project: { cid: 1, remark: 1, created: 1, name: "$customer_docs.name", nickName: "$customer_docs.nickName", sex: "$customer_docs.sex", idCard: "$customer_docs.idCard", mphone: "$customer_docs.mphone"} }
  ]
};

exports.retrieve = function(uid, page, condition, callback) {
  var Checkin = mongoose.model('Checkin_' + uid, CheckinSchema);
  var aggr = getAggregate(uid, condition);
  Checkin.aggregate(aggr).skip(page.skip).limit(page.limit).sort({created: page.sort}).exec(callback);
}

exports.create = function(uid, checkin, callback) {
  var Checkin = mongoose.model('Checkin_' + uid, CheckinSchema);
  Checkin.create(checkin, callback);
};

exports.updateOne = function(uid, id, checkin, callback) {
  var Checkin = mongoose.model('Checkin_' + uid, CheckinSchema);
  Checkin.findOneAndUpdate({_id: id}, {$set: checkin}, {new: true}, callback);
};

exports.deleteOne = function(uid, id, callback) {
  var Checkin = mongoose.model('Checkin_' + uid, CheckinSchema);
  Checkin.remove({_id: id}, callback);
};