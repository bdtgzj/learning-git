/**
 * Controllers - log
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorLog = require('../validators').Log;
// error
var error = require('../libs/error');
// proxy
var Log = require('../proxy').Log;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var LogSerializer = require('../serializers').LogSerializer;

// Retrieve
exports.retrieve = function(req, res, next) {

  var validatedUID = validatorCommon.validateID(req.query.uid);
  if (!validatedUID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUID.error));
  }

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error));
  }

  var validatedCategory = validatorLog.validateCategoryLog(req.query);
  if (!validatedCategory.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedCategory.error));
  }

  Log.retrieve(validatedUID.data, validatedPage.data, validatedCategory.data, function(err, logs) {
    if (err) {
      return next(err);
    }
    res.json(LogSerializer.serialize(logs));
  });
};

// Create
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((log) => validatorLog.validateLog(log))
    .then((validatedLog)=>{
      if (!validatedLog.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedLog.error));
      }
      var uid = validatedLog.data.uid;
      delete validatedLog.data.uid;
      Log.create(uid, validatedLog.data, function(err, log) {
        if (err) {
          return next(err);
        }
        res.json(LogSerializer.serialize(log));
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

  var validatedLog = validatorLog.validateLog(req.body.data.attributes);
  if (!validatedLog.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedLog.error));
  }

  var uid = validatedLog.data.uid;
  delete validatedLog.data.uid;
  Log.updateOne(uid, validatedID.data, validatedLog.data, function(err, log) {
    if (err) {
      return next(err);
    }
    res.json(LogSerializer.serialize(log));
  });
};

// Delete
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedLog = validatorLog.validateLog(req.body.data.attributes);
  if (!validatedLog.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedLog.error));
  }

  Log.deleteOne(validatedLog.data.uid, validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};