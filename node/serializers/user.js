'use strict';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('userd', {
  id: '_id',
  attributes: [
    'loginName',
    'name',
    'email',
    'mphone',
    'familyID'
  ]
});