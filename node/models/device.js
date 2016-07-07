var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  name: {type: String},
  regionId: {type: String},
  categoryId: {type: String},
  status: {type: String},
  order: {type: Number}
});

module.exports = DeviceSchema;

// db.device_1.save({name: '空调', regionId: ObjectId("577381aa9d38be3c52cc7b69"), categoryId: ObjectId("577e09e30c008ca55976c96b"), status: '运行', order: 1});
// db.device_1.save({name: '电视机', regionId: ObjectId("577381aa9d38be3c52cc7b69"), categoryId: ObjectId("577e09e30c008ca55976c96b"), status: '运行', order: 2});
// db.device_1.update({}, {$set: {regionId: ObjectId("577381aa9d38be3c52cc7b69"), categoryId: ObjectId("577e09e30c008ca55976c96b")}}, {multi: true});
// db.device_1.aggregate([{$lookup: {from: "region_1", localField: "regionId", foreignField: "_id", as: "regionName"}}, {$lookup: {from: "category_1", localField: "categoryId", foreignField: "_id", as: "categoryName"}}]);