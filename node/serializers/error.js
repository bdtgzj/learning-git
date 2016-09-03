'use strict';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('businesserror', {
  keyForAttribute: 'camelCase',
  pluralizeType: true,
  attributes: [
    'status',
    'title',
    'detail',
    'source'
  ]
});