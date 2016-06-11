var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = require('./counter');

var userSchema = new Schema({
  name: {type: String},
  loginName: {type: String},
  password: {type: String},
  email: {type: String},
  mphone: {type: String},
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now},
  state: {type: Number, default: 0},
  retrieveToken: {type: String},
  retrieveTime: {type: Number},
  familyID: {type: Number},
  screenID: {type: Number}
});

userSchema.index({loginName: 1}, {unique: true});
userSchema.index({email: 1}, {unique: true});
userSchema.index({mphone: 1}, {unique: true});

mongoose.model('User', userSchema);

// auto-incremented fields implementation
userSchema.pre('save', function(next) {
  var doc = this;
  Counter.findByIdAndUpdate({_id: 'userid'}, {$inc: {seq: 1}}, function(error, counter) {
    if (error)
      return next(error)
    doc._id = counter.seq;
    next();
  });
});

// admin6 = 16b4d433eeef71946e93341822786a196549c2c5
// db.users.save({_id: 1, name:'俞晓东', loginName:'yxdc002', password:'16b4d433eeef71946e93341822786a196549c2c5', email:'yxdc002@ehomeguru.com.cn', mphone: '13222880055', familyID: 17});