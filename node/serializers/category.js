'use strict';

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('category', {
  id: '_id',
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  attributes: [
    'name',
    'order'
  ]
});