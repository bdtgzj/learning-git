/**
 * Proxy - instruction
 */

var mongoose = require('mongoose');
var InstructionSchema = require('../models').InstructionSchema;

exports.newAndSave = function(name, email, password, active, callback) {

};

exports.getInstructionByDevice = function(uid, deviceId, callback) {
  var Instruction = mongoose.model('Instruction_' + uid, InstructionSchema);
  Instruction.find({deviceId: deviceId}, callback);
}