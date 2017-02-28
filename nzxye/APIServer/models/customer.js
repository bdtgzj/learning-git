var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name: {type: String},
  nickName: {type: String},
  sex: {type: String},
  idCard: {type: String},
  mphone: {type: String},
  email: {type: String},
  address: {type: String},
  remark: {type: String},
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

// customerSchema.index({name: 1}, {unique: true});
CustomerSchema.index({idCard: 1}, {unique: true});
CustomerSchema.index({email: 1}, {unique: true});
CustomerSchema.index({mphone: 1}, {unique: true});

module.exports = CustomerSchema;