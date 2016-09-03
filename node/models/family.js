var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var familySchema = new Schema({
  name: {type: String},
  fid: {type: Number},
  address: {type: String},
  created: {type: Date, default: Date.now}
});

mongoose.model('Family', familySchema);

// db.familys.save({name: '红色', family: '#FF0000'});
// db.familys.save({name: '绿色', family: '#00FF00'});
// db.familys.save({name: '蓝色', family: '#0000FF'});