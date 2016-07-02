var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstructionSchema = new Schema({
  deviceId: {type: String},
  type: {type: String},
  instruction: {type: String},
  order: {type: Number}
});

module.exports = InstructionSchema;

// db.instruction_1.save({deviceId: '5773855a9d38be3c52cc7b6c', type: 'switch', instruction: '00000000000601054800FF00', order: 1});
// db.instruction_1.save({deviceId: '577385609d38be3c52cc7b6d', type: 'switch', instruction: '000000000006010548000000', order: 2});