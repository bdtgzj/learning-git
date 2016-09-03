/**
 * Proxy - Scene
 */

var mongoose = require('mongoose');
var SceneSchema = require('../models').SceneSchema;

var getAggregate = function(uid, condition) {
  return [
    { $match: condition },
    { $lookup: { from: "icons", localField: "iconId", foreignField: "_id", as: "icon_docs" } },
    { $lookup: { from: "colors", localField: "colorId", foreignField: "_id", as: "color_docs" } },
    { $lookup: { from: "region_" + uid, localField: "regionId", foreignField: "_id", as: "region_docs" } },
    { $unwind: {path: "$icon_docs", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$color_docs", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$region_docs", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, iconId: 1, colorId: 1, regionId: 1, categoryId: 1, iconName: "$icon_docs.name", icon: "$icon_docs.icon", colorName: "$color_docs.name", color: "$color_docs.color", regionName: "$region_docs.name",order: 1 } }
  ]
};

exports.retrieve = function(uid, page, condition, callback) {
  var Scene = mongoose.model('Scene_' + uid, SceneSchema);
  var aggr = getAggregate(uid, condition);
  Scene.aggregate(aggr).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
};

exports.retrieveOne = function(uid, sceneId, callback) {
  var Scene = mongoose.model('Scene_' + uid, SceneSchema);
  var aggr = getAggregate(uid, {_id: mongoose.Types.ObjectId(sceneId)});
  Scene.aggregate(aggr, callback);
};

/*
exports.getSceneById = function(uid, sceneId, callback) {
  var Scene = mongoose.model('Scene_' + uid, SceneSchema);
  Scene.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(sceneId) } },
    { $lookup: { from: "region_" + uid, localField: "regionId", foreignField: "_id", as: "regionName" } },
    { $unwind: {path: "$regionName", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, icon: 1, color: 1, regionId: 1, regionName: "$regionName.name" ,order: 1 } }
  ], callback);
};

exports.getSceneByRegion = function(uid, regionId, callback) {
  var Scene = mongoose.model('Scene_' + uid, SceneSchema);
  Scene.aggregate([
    { $match: { regionId: mongoose.Types.ObjectId(regionId) } },
    { $lookup: { from: "region_" + uid, localField: "regionId", foreignField: "_id", as: "regionName" } },
    { $unwind: {path: "$regionName", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, icon: 1, color: 1, regionId: 1, regionName: "$regionName.name" ,order: 1 } }
  ], callback);
};
*/

exports.create = function(uid, scene, callback) {
  var Scene = mongoose.model('Scene_' + uid, SceneSchema);
  Scene.create(scene, function(err, scene) {
    if (err) {
      return callback(err);
    }
    var aggr = getAggregate(uid, {_id: scene._id});
    Scene.aggregate(aggr, callback);
  });
};

exports.updateOne = function(uid, id, scene, callback) {
  var Scene = mongoose.model('Scene_' + uid, SceneSchema);
  Scene.findOneAndUpdate({_id: id}, {$set: scene}, {new: true}, function(err, scene) {
    if (err) {
      return callback(err);
    }
    var aggr = getAggregate(uid, {_id: scene._id});
    Scene.aggregate(aggr, callback);
  });
};

exports.deleteOne = function(uid, id, callback) {
  var Scene = mongoose.model('Scene_' + uid, SceneSchema);
  Scene.remove({_id: id}, callback);
};