/**
 * Proxy - Color
 */
var Color = require('../models').Color;

exports.retrieve = function(page, condition, callback) {
  Color.find(condition).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
}

exports.create = function(color, callback) {
  Color.create(color, callback);
};

exports.updateOne = function(id, color, callback) {
  Color.findOneAndUpdate({_id: id}, {$set: color}, {new: true}, callback);
};

exports.deleteOne = function(id, callback) {
  Color.remove({_id: id}, callback);
};