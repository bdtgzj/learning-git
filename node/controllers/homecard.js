/**
 * Controllers - homecard
 */
var Homecard = require('../proxy').Homecard;

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var HomecardSerializer = require('../serializers').HomecardSerializer;

exports.retrieve = function(req, res, next) {
  Homecard.getHomecard(req.uid, function(err, homecards) {
    if (err) {
      return next(err);
    }
    res.json(HomecardSerializer.serialize(homecards));
  });
};