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

// model
require('./user');
require('./admin');
require('./icon');
require('./color');
require('./inscat');
require('./family');

exports.User = mongoose.model('User');
exports.Admin = mongoose.model('Admin');
exports.Icon = mongoose.model('Icon');
exports.Color = mongoose.model('Color');
exports.Inscat = mongoose.model('Inscat');
exports.Family = mongoose.model('Family');

// schema
exports.HomecardSchema = require('./homecard');
exports.RegionSchema = require('./region');
exports.CategorySchema = require('./category');
exports.DeviceSchema = require('./device');
exports.SceneSchema = require('./scene');
exports.InstructionSchema = require('./instruction');
exports.LogSchema = require('./log');