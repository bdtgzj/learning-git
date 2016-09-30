/**
 * Proxy - instruction
 */

var mongoose = require('mongoose');
var InstructionSchema = require('../models').InstructionSchema;

var getAggregate = function(uid, condition) {
  return [
    { $match: condition },
    { $lookup: { from: "inscats", localField: "categoryId", foreignField: "_id", as: "inscat_docs" } },
    { $lookup: { from: "device_" + uid, localField: "deviceId", foreignField: "_id", as: "device_docs" } },
    { $lookup: { from: "scene_" + uid, localField: "sceneId", foreignField: "_id", as: "scene_docs" } },
    { $unwind: {path: "$inscat_docs", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$device_docs", preserveNullAndEmptyArrays: true} },
    { $unwind: {path: "$scene_docs", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, instruction: 1, categoryId: 1, deviceId: 1, sceneId: 1, categoryName: "$inscat_docs.name", deviceName: "$device_docs.name", sceneName: "$scene_docs.name", order: 1 } }
  ]
};

exports.retrieve = function(uid, page, condition, callback) {
  var Instruction = mongoose.model('Instruction_' + uid, InstructionSchema);
  var aggr = getAggregate(uid, condition);
  Instruction.aggregate(aggr).skip(page.skip).limit(page.limit).sort({order: page.sort}).exec(callback);
};

exports.getInstructionByScene = function(uid, sceneId, callback) {
  var Instruction = mongoose.model('Instruction_' + uid, InstructionSchema);
  // Instruction.find({sceneId: mongoose.Types.ObjectId(sceneId)}, callback);
  var aggr = [
    { $match: {sceneId: mongoose.Types.ObjectId(sceneId)} },
    { $lookup: { from: "inscats", localField: "categoryId", foreignField: "_id", as: "inscat_docs" } },
    { $unwind: {path: "$inscat_docs", preserveNullAndEmptyArrays: true} },
    { $project: { name: 1, instruction: 1, categoryId: 1, deviceId: 1, sceneId: 1, categoryName: "$inscat_docs.name", order: 1 } }
  ];
  Instruction.aggregate(aggr).exec(callback);
};
/*
exports.getInstructionByDevice = function(uid, deviceId, callback) {
  var Instruction = mongoose.model('Instruction_' + uid, InstructionSchema);
  Instruction.find({deviceId: mongoose.Types.ObjectId(deviceId)}, callback);
};
*/

exports.create = function(uid, instruction, callback) {
  var Instruction = mongoose.model('Instruction_' + uid, InstructionSchema);
  Instruction.create(instruction, function(err, instruction) {
    if (err) {
      return callback(err);
    }
    var aggr = getAggregate(uid, {_id: instruction._id});
    Instruction.aggregate(aggr, callback);
  });
};

exports.updateOne = function(uid, id, instruction, callback) {
  var Instruction = mongoose.model('Instruction_' + uid, InstructionSchema);
  Instruction.findOneAndUpdate({_id: id}, {$set: instruction}, {new: true}, function(err, instruction) {
    if (err) {
      return callback(err);
    }
    var aggr = getAggregate(uid, {_id: instruction._id});
    Instruction.aggregate(aggr, callback);
  });
};

exports.deleteOne = function(uid, id, callback) {
  var Instruction = mongoose.model('Instruction_' + uid, InstructionSchema);
  Instruction.remove({_id: id}, callback);
};