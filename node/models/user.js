var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = require('./counter');

var userSchema = new Schema({
  _id: {type: Number},
  name: {type: String},
  password: {type: String},
  nickName: {type: String},
  email: {type: String},
  mphone: {type: String},
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now},
  state: {type: Number, default: 1}, // 1=enable, 2=disable, 3=delete
  retrieveToken: {type: String},
  retrieveTime: {type: Number},
  familyId: {type: Schema.ObjectId},
  screenId: {type: Schema.ObjectId}
});

userSchema.index({name: 1}, {unique: true});
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
// db.users.save({_id: 1, name:'yxdc002', nickName:'俞晓东', password:'16b4d433eeef71946e93341822786a196549c2c5', email:'yxdc002@ehomeguru.com.cn', mphone: '13222880055', familyId: 17});
// db.users.save({_id: 2, name:'tester', nickName:'tester', password:'16b4d433eeef71946e93341822786a196549c2c5', email:'tester@ehomeguru.com.cn', mphone: '13222881155', familyId: 18});
// db.getIndexes();
// db.users.dropIndex('loginName_1');
// db.users.update({}, {$set: {state: 0}}, {multi: true})
// db.users.update({}, {$set: {password: '16b4d433eeef71946e93341822786a196549c2c5'}})