/**
 * Controllers - device
 */
var Device = require('../proxy').Device;

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var DeviceSerializer = require('../serializers').DeviceSerializer;

exports.retrieveByRegion = function(req, res, next) {
  var regionId = req.query.filter;
  Device.getDeviceByRegion(req.uid, regionId, function(err, devices) {
    if (err) {
      return next(err);
    }
    res.json(DeviceSerializer.serialize(devices));
  });
};