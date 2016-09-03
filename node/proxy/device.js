/**
 * Proxy - Device
 */

var mongoose = require('mongoose');
var DeviceSchema = require('../models').DeviceSchema;

var getAggregate = function(uid, condition) {
  return [
    { $match: condition },
    { $lookup: { from: "icons", localField: "iconId", foreignField: "_id", as: "icon_docs" } },
    { $lookup: { from: "colors", localField: "colorId", foreignField: "_id", as: "color_docs" } },
    { $lookup: { from: "region_" + uid, localField: "regionId", foreignField: "_id", as: "region_docs" } },
    { $lookup: { from: "category_" + uid, localField: "categoryId", foreignField: "_id", as: "category_docs" } },
    { $unwind: {path: "$icon_docs", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$color_docs", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$region_docs", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$category_docs", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, iconId: 1, colorId: 1, regionId: 1, categoryId: 1, iconName: "$icon_docs.name", icon: "$icon_docs.icon", colorName: "$color_docs.name", color: "$color_docs.color", regionName: "$region_docs.name", categoryName: "$category_docs.name", status: 1 ,order: 1 } }
  ]
};

exports.retrieve = function(uid, page, condition, callback) {
  var Device = mongoose.model('Device_' + uid, DeviceSchema);
  var aggr = getAggregate(uid, condition);
  Device.aggregate(aggr).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
};

exports.retrieveOne = function(uid, deviceId, callback) {
  var Device = mongoose.model('Device_' + uid, DeviceSchema);
  var aggr = getAggregate(uid, {_id: mongoose.Types.ObjectId(deviceId)});
  Device.aggregate(aggr, callback);
};

/*
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
*/

exports.create = function(uid, device, callback) {
  var Device = mongoose.model('Device_' + uid, DeviceSchema);
  Device.create(device, function(err, device) {
    if (err) {
      return callback(err);
    }
    var aggr = getAggregate(uid, {_id: device._id});
    Device.aggregate(aggr, callback);
  });
};

exports.updateOne = function(uid, id, device, callback) {
  var Device = mongoose.model('Device_' + uid, DeviceSchema);
  Device.findOneAndUpdate({_id: id}, {$set: device}, {new: true}, function(err, device) {
    if (err) {
      return callback(err);
    }
    var aggr = getAggregate(uid, {_id: device._id});
    Device.aggregate(aggr, callback);
  });
};

exports.deleteOne = function(uid, id, callback) {
  var Device = mongoose.model('Device_' + uid, DeviceSchema);
  Device.remove({_id: id}, callback);
};