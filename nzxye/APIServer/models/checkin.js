var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckinSchema = new Schema({
  cid: {type: Schema.ObjectId}, // customer id
  remark: {type: String},
  created: {type: Date, default: Date.now}
});

module.exports = CheckinSchema;

// db.log_58a7f563abdbe0f17df3bed5.find({created: {$gte: ISODate('2017-02-25T00:00:00Z'), $lte: ISODate('2017-02-27T24:00:00Z')}});