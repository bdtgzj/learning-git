/**
 * Model - instruction
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstructionSchema = new Schema({
  name: {type: String},
  instruction: {type: String},
  categoryId: {type: Schema.ObjectId},
  deviceId: {type: Schema.ObjectId},
  sceneId: {type: Schema.ObjectId},
  order: {type: Number}
});

module.exports = InstructionSchema;

// db.instruction_1.save({deviceId: '5773855a9d38be3c52cc7b6c', category: 'switch', instruction: '0 0 0 0 0 6 1 5 72 0', order: 1});
// db.instruction_1.save({deviceId: '577385609d38be3c52cc7b6d', category: 'switch', instruction: '0 0 0 0 0 6 1 5 72 0', order: 2});
// db.instruction_1.update({}, {$set: {category: 'switch'}}, {multi: true});
// db.instruction_1.update({}, {$set: {instruction: '0 0 0 0 0 6 1 5 72 0'}}, {multi: true});
// db.instruction_1.update({}, {$set: {deviceId: ObjectId('5773855a9d38be3c52cc7b6c')}});
// db.instruction_1.update({}, {$set: {sceneId: ObjectId('577f64f76133c770c4db49aa')}});