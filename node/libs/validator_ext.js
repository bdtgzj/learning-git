/**
 * extension validator.js
 * isXxx return boolean
 * validator.extend coerced convert the first argument to a string. 
 */

/*
var validator = require('validator');

validator.extend('isStatus', function (str) {
  return /^[012]$/.test(str);
});

validator.extend('isOrder', function (str) {
  return /^(ASC|DESC)$/i.test(str);
});

validator.extend('isName', function (str) {
  return /^[\w\s\u4e00-\u9fa5]{2,20}$/.test(str);
});

validator.extend('isMphone', function (str) {
  return /^1\d{10}$/.test(str);
});

validator.extend('isIdno', function (str) {
  return /^[a-zA-Z0-9]{18}$/.test(str);
});

validator.extend('isDate', function (str) {
  return /^\d{4}-\d{2}-\d{2}$/.test(str);
});


validator.extend('filterIDs', function (str) {
  var ids = [];

  if (!this.isNull(str)) { // this === validator see validator.extend()
    ids = str.split(',');
    if ((toString.apply(ids) == '[object Array]' && ids.length > 0)) {
      ids.forEach(function(id) {
        if (!validator.isAlphanumeric(id)) return ids = []; // no thisisAlphanumeric, because this === ids.
      });
    }
  }

  return ids;
});

module.exports = validator;
*/