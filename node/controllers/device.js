/**
 * Controllers - device
 */
var Device = require('../proxy').Device;

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var DeviceSerializer = require('../serializers').DeviceSerializer;

exports.retrieve = function(req, res, next) {
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
};

exports.retrieveOne = function(req, res, next) {
  if (req.params.id) {
    Device.getDeviceById(req.uid, req.params.id, function(err, devices) {
      if (err) {
        return next(err);
      }
      res.json(DeviceSerializer.serialize(devices));
    });
  }
};