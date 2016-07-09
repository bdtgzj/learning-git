/**
 * Proxy - Device
 */

var mongoose = require('mongoose');
var DeviceSchema = require('../models').DeviceSchema;

exports.newAndSave = function(name, email, password, active, callback) {

};

exports.getDeviceById = function(uid, deviceId, callback) {
  var Device = mongoose.model('Device_' + uid, DeviceSchema);
  Device.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(deviceId) } },
    { $lookup: { from: "region_" + uid, localField: "regionId", foreignField: "_id", as: "regionName" } },
    { $lookup: { from: "category_" + uid, localField: "categoryId", foreignField: "_id", as: "categoryName" } },
    { $unwind: {path: "$regionName", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$categoryName", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, icon: 1, color: 1, regionId: 1, categoryId: 1, regionName: "$regionName.name", categoryName: "$categoryName.name", status: 1 ,order: 1 } }
  ], callback);
};

exports.getDeviceByRegion = function(uid, regionId, callback) {
  var Device = mongoose.model('Device_' + uid, DeviceSchema);
  Device.aggregate([
    { $match: { regionId: mongoose.Types.ObjectId(regionId) } },
    { $lookup: { from: "region_" + uid, localField: "regionId", foreignField: "_id", as: "regionName" } },
    { $lookup: { from: "category_" + uid, localField: "categoryId", foreignField: "_id", as: "categoryName" } },
    { $unwind: {path: "$regionName", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$categoryName", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, icon: 1, color: 1, regionId: 1, categoryId: 1, regionName: "$regionName.name", categoryName: "$categoryName.name", status: 1 ,order: 1 } }
  ], callback);
};

exports.getDeviceByCategory = function(uid, categoryId, callback) {
  var Device = mongoose.model('Device_' + uid, DeviceSchema);
  Device.aggregate([
    { $match: { categoryId: mongoose.Types.ObjectId(categoryId) } },
    { $lookup: { from: "region_" + uid, localField: "regionId", foreignField: "_id", as: "regionName" } },
    { $lookup: { from: "category_" + uid, localField: "categoryId", foreignField: "_id", as: "categoryName" } },
    { $unwind: {path: "$regionName", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$categoryName", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, icon: 1, color: 1, regionId: 1, categoryId: 1, regionName: "$regionName.name", categoryName: "$categoryName.name", status: 1 ,order: 1 } }
  ], callback);
};