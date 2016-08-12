/**
 * Controllers - color
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorColor = require('../validators').Color;
// error
var error = require('../libs/error');
var ErrorSerializer = require('../serializers').ErrorSerializer;
// proxy
var Color = require('../proxy').Color;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var ColorSerializer = require('../serializers').ColorSerializer;

// Retrieve
exports.retrieve = function(req, res, next) {

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error)));
  }

  var validatedName = validatorColor.validateName(req.query.name);
  if (!validatedName.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedName.error)));
  }

  Color.retrieve(validatedPage.data, validatedName.data, function(err, colors) {
    if (err) {
      return next(err);
    }
    res.json(ColorSerializer.serialize(colors));
  });
};

// Create
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((color) => validatorColor.validateColor(color))
    .then((validatedColor)=>{
      if (!validatedColor.isValid) {
        return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedColor.error)));
      }
      Color.create(validatedColor.data, function(err, color) {
        if (err) {
          return next(err);
        }
        res.json(ColorSerializer.serialize(color));
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
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error)));
  }

  var validatedColor = validatorColor.validateColor(req.body.data.attributes);
  if (!validatedColor.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedColor.error)));
  }

  Color.updateOne(validatedID.data, validatedColor.data, function(err, color) {
    if (err) {
      return next(err);
    }
    res.json(ColorSerializer.serialize(color));
  });
};

// Delete
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error)));
  }

  var validatedColor = validatorColor.validateColor(req.body.data.attributes);
  if (!validatedColor.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedColor.error)));
  }

  Color.deleteOne(validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};