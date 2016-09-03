'use strict';

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('device', {
  id: '_id',
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  attributes: [
    'name',
    'iconId',
    'iconName',
    'icon',
    'colorId',
    'colorName',
    'color',
    'regionId',
    'regionName',
    'categoryId',
    'categoryName',
    'status',
    'order'
  ]
});