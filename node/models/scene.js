var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SceneSchema = new Schema({
  name: {type: String},
  iconId: {type: Schema.ObjectId},
  colorId: {type: Schema.ObjectId},
  regionId: {type: Schema.ObjectId},
  order: {type: Number}
});

module.exports = SceneSchema;

// db.scene_1.save({name: '睡觉', icon: 'ic_menu_home', color: '#00FF00', regionId: ObjectId("577381aa9d38be3c52cc7b69"), order: 1});