/**
 * Controllers - category
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorCategory = require('../validators').Category;
// error
var error = require('../libs/error');
var ErrorSerializer = require('../serializers').ErrorSerializer;
// proxy
var Category = require('../proxy').Category;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var CategorySerializer = require('../serializers').CategorySerializer;

// Retrieve
exports.retrieve = function(req, res, next) {

  var validatedUID = validatorCommon.validateUID(req.query.uid);
  if (!validatedUID.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUID.error)));
  }

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error)));
  }

  var validatedName = validatorCategory.validateName(req.query.name);
  if (!validatedName.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedName.error)));
  }

  Category.retrieve(validatedUID.data, validatedPage.data, validatedName.data, function(err, categorys) {
    if (err) {
      return next(err);
    }
    res.json(CategorySerializer.serialize(categorys));
  });
};

// Create
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((category) => validatorCategory.validateCategory(category))
    .then((validatedCategory)=>{
      if (!validatedCategory.isValid) {
        return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedCategory.error)));
      }
      var uid = validatedCategory.data.uid;
      delete validatedCategory.data.uid;
      Category.create(uid, validatedCategory.data, function(err, category) {
        if (err) {
          return next(err);
        }
        res.json(CategorySerializer.serialize(category));
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

  var validatedCategory = validatorCategory.validateCategory(req.body.data.attributes);
  if (!validatedCategory.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedCategory.error)));
  }

  var uid = validatedCategory.data.uid;
  delete validatedCategory.data.uid;
  Category.updateOne(uid, validatedID.data, validatedCategory.data, function(err, category) {
    if (err) {
      return next(err);
    }
    res.json(CategorySerializer.serialize(category));
  });
};

// Delete
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error)));
  }

  var validatedCategory = validatorCategory.validateCategory(req.body.data.attributes);
  if (!validatedCategory.isValid) {
    return res.json(ErrorSerializer.serialize(error(STRINGS.ERROR_EXCEPTION_DATA, validatedCategory.error)));
  }

  Category.deleteOne(validatedCategory.data.uid, validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};