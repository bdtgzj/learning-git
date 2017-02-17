var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
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

// var hashgen = require("/Users/xiaodongyu/Learning/learning-git/node/libs/hashcrypt.js");
// hashgen.sha1('sxn_168'+'ehome_guru8s');
// hashgen.encrypt('1'+'\t'+'yxdc002'+'\t'+'88d06914018b61c84ec77884a6f53ec033ed1b8c','ehome_guru8c');
// admin6 = 88d06914018b61c84ec77884a6f53ec033ed1b8c
// db.users.update({name: "yxdc002"}, {$set: {password: '88d06914018b61c84ec77884a6f53ec033ed1b8c'}})

// hashgen.sha1('Admin_6'+'ehome_guru8s');
// Admin_6 = 9beccf05867f703e93f8eb1ca122d9da29bae198
// db.users.update({name: "ehg-27"}, {$set: {password: '9beccf05867f703e93f8eb1ca122d9da29bae198'}})

// admin6 = 16b4d433eeef71946e93341822786a196549c2c5
// db.users.save({_id: 1, name:'yxdc002', nickName:'俞晓东', password:'16b4d433eeef71946e93341822786a196549c2c5', email:'yxdc002@ehomeguru.com.cn', mphone: '13222880055', familyId: 17});
// db.users.save({_id: 2, name:'tester', nickName:'tester', password:'16b4d433eeef71946e93341822786a196549c2c5', email:'tester@ehomeguru.com.cn', mphone: '13222881155', familyId: 18});
// db.getIndexes();
// db.users.dropIndex('loginName_1');
// db.users.update({}, {$set: {state: 0}}, {multi: true})
// db.users.update({name: "ehg-27"}, {$set: {password: '88d06914018b61c84ec77884a6f53ec033ed1b8c'}})





