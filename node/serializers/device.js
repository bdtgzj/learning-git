'use strict';

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('device', {
  id: '_id',
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  attributes: [
    'name',
    'icon',
    'color',
    'regionId',
    'categoryId',
    'regionName',
    'categoryName',
    'status',
    'order'
  ]
});