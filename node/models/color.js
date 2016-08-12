var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var colorSchema = new Schema({
  name: {type: String},
  color: {type: String},
  order: {type: Number}
});

mongoose.model('Color', colorSchema);

// db.colors.save({name: '红色', color: '#FF0000', order: 1});
// db.colors.save({name: '绿色', color: '#00FF00', order: 2});
// db.colors.save({name: '蓝色', color: '#0000FF', order: 3});
// db.color.renameCollection('colors');