/**
 * 
 */

var mongoose = require('mongoose');
var HomecardSchema = require('../models').HomecardSchema;

var getAggregate = function(uid, condition) {
  return [
    { $match: condition },
    { $lookup: { from: "icons", localField: "iconId", foreignField: "_id", as: "icon_docs" } },
    { $lookup: { from: "colors", localField: "colorId", foreignField: "_id", as: "color_docs" } },
    { $lookup: { from: "device_" + uid, localField: "deviceId", foreignField: "_id", as: "device_docs" } },
    { $lookup: { from: "scene_" + uid, localField: "sceneId", foreignField: "_id", as: "scene_docs" } },
    { $unwind: {path: "$icon_docs", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$color_docs", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$device_docs", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$scene_docs", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, iconId: 1, colorId: 1, deviceId: 1, sceneId: 1, iconName: "$icon_docs.name", icon: "$icon_docs.icon", colorName: "$color_docs.name", color: "$color_docs.color", deviceName: "$device_docs.name", sceneName: "$scene_docs.name" ,order: 1 } }
  ]
};

/*
exports.getHomecard = function(uid, callback) {
  var Homecard = mongoose.model('Homecard_' + uid, HomecardSchema);
  Homecard.find(null, callback);
}
*/

exports.retrieve = function(uid, page, condition, callback) {
  var Homecard = mongoose.model('Homecard_' + uid, HomecardSchema);
  var aggr = getAggregate(uid, condition);
  Homecard.aggregate(aggr).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
};

exports.getHomecardById = function(uid, homecardId, callback) {
  var Homecard = mongoose.model('Homecard_' + uid, HomecardSchema);
  var aggr = getAggregate(uid, {_id: mongoose.Types.ObjectId(homecardId)});
  Homecard.aggregate(aggr, callback);
};

exports.create = function(uid, homecard, callback) {
  var Homecard = mongoose.model('Homecard_' + uid, HomecardSchema);
  Homecard.create(homecard, function(err, homecard) {
    if (err) {
      return callback(err);
    }
    var aggr = getAggregate(uid, {_id: homecard._id});
    Homecard.aggregate(aggr, callback);
  });
};

exports.updateOne = function(uid, id, homecard, callback) {
  var Homecard = mongoose.model('Homecard_' + uid, HomecardSchema);
  Homecard.findOneAndUpdate({_id: id}, {$set: homecard}, {new: true}, function(err, homecard) {
    if (err) {
      return callback(err);
    }
    var aggr = getAggregate(uid, {_id: homecard._id});
    Homecard.aggregate(aggr, callback);
  });
};

exports.deleteOne = function(uid, id, callback) {
  var Homecard = mongoose.model('Homecard_' + uid, HomecardSchema);
  Homecard.remove({_id: id}, callback);
};