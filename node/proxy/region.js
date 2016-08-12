/**
 * Proxy - Region
 */

var mongoose = require('mongoose');
var RegionSchema = require('../models').RegionSchema;

exports.retrieve = function(uid, page, condition, callback) {
  var Region = mongoose.model('Region_' + uid, RegionSchema);
  Region.find(condition).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
}

exports.create = function(uid, region, callback) {
  var Region = mongoose.model('Region_' + uid, RegionSchema);
  Region.create(region, callback);
};

exports.updateOne = function(uid, id, region, callback) {
  var Region = mongoose.model('Region_' + uid, RegionSchema);
  Region.findOneAndUpdate({_id: id}, {$set: region}, {new: true}, callback);
};

exports.deleteOne = function(uid, id, callback) {
  var Region = mongoose.model('Region_' + uid, RegionSchema);
  Region.remove({_id: id}, callback);
};