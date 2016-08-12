/**
 * Controllers - icon
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorIcon = require('../validators').Icon;
// error
var error = require('../libs/error');
var ErrorSerializer = require('../serializers').ErrorSerializer;
// proxy
var Icon = require('../proxy').Icon;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var IconSerializer = require('../serializers').IconSerializer;

// Retrieve
exports.retrieve = function(req, res, next) {

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error)));
  }

  var validatedName = validatorIcon.validateName(req.query.name);
  if (!validatedName.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedName.error)));
  }

  Icon.retrieve(validatedPage.data, validatedName.data, function(err, icons) {
    if (err) {
      return next(err);
    }
    res.json(IconSerializer.serialize(icons));
  });
};

// Create
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((icon) => validatorIcon.validateIcon(icon))
    .then((validatedIcon)=>{
      if (!validatedIcon.isValid) {
        return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedIcon.error)));
      }
      Icon.create(validatedIcon.data, function(err, icon) {
        if (err) {
          return next(err);
        }
        res.json(IconSerializer.serialize(icon));
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

  var validatedIcon = validatorIcon.validateIcon(req.body.data.attributes);
  if (!validatedIcon.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedIcon.error)));
  }

  Icon.updateOne(validatedID.data, validatedIcon.data, function(err, icon) {
    if (err) {
      return next(err);
    }
    res.json(IconSerializer.serialize(icon));
  });
};

// Delete
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error)));
  }

  var validatedIcon = validatorIcon.validateIcon(req.body.data.attributes);
  if (!validatedIcon.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedIcon.error)));
  }

  Icon.deleteOne(validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};