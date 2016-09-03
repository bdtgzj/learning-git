var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
  log: {type: String},
  category: {type: Number}, // 1: login; 2: operation;
  ip: {type: String},
  created: {type: Date, default: Date.now}
});

LogSchema.index({category: 1});

module.exports = LogSchema;