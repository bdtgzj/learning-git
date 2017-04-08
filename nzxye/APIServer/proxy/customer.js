/**
 * Proxy - customer.js
 */

var mongoose = require('mongoose');
var CustomerSchema = require('../models').CustomerSchema;

exports.retrieve = function(uid, page, condition, callback) {
  var Customer = mongoose.model('Customer_' + uid, CustomerSchema);
  Customer.find(condition).skip(page.skip).limit(page.limit).sort({created: page.sort}).exec(callback);
}

exports.retrieveOne = function(uid, id, callback) {
  var Customer = mongoose.model('Customer_' + uid, CustomerSchema);
  Customer.findOne({_id: mongoose.Types.ObjectId(id)}).exec(callback);
}

exports.create = function(uid, customer, callback) {
  var Customer = mongoose.model('Customer_' + uid, CustomerSchema);
  Customer.create(customer, callback);
};

exports.updateOne = function(uid, id, customer, callback) {
  var Customer = mongoose.model('Customer_' + uid, CustomerSchema);
  Customer.findOneAndUpdate({_id: id}, {$set: customer}, {new: true}, callback);
};

exports.deleteOne = function(uid, id, callback) {
  var Customer = mongoose.model('Customer_' + uid, CustomerSchema);
  Customer.remove({_id: id}, callback);
};