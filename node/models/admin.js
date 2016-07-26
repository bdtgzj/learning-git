var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  name: {type: String},
  password: {type: String},
  nickName: {type: String},
  email: {type: String},
  mphone: {type: String},
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now},
  state: {type: Number, default: 0},
  retrieveToken: {type: String},
  retrieveTime: {type: Number},
  screenId: {type: Number}
});

adminSchema.index({name: 1}, {unique: true});
adminSchema.index({email: 1}, {unique: true});
adminSchema.index({mphone: 1}, {unique: true});

mongoose.model('Admin', adminSchema);

// admin6 = 16b4d433eeef71946e93341822786a196549c2c5
// db.admins.save({ name:'yxdc002', nickName:'俞晓东', password:'16b4d433eeef71946e93341822786a196549c2c5', email:'yxdc002@ehomeguru.com.cn', mphone: '13222880055'});