/**
 * Controllers - region
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorRegion = require('../validators').Region;
// error
var error = require('../libs/error');
// proxy
var Region = require('../proxy').Region;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var RegionSerializer = require('../serializers').RegionSerializer;

// Retrieve
exports.retrieve = function(req, res, next) {

  var validatedUID = validatorCommon.validateUID(req.query.uid);
  if (!validatedUID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUID.error));
  }

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error));
  }

  var validatedName = validatorRegion.validateName(req.query.name);
  if (!validatedName.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedName.error));
  }

  Region.retrieve(validatedUID.data, validatedPage.data, validatedName.data, function(err, regions) {
    if (err) {
      return next(err);
    }
    res.json(RegionSerializer.serialize(regions));
  });
};

// Create
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((region) => validatorRegion.validateRegion(region))
    .then((validatedRegion)=>{
      if (!validatedRegion.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedRegion.error));
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

// Update
exports.updateOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedRegion = validatorRegion.validateRegion(req.body.data.attributes);
  if (!validatedRegion.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedRegion.error));
  }

  var uid = validatedRegion.data.uid;
  delete validatedRegion.data.uid;
  Region.updateOne(uid, validatedID.data, validatedRegion.data, function(err, region) {
    if (err) {
      return next(err);
    }
    res.json(RegionSerializer.serialize(region));
  });
};

// Delete
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedRegion = validatorRegion.validateRegion(req.body.data.attributes);
  if (!validatedRegion.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedRegion.error));
  }

  Region.deleteOne(validatedRegion.data.uid, validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};