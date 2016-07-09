var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomecardSchema = new Schema({
  icon: {type: String},
  color: {type: String},
  text: {type: String},
  deviceId: {type: Schema.ObjectId}
});

module.exports = HomecardSchema;

// mongoose.model('HomeCard', homecardSchema);

// no s: db.homecard_1s
// db.homecard_1.save({icon: 'ic_menu_home', color: '#FF0000', text: '主卧-电视机', deviceId: ObjectId("577385609d38be3c52cc7b6d")});
// db.homecard_1.update({}, {icon: 'ic_menu_home', color: '#FF0000',text: '主卧-电视机', deviceId: ObjectId("577385609d38be3c52cc7b6d")});