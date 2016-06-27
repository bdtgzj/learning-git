/**
 * 
 */

var mongoose = require('mongoose');
var RegionSchema = require('../models').RegionSchema;

exports.newAndSave = function(name, email, password, active, callback) {

};

exports.getRegion = function(uid, callback) {
  var Region = mongoose.model('Region_' + uid, RegionSchema);
  Region.find(null, callback);
}