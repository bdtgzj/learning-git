/**
 * Proxy - Region
 */

var mongoose = require('mongoose');
var RegionSchema = require('../models').RegionSchema;

exports.getRegion = function(uid, page, callback) {
  var Region = mongoose.model('Region_' + uid, RegionSchema);
  Region.find(null).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
}

exports.create = function(uid, region, callback) {
  var Region = mongoose.model('Region_' + uid, RegionSchema);
  Region.create(region, callback);
};