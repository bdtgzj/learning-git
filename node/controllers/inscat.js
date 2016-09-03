/**
 * Controllers - inscat
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorInscat = require('../validators').Inscat;
// error
var error = require('../libs/error');
// proxy
var Inscat = require('../proxy').Inscat;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var InscatSerializer = require('../serializers').InscatSerializer;

// Retrieve
exports.retrieve = function(req, res, next) {

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error));
  }

  var validatedName = validatorInscat.validateName(req.query.name);
  if (!validatedName.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedName.error));
  }

  Inscat.retrieve(validatedPage.data, validatedName.data, function(err, inscats) {
    if (err) {
      return next(err);
    }
    res.json(InscatSerializer.serialize(inscats));
  });
};

// Create
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((inscat) => validatorInscat.validateInscat(inscat))
    .then((validatedInscat)=>{
      if (!validatedInscat.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedInscat.error));
      }
      Inscat.create(validatedInscat.data, function(err, inscat) {
        if (err) {
          return next(err);
        }
        res.json(InscatSerializer.serialize(inscat));
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

  var validatedInscat = validatorInscat.validateInscat(req.body.data.attributes);
  if (!validatedInscat.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedInscat.error));
  }

  Inscat.updateOne(validatedID.data, validatedInscat.data, function(err, inscat) {
    if (err) {
      return next(err);
    }
    res.json(InscatSerializer.serialize(inscat));
  });
};

// Delete
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedInscat = validatorInscat.validateInscat(req.body.data.attributes);
  if (!validatedInscat.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedInscat.error));
  }

  Inscat.deleteOne(validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};