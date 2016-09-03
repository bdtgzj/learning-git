var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inscatSchema = new Schema({
  name: {type: String},
  order: {type: Number}
});

mongoose.model('Inscat', inscatSchema);

// db.inscats.save({name: '开关', order: 1});