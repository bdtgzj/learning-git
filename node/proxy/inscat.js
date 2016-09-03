/**
 * Proxy - Inscat
 */
var Inscat = require('../models').Inscat;

exports.retrieve = function(page, condition, callback) {
  Inscat.find(condition).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
}

exports.create = function(inscat, callback) {
  Inscat.create(inscat, callback);
};

exports.updateOne = function(id, inscat, callback) {
  Inscat.findOneAndUpdate({_id: id}, {$set: inscat}, {new: true}, callback);
};

exports.deleteOne = function(id, callback) {
  Inscat.remove({_id: id}, callback);
};