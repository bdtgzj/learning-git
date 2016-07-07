var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {type: String},
  order: {type: Number}
});

module.exports = CategorySchema;

// db.category_1.save({name: '电灯', order: 1});