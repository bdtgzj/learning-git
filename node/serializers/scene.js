'use strict';

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('scene', {
  id: '_id',
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  attributes: [
    'name',
    'iconId',
    'icon',
    'iconName',
    'colorId',
    'color',
    'colorName',
    'regionId',
    'regionName',
    'order'
  ]
});