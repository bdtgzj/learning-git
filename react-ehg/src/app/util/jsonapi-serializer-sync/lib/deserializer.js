'use strict';
var _ = require('lodash');
var DeserializerUtils = require('./deserializer-utils');

module.exports = function (opts) {
  if (!opts) { opts = {}; }

  this.deserialize = function (jsonapi) {
    function collection() {
      var payload = [];

      jsonapi.data.forEach(function (record) {
        var deserializerUtils = new DeserializerUtils(jsonapi, record, opts);
        payload.push(deserializerUtils.perform());
      });

      return payload;
    }

    function resource() {
      return new DeserializerUtils(jsonapi, jsonapi.data, opts).perform()
    }

    if (_.isArray(jsonapi.data)) {
      return collection();
    } else {
      return resource();
    }
  };
};
