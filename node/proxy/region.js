/**
 * Proxy - Region
 */

var mongoose = require('mongoose');
var RegionSchema = require('../models').RegionSchema;

exports.newAndSave = function(name, email, password, active, callback) {

};

exports.getRegion = function(uid, page, callback) {
  var Region = mongoose.model('Region_' + uid, RegionSchema);
  Region.find(null).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
}