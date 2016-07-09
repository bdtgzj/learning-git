var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegionSchema = new Schema({
  name: {type: String},
  order: {type: Number}
});

module.exports = RegionSchema;

// db.region_1.save({name: '主卧', order: 1});
// db.region_1.save({name: '公共', order: 2});
// db.region_1.save({name: '娱乐室', order: 3});
// db.region_1.save({name: '厨房', order: 4});
// db.region_1.save({name: '儿童房', order: 5});
// db.region_1.save({name: '老人室', order: 6});