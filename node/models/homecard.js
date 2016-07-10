var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomecardSchema = new Schema({
  icon: {type: String},
  color: {type: String},
  text: {type: String},
  deviceId: {type: Schema.ObjectId},
  sceneId: {type: Schema.ObjectId}
});

module.exports = HomecardSchema;

// mongoose.model('HomeCard', homecardSchema);

// no s: db.homecard_1s
// db.homecard_1.save({icon: 'ic_menu_home', color: '#FF0000', text: '主卧-电视机', deviceId: ObjectId("577385609d38be3c52cc7b6d")});
// db.homecard_1.save({icon: 'ic_menu_region', color: '#FF0000', text: '主卧-空调', deviceId: ObjectId("5773855a9d38be3c52cc7b6c")});
// db.homecard_1.save({icon: 'ic_menu_scene', color: '#0000FF', text: '主卧-冰箱', deviceId: ObjectId("577f33066133c770c4db49a9")});
// db.homecard_1.save({icon: 'ic_menu_scene', color: '#FF0000', text: '娱乐室-投影仪', deviceId: ObjectId("578085460ea5c8d32330b954")});
// db.homecard_1.save({icon: 'ic_menu_home', color: '#00FF00', text: '主卧-睡觉', sceneId: ObjectId("577f64f76133c770c4db49aa")});
// db.homecard_1.update({}, {icon: 'ic_menu_home', color: '#FF0000',text: '主卧-电视机', deviceId: ObjectId("577385609d38be3c52cc7b6d")});