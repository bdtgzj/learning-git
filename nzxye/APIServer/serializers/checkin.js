'use strict';

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('checkin', {
  id: '_id',
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  attributes: [
    'cid',
    'remark',
    'created',
    'name',
    'nickName',
    'sex',
    'idCard',
    'mphone'
  ]
});