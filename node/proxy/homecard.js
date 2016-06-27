/**
 * 
 */

var mongoose = require('mongoose');
var HomecardSchema = require('../models').HomecardSchema;

exports.newAndSave = function(name, email, password, active, callback) {

};

exports.getHomecard = function(uid, callback) {
  var Homecard = mongoose.model('Homecard_' + uid, HomecardSchema);
  Homecard.find(null, callback);
}