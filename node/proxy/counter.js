/**
 *
 */

var models = require('../models');
var Counter = models.Counter;

exports.getNextSequence = function (name) {
  var ret = Counter.findAndModify({
    query: { _id: name },
    update: { $inc: { seq: 1 } },
    new: true
  });

  return ret.seq;
}