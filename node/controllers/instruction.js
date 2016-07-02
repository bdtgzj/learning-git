/**
 * Controllers - instruction
 */
var Instruction = require('../proxy').Instruction;

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var InstructionSerializer = require('../serializers').InstructionSerializer;

exports.retrieveByDevice = function(req, res, next) {
  var deviceId = req.query.filter;
  Instruction.getInstructionByDevice(req.uid, deviceId, function(err, instructions) {
    if (err) {
      return next(err);
    }
    res.json(InstructionSerializer.serialize(instructions));
  });
};