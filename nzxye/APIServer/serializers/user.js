'use strict';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('user', {
  id: '_id',
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  attributes: [
    'name',
    'nickName',
    'email',
    'mphone',
    'state',
    'familyId',
    'familyName',
    'fid',
    'oldPass',
    'newPass',
    'key'
  ]
});