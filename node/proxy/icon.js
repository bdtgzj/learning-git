/**
 * Proxy - Icon
 */
var Icon = require('../models').Icon;

exports.retrieve = function(page, condition, callback) {
  Icon.find(condition).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
}

exports.create = function(icon, callback) {
  Icon.create(icon, callback);
};

exports.updateOne = function(id, icon, callback) {
  Icon.findOneAndUpdate({_id: id}, {$set: icon}, {new: true}, callback);
};

exports.deleteOne = function(id, callback) {
  Icon.remove({_id: id}, callback);
};