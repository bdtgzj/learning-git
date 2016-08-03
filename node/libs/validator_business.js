var validator = require('validator');

function validateUID(uid) {

  var result = {};
  if (!uid || !validator.isInt(uid)) {
    result =  {isValid: false, error: '非法参数uid！'};
  } else {
    result =  {isValid: true, data: parseInt(uid)};
  }
  return result;

}

function validatePage(page) {

  if (!page) {
    return {isValid: true, data: {skip: 0, limit: 0, sort: 1}}
  }

  if (page.size) {
    if (!validator.isInt(page.size)) {
      return {isValid: false, error: '非法参数page[size]！'};
    }
  } else {
    page['size'] = 0;
  }

  if (page.number) {
    if (!validator.isInt(page.number)) {
      return {isValid: false, error: '非法参数page[number]！'};
    }
  } else {
    page['number'] = 0;
  }

  if (page.sort) {
    if (page.sort != 1 && page.sort != -1) {
      return {isValid: false, error: '非法参数page[sort]！'};
    }
  } else {
    page['sort'] = 1;
  }

  return {isValid: true, data: {skip: page.size*page.number, limit: parseInt(page.size), sort: parseInt(page.sort)}}

}

module.exports = { validateUID: validateUID, validatePage: validatePage }