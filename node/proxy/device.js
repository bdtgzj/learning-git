/**
 * Proxy - Device
 */

var mongoose = require('mongoose');
var DeviceSchema = require('../models').DeviceSchema;

exports.newAndSave = function(name, email, password, active, callback) {

};

exports.getDeviceByRegion = function(uid, regionId, callback) {
  var Device = mongoose.model('Device_' + uid, DeviceSchema);
  Device.find({regionId: regionId}, callback);
}