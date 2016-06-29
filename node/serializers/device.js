'use strict';

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('device', {
  id: '_id',
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  attributes: [
    'name',
    'regionId',
    'categoryId',
    'status',
    'order'
  ]
});