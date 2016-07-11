'use strict';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('error', {
  keyForAttribute: 'camelCase',
  pluralizeType: true,
  attributes: [
    'status',
    'title',
    'detail',
    'source'
  ]
});