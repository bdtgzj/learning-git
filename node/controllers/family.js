/**
 * Controllers - family
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorFamily = require('../validators').Family;
// error
var error = require('../libs/error');
// proxy
var Family = require('../proxy').Family;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var FamilySerializer = require('../serializers').FamilySerializer;

// Retrieve
exports.retrieve = function(req, res, next) {

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error));
  }

  var validatedNameFidAddress = validatorFamily.validateNameFidAddress(req.query);
  if (!validatedNameFidAddress.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedNameFidAddress.error));
  }

  Family.retrieve(validatedPage.data, validatedNameFidAddress.data, function(err, familys) {
    if (err) {
      return next(err);
    }
    res.json(FamilySerializer.serialize(familys));
  });
};

// Create
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((family) => validatorFamily.validateFamily(family))
    .then((validatedFamily)=>{
      if (!validatedFamily.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedFamily.error));
      }
      Family.create(validatedFamily.data, function(err, family) {
        if (err) {
          return next(err);
        }
        res.json(FamilySerializer.serialize(family));
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

  var validatedFamily = validatorFamily.validateFamily(req.body.data.attributes);
  if (!validatedFamily.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedFamily.error));
  }

  Family.updateOne(validatedID.data, validatedFamily.data, function(err, family) {
    if (err) {
      return next(err);
    }
    res.json(FamilySerializer.serialize(family));
  });
};

// Delete
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedFamily = validatorFamily.validateFamily(req.body.data.attributes);
  if (!validatedFamily.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedFamily.error));
  }

  Family.deleteOne(validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};