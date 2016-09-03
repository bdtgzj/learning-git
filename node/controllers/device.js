/**
 * Controllers - device
 */
//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorDevice = require('../validators').Device;
// error
var error = require('../libs/error');
// proxy
var Device = require('../proxy').Device;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var DeviceSerializer = require('../serializers').DeviceSerializer;

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

  var validatedIdNameRegionCategory = validatorDevice.validateIdNameRegionCategory(req.query);
  if (!validatedIdNameRegionCategory.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedIdNameRegionCategory.error));
  }

  Device.retrieve(validatedUID.data, validatedPage.data, validatedIdNameRegionCategory.data, function(err, devices) {
    if (err) {
      return next(err);
    }
    res.json(DeviceSerializer.serialize(devices));
  });
  /*
  if (req.query.region) {
    Device.getDeviceByRegion(req.uid, req.query.region, function(err, devices) {
      if (err) {
        return next(err);
      }
      res.json(DeviceSerializer.serialize(devices));
    });
  } else if (req.query.category) {
    Device.getDeviceByCategory(req.uid, req.query.category, function(err, devices) {
      if (err) {
        return next(err);
      }
      res.json(DeviceSerializer.serialize(devices));
    });
  }
  */
};

exports.retrieveOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedUID = validatorCommon.validateUID(req.query.uid);
  if (!validatedUID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUID.error));
  }
  
  Device.retrieveOne(validatedUID.data, validatedID.data, function(err, devices) {
    if (err) {
      return next(err);
    }
    res.json(DeviceSerializer.serialize(devices));
  });
};

/**
 * Create
 */
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((device) => validatorDevice.validateDevice(device))
    .then((validatedDevice)=>{
      if (!validatedDevice.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedDevice.error));
      }
      var uid = validatedDevice.data.uid;
      delete validatedDevice.data.uid;
      Device.create(uid, validatedDevice.data, function(err, devices) {
        if (err) {
          return next(err);
        }
        res.json(DeviceSerializer.serialize(devices[0]));
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

  var validatedDevice = validatorDevice.validateDevice(req.body.data.attributes);
  if (!validatedDevice.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedDevice.error));
  }

  var uid = validatedDevice.data.uid;
  delete validatedDevice.data.uid;
  Device.updateOne(uid, validatedID.data, validatedDevice.data, function(err, devices) {
    if (err) {
      return next(err);
    }
    res.json(DeviceSerializer.serialize(devices[0]));
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

  var validatedDevice = validatorDevice.validateDevice(req.body.data.attributes);
  if (!validatedDevice.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedDevice.error));
  }

  Device.deleteOne(validatedDevice.data.uid, validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};