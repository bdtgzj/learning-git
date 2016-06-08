var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
  seq: {type: Number}
});

mongoose.model('Counter', counterSchema);