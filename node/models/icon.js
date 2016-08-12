var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var iconSchema = new Schema({
  name: {type: String},
  icon: {type: String},
  order: {type: Number}
});

mongoose.model('Icon', iconSchema);

// db.icons.save({name: '电灯', icon: 'ic_device_light', order: 1});
// db.icons.save({name: '空调', icon: 'ic_device_aircon', order: 2});
// db.icons.save({name: '窗帘', icon: 'ic_device_curtain', order: 3});
// db.icon.renameCollection('icons');