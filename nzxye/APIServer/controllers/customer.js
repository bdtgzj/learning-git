/**
 * Controllers - customer
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorCustomer = require('../validators').Customer;
// error
var error = require('../libs/error');
// proxy
var Customer = require('../proxy').Customer;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var CustomerSerializer = require('../serializers').CustomerSerializer;

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

  var validatedNameMphone = validatorCustomer.validateNameMphone(req.query);
  if (!validatedNameMphone.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedNameMphone.error));
  }

  Customer.retrieve(validatedUID.data, validatedPage.data, validatedNameMphone.data, function(err, customers) {
    if (err) {
      return next(err);
    }
    res.json(CustomerSerializer.serialize(customers));
  });
};

// Create
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((customer) => validatorCustomer.validateCustomer(customer))
    .then((validatedCustomer)=>{
      if (!validatedCustomer.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedCustomer.error));
      }
      // var uid = validatedCustomer.data.uid;
      // delete validatedCustomer.data.uid;
      Customer.create(req.uid, validatedCustomer.data, function(err, customer) {
        if (err) {
          return next(err);
        }
        res.json(CustomerSerializer.serialize(customer));
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

  var validatedCustomer = validatorCustomer.validateCustomer(req.body.data.attributes);
  if (!validatedCustomer.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedCustomer.error));
  }

  // var uid = validatedCustomer.data.uid;
  // delete validatedCustomer.data.uid;
  Customer.updateOne(req.uid, validatedID.data, validatedCustomer.data, function(err, customer) {
    if (err) {
      return next(err);
    }
    res.json(CustomerSerializer.serialize(customer));
  });
};

// Delete
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  Customer.deleteOne(req.uid, validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};