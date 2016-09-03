var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  name: {type: String},
  iconId: {type: Schema.ObjectId},
  colorId: {type: Schema.ObjectId},
  regionId: {type: Schema.ObjectId},
  categoryId: {type: Schema.ObjectId},
  status: {type: String},
  order: {type: Number}
});

module.exports = DeviceSchema;

// db.device_1.save({name: '空调', icon: 'ic_menu_home', color: '#FF0000', regionId: ObjectId("577381aa9d38be3c52cc7b69"), categoryId: ObjectId("577e09e30c008ca55976c96b"), status: '运行', order: 1});
// db.device_1.save({name: '电视机', icon: 'ic_menu_home', color: '#FF0000', regionId: ObjectId("577381aa9d38be3c52cc7b69"), categoryId: ObjectId("577e09e30c008ca55976c96b"), status: '运行', order: 2});
// db.device_1.save({name: '冰箱', icon: 'ic_menu_home', color: '#FF0000', regionId: ObjectId("577381aa9d38be3c52cc7b69"), categoryId: ObjectId("577e09e30c008ca55976c964"), status: '运行', order: 3});
// db.device_1.save({name: '投影机', icon: 'ic_menu_home', color: '#00FF00', regionId: ObjectId("578063310ea5c8d32330b950"), categoryId: ObjectId("577e09e30c008ca55976c964"), status: '运行', order: 4});
// db.device_1.update({}, {$set: {regionId: ObjectId("577381aa9d38be3c52cc7b69"), categoryId: ObjectId("577e09e30c008ca55976c96b")}}, {multi: true});
// db.device_1.update({}, {$set: {icon: 'ic_menu_home', color: '#FF0000'}}, {multi: true});
// db.device_1.aggregate([{$lookup: {from: "region_1", localField: "regionId", foreignField: "_id", as: "regionName"}}, {$lookup: {from: "category_1", localField: "categoryId", foreignField: "_id", as: "categoryName"}}, {$unwind: {path: "$regionName", preserveNullAndEmptyArrays: true}}, {$unwind: {path: "$categoryName", preserveNullAndEmptyArrays: true}}, {$project: {name: 1, icon: 1, color: 1, regionId: 1, categoryId: 1, regionName: "$regionName.name", categoryName: "$categoryName.name", status:1 ,order: 1}}]);