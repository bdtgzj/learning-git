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
exports.User = mongoose.model('User');

// schema
exports.LogSchema = require('./log');
exports.CustomerSchema = require('./customer');
exports.CheckinSchema = require('./checkin');