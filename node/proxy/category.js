/**
 * Proxy - Category
 */

var mongoose = require('mongoose');
var CategorySchema = require('../models').CategorySchema;

exports.newAndSave = function(name, email, password, active, callback) {

};

exports.getCategory = function(uid, callback) {
  var Category = mongoose.model('Category_' + uid, CategorySchema);
  Category.find(null, callback);
}