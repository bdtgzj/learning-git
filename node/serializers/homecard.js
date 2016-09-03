'use strict';

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('homecard', {
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
    'deviceId',
    'deviceName',
    'sceneId',
    'sceneName',
    'order'
  ]
});