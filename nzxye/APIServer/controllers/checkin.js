/**
 * Controllers - checkin
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorCheckin = require('../validators').Checkin;
// error
var error = require('../libs/error');
// proxy
var Checkin = require('../proxy').Checkin;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var CheckinSerializer = require('../serializers').CheckinSerializer;

// Retrieve
exports.retrieve = function(req, res, next) {

  var validatedUID = validatorCommon.validateID(req.uid);
  if (!validatedUID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUID.error));
  }

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error));
  }

  var validatedCidCreated = validatorCheckin.validateCidCreated(req.query);
  if (!validatedCidCreated.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedCidCreated.error));
  }

  Checkin.retrieve(validatedUID.data, validatedPage.data, validatedCidCreated.data, function(err, checkins) {
    if (err) {
      return next(err);
    }
    res.json(CheckinSerializer.serialize(checkins));
  });
};

// Create
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((checkin) => validatorCheckin.validateCheckin(checkin))
    .then((validatedCheckin)=>{
      if (!validatedCheckin.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedCheckin.error));
      }
      // var uid = validatedCheckin.data.uid;
      // delete validatedCheckin.data.uid;
      Checkin.create(req.uid, validatedCheckin.data, function(err, checkin) {
        if (err) {
          return next(err);
        }
        res.json(CheckinSerializer.serialize(checkin));
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

  var validatedCheckin = validatorCheckin.validateCheckin(req.body.data.attributes);
  if (!validatedCheckin.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedCheckin.error));
  }

  // var uid = validatedCheckin.data.uid;
  // delete validatedCheckin.data.uid;
  Checkin.updateOne(req.uid, validatedID.data, validatedCheckin.data, function(err, checkin) {
    if (err) {
      return next(err);
    }
    res.json(CheckinSerializer.serialize(checkin));
  });
};

// Delete
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  Checkin.deleteOne(req.uid, validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};