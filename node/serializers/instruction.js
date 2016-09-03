'use strict';

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('instruction', {
  id: '_id',
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  attributes: [
    'name',
    'instruction',
    'categoryId',
    'categoryName',
    'deviceId',
    'deviceName',
    'sceneId',
    'sceneName',
    'order'
  ]
});