/**
 * Controllers - homecard
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorHomecard = require('../validators').Homecard;
// error
var error = require('../libs/error');
// proxy
var Homecard = require('../proxy').Homecard;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var HomecardSerializer = require('../serializers').HomecardSerializer;

/*
exports.retrieve = function(req, res, next) {
  Homecard.getHomecard(req.uid, function(err, homecards) {
    if (err) {
      return next(err);
    }
    res.json(HomecardSerializer.serialize(homecards));
  });
};
*/

/**
 * Retrieve
 */
exports.retrieve = function(req, res, next) {
  var validatedUID = validatorCommon.validateUID(req.query.uid);
  if (!validatedUID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUID.error));
  }

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error));
  }
  // page.limit must positive for aggregate
  if (!validatedPage.data.limit) validatedPage.data.limit = CONFIG.MONGOOSE.AGGREGATE_QUERY_LIMIT;

  var validatedIdName = validatorHomecard.validateIdName(req.query);
  if (!validatedIdName.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedIdName.error));
  }

  Homecard.retrieve(validatedUID.data, validatedPage.data, validatedIdName.data, function(err, homecards) {
    if (err) {
      return next(err);
    }
    res.json(HomecardSerializer.serialize(homecards));
  });
};

exports.retrieveOne = function(req, res, next) {
  if (req.params.id) {
    Homecard.getHomecardById(req.uid, req.params.id, function(err, homecards) {
      if (err) {
        return next(err);
      }
      res.json(HomecardSerializer.serialize(homecards));
    });
  }
};

/**
 * Create
 */
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((homecard) => validatorHomecard.validateHomecard(homecard))
    .then((validatedHomecard)=>{
      if (!validatedHomecard.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedHomecard.error));
      }
      var uid = validatedHomecard.data.uid;
      delete validatedHomecard.data.uid;
      Homecard.create(uid, validatedHomecard.data, function(err, homecards) {
        if (err) {
          return next(err);
        }
        res.json(HomecardSerializer.serialize(homecards[0]));
      });
    })
    .catch((err)=>{
      return next(err);
    });
};

/**
 * Update
 */
exports.updateOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedHomecard = validatorHomecard.validateHomecard(req.body.data.attributes);
  if (!validatedHomecard.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedHomecard.error));
  }

  var uid = validatedHomecard.data.uid;
  delete validatedHomecard.data.uid;
  Homecard.updateOne(uid, validatedID.data, validatedHomecard.data, function(err, homecards) {
    if (err) {
      return next(err);
    }
    res.json(HomecardSerializer.serialize(homecards[0]));
  });
};

/**
 * Delete
 */
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedHomecard = validatorHomecard.validateHomecard(req.body.data.attributes);
  if (!validatedHomecard.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedHomecard.error));
  }

  Homecard.deleteOne(validatedHomecard.data.uid, validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};