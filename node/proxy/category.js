/**
 * Proxy - category.js
 */

var mongoose = require('mongoose');
var CategorySchema = require('../models').CategorySchema;

exports.retrieve = function(uid, page, condition, callback) {
  var Category = mongoose.model('Category_' + uid, CategorySchema);
  Category.find(condition).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
}

exports.create = function(uid, category, callback) {
  var Category = mongoose.model('Category_' + uid, CategorySchema);
  Category.create(category, callback);
};

exports.updateOne = function(uid, id, category, callback) {
  var Category = mongoose.model('Category_' + uid, CategorySchema);
  Category.findOneAndUpdate({_id: id}, {$set: category}, {new: true}, callback);
};

exports.deleteOne = function(uid, id, callback) {
  var Category = mongoose.model('Category_' + uid, CategorySchema);
  Category.remove({_id: id}, callback);
};