var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 1}
});

module.exports = mongoose.model('Counter', counterSchema);

// db.counters.insert({_id: "userid", seq: 1});