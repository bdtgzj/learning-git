var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegionSchema = new Schema({
  name: {type: String},
  order: {type: Number}
});

module.exports = RegionSchema;

// no s: db.homecard_1s
// db.region_1.save({name: '主卧', order: 1});