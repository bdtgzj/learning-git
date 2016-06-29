var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  name: {type: String},
  regionId: {type: String},
  categoryId: {type: String},
  status: {type: String},
  order: {type: Number}
});

module.exports = DeviceSchema;

// db.device_1.save({name: '空调', regionId: '5771c1c783bbfa6ec12fe0e9', categoryId: '5771c1c783bbfa6ec12fe0e9', status: '运行', order: 1});
// db.device_1.save({name: '电视机', regionId: '5771c1c783bbfa6ec12fe0e9', categoryId: '5771c1c783bbfa6ec12fe0e9', status: '运行', order: 2});