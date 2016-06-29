/**
 *
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {server: { poolSize: 20 }});

mongoose.connection.on('error', function(err) {
  mongoose.disconnect();
  //console.error('connect to mongodb error: ', err.message);
});

mongoose.connection.on('disconnected', function() {
  mongoose.connect(config.db, {server: { poolSize: 1 }});
  //console.error('disconnected.');
});

require('./user');

exports.User = mongoose.model('User');
exports.HomecardSchema = require('./homecard');
exports.RegionSchema = require('./region');
exports.DeviceSchema = require('./device');