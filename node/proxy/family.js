/**
 * Proxy - Family
 */
var Family = require('../models').Family;

exports.retrieve = function(page, condition, callback) {
  Family.find(condition).skip(page.skip).limit(page.limit).sort({created: page.sort}).exec(callback);
}

exports.create = function(family, callback) {
  Family.create(family, callback);
};

exports.updateOne = function(id, family, callback) {
  Family.findOneAndUpdate({_id: id}, {$set: family}, {new: true}, callback);
};

exports.deleteOne = function(id, callback) {
  Family.remove({_id: id}, callback);
};