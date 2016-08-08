/**
 * Controllers - region
 */
const STRINGS = require('../res/strings');
var validatorRegion = require('../validators').Region;

var error = require('../libs/error');
var ErrorSerializer = require('../serializers').ErrorSerializer;

var Region = require('../proxy').Region;

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var RegionSerializer = require('../serializers').RegionSerializer;

exports.retrieve = function(req, res, next) {

  var validatedUID = validatorRegion.validateUID(req.query.uid);
  if (!validatedUID.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUID.error)));
  }

  var validatedPage = validatorRegion.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error)));
  }

  var validatedName = validatorRegion.validateName(req.query.name);
  if (!validatedName.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedName.error)));
  }

  Region.retrieve(validatedUID.data, validatedPage.data, validatedName.data, function(err, regions) {
    if (err) {
      return next(err);
    }
    res.json(RegionSerializer.serialize(regions));
  });
};

exports.create = function(req, res, next) {
  new JSONAPIDeserializer({keyForAttribute: 'camelCase'}).deserialize(req.body)
    .then((region) => validatorRegion.validateRegion(region))
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

exports.updateOne = function(req, res, next) {
  var validatedID = validatorRegion.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error)));
  }

  var validatedEntity = validatorRegion.validateRegion(req.body.data.attributes);
  if (!validatedEntity.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedEntity.error)));
  }

  var uid = validatedEntity.data.uid;
  delete validatedEntity.data.uid;
  Region.updateOne(uid, validatedID.data, validatedEntity.data, function(err, entity) {
    if (err) {
      return next(err);
    }
    res.json(RegionSerializer.serialize(entity));
  });
};

exports.deleteOne = function(req, res, next) {
  var validatedID = validatorRegion.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error)));
  }

  var validatedEntity = validatorRegion.validateRegion(req.body.data.attributes);
  if (!validatedEntity.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedEntity.error)));
  }

  Region.deleteOne(validatedEntity.data.uid, validatedID.data, function(err, entity) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};