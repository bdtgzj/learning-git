/**
 * Proxy - log.js
 */

var mongoose = require('mongoose');
var LogSchema = require('../models').LogSchema;

exports.retrieve = function(uid, page, condition, callback) {
  var Log = mongoose.model('Log_' + uid, LogSchema);
  Log.find(condition).skip(page.skip).limit(page.limit).sort({created: page.sort}).exec(callback);
}

exports.create = function(uid, log, callback) {
  var Log = mongoose.model('Log_' + uid, LogSchema);
  Log.create(log, callback);
};

exports.updateOne = function(uid, id, log, callback) {
  var Log = mongoose.model('Log_' + uid, LogSchema);
  Log.findOneAndUpdate({_id: id}, {$set: log}, {new: true}, callback);
};

exports.deleteOne = function(uid, id, callback) {
  var Log = mongoose.model('Log_' + uid, LogSchema);
  Log.remove({_id: id}, callback);
};