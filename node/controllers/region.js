/**
 * Controllers - region
 */
var Region = require('../proxy').Region;

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var RegionSerializer = require('../serializers').RegionSerializer;

exports.retrieve = function(req, res, next) {
  Region.getRegion(req.uid, function(err, regions) {
    if (err) {
      return next(err);
    }
    res.json(RegionSerializer.serialize(regions));
  });
};