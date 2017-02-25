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
  screenId: {type: Schema.ObjectId},
  isAdmin: {type: Number, default: 1} // 1=user, 2=admin
});

userSchema.index({name: 1}, {unique: true});
userSchema.index({email: 1}, {unique: true});
userSchema.index({mphone: 1}, {unique: true});

mongoose.model('User', userSchema);

// var hashgen = require("/Users/xiaodongyu/Learning/learning-git/nzxye/APIServer/libs/hashcrypt.js");
// hashgen.sha256('admin6'+'nzxye_8s');
// admin6 = 542838eaac3e31a1e3a834884dcd9673fe5de2cea53bbf228fffae7658f0dc13
// hashgen.encrypt('58a7f563abdbe0f17df3bed5'+'\t'+'nzxye'+'\t'+'542838eaac3e31a1e3a834884dcd9673fe5de2cea53bbf228fffae7658f0dc13','nzxye_8c');
// admin6 = a26d6497de5e14acbf456855cee25a4fcde094154653584ef2f01f620df50f5c8ded9acd775294ad41c44e801d5efcbb7263d3b21011cca49756293bf7e68816be96d825b3ec0f1cc4e005c4c0a638b19a6e4b59d58f901f98b52e0106ab7fc5
// db.users.update({name: "nzxye"}, {$set: {password: '542838eaac3e31a1e3a834884dcd9673fe5de2cea53bbf228fffae7658f0dc13'}})
// db.users.save({name:'nzxye', nickName:'俞晓东', password:'542838eaac3e31a1e3a834884dcd9673fe5de2cea53bbf228fffae7658f0dc13', email:'it@nzxye.com', mphone:'13222880055'});

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





