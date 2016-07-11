'use strict';

var error = function(title, detail, status, source) {
  !title && '';
  !detail && '';
  !status && '';
  !source && {};

  return {
    'title': title,
    'detail': detail,
    'status': status,
    'source': source
  };
}

module.exports = error;