var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomecardSchema = new Schema({
  icon: {type: String},
  color: {type: String},
  text: {type: String},
  deviceId: {type: Number}
});

module.exports = HomecardSchema;

// mongoose.model('HomeCard', homecardSchema);

// no s: db.homecard_1s
// db.homecard_1.save({icon: 'ic_menu_home', color: '#FF0000', text: 'Home', deviceId: 1});