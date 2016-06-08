/**
 * Validator's facade
 */
var check = require('validator').check;

module.exports = {

  isIDs: function(ids) {
    check(ids).notEmpty();
    ids = ids.split(',');
    if (!(toString.apply(ids) == '[object Array]' && ids.length > 0)) {
      throw new Error('Invalid ids.');
    }
    ids.forEach(function(id) {
      check(id).isAlphanumeric();
    });
    return ids;
  }

};