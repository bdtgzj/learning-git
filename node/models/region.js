var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegionSchema = new Schema({
  name: {type: String},
  order: {type: Number}
});

module.exports = RegionSchema;

// db.region_1.save({name: '主卧', order: 1});