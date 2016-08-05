/**
 * Controllers - region
 */
var validatorBusiness = require('../libs/validator_business');
var error = require('../libs/error');
var ErrorSerializer = require('../serializers').ErrorSerializer;

var Region = require('../proxy').Region;

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var RegionSerializer = require('../serializers').RegionSerializer;

exports.retrieve = function(req, res, next) {

  var uid = validatorBusiness.validateUID(req.query.uid);
  if (!uid.isValid) {
    return res.json(ErrorSerializer.serialize(error('数据异常', uid.error)));
  }

  var page = validatorBusiness.validatePage(req.query.page);
  if (!page.isValid) {
    return res.json(ErrorSerializer.serialize(error('数据异常', page.error)));
  }

  Region.getRegion(uid.data, page.data, function(err, regions) {
    if (err) {
      return next(err);
    }
    res.json(RegionSerializer.serialize(regions));
  });
};

exports.create = function(req, res, next) {
  new JSONAPIDeserializer({keyForAttribute: 'camelCase'}).deserialize(req.body)
    .then((region) => validatorBusiness.validateRegion(region))
    .then((validatedRegion)=>{
      if (!validatedRegion.isValid) {
        return res.json(ErrorSerializer.serialize(error('数据异常', validatedRegion.error)));
      }
      var uid = validatedRegion.data.uid;
      delete validatedRegion.data.uid;
      Region.create(uid, validatedRegion.data, function(err, region) {
        if (err) {
          return next(err);
        }
        res.json(RegionSerializer.serialize(region));
      });
    })
    .catch((err)=>{
      return next(err);
    });
};