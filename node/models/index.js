/**
 *
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {server: { poolSize: 1 }});

mongoose.connection.on('error', function(err) {
  mongoose.disconnect();
  //console.error('connect to mongodb error: ', err.message);
});

mongoose.connection.on('disconnected', function() {
  mongoose.connect(config.db, {server: { poolSize: 1 }});
  //console.error('disconnected.');
});

require('./node');
require('./leaf');
require('./tag');
require('./tag_leaf');
require('./favour');
require('./favorites');
require('./comment');
require('./reply');
require('./user');

exports.Node = mongoose.model('Node');
exports.Leaf = mongoose.model('Leaf');
exports.Tag = mongoose.model('Tag');
exports.TagLeaf = mongoose.model('TagLeaf');
exports.Favour = mongoose.model('Favour');
exports.Favorites = mongoose.model('Favorites');
exports.Comment = mongoose.model('Comment');
exports.Reply = mongoose.model('Reply');
exports.User = mongoose.model('User');