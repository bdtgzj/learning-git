'use strict';

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('customer', {
  id: '_id',
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  attributes: [
    'name',
    'nickName',
    'sex',
    'idCard',
    'mphone',
    'email',
    'address',
    'remark',
    'created',
    'modified'
  ]
});