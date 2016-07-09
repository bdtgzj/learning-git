/**
 * Proxy - Scene
 */

var mongoose = require('mongoose');
var SceneSchema = require('../models').SceneSchema;

exports.newAndSave = function(name, email, password, active, callback) {

};

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