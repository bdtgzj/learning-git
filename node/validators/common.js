/**
 * Validator - common.js
 */
const STRINGS = require('../res/strings');
var validator = require('validator');
var _ = require('lodash');

function validateUID(uid) {
  var result = {};
  if (!uid || !validator.isInt(uid.toString()) || uid<1) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_UID};
  } else {
    result =  {isValid: true, data: parseInt(uid)};
  }
  return result;
}

function validateID(id) {
  var result = {};
  if (!id || id.length !== 24) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_ID};
  } else {
    result =  {isValid: true, data: id};
  }
  return result;
}

function validateName(name) {
  var result = {};
  if (!name || !validator.trim(name.toString()) || !validator.isLength(name, {min: 1, max: 10})) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_NAME};
  } else {
    result =  {isValid: true, data: name};
  }
  return result;
}

function validateOrder(order) {
  var result = {};
  if (!order || !validator.isInt(order.toString())) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_ORDER};
  } else {
    result =  {isValid: true, data: parseInt(order)};
  }
  return result;
}

function validateIcon(icon) {
  var result = {};
  if (!icon || !validator.trim(icon.toString()) || !validator.isLength(icon, {min: 1, max: 20})) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_ICON};
  } else {
    result =  {isValid: true, data: validator.trim(icon)};
  }
  return result;
}

function validateColor(color) {
  var result = {};
  if (!color || !validator.trim(color.toString()) || !validator.isLength(color, {min: 7, max: 9})) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_COLOR};
  } else {
    result =  {isValid: true, data: validator.trim(color)};
  }
  return result;
}

function validatePage(page) {
  if (!page) {
    return {isValid: true, data: {skip: 0, limit: 0, sort: 1}}
  }

  if (!_.isPlainObject(page)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA}
  }

  if (page.size) {
    if (!validator.isInt(page.size.toString())) {
      return {isValid: false, error: STRINGS.ERROR_PARAM_PAGE_SIZE};
    }
  } else {
    page['size'] = 0;
  }

  if (page.number) {
    if (!validator.isInt(page.number.toString())) {
      return {isValid: false, error: STRINGS.ERROR_PARAM_PAGE_NUMBER};
    }
  } else {
    page['number'] = 0;
  }

  if (page.sort) {
    if (page.sort != 1 && page.sort != -1) {
      return {isValid: false, error: STRINGS.ERROR_PARAM_PAGE_SORT};
    }
  } else {
    page['sort'] = 1;
  }

  return {isValid: true, data: {skip: page.size*page.number, limit: parseInt(page.size), sort: parseInt(page.sort)}}
}

module.exports = { 
  validateUID: validateUID,
  validateID: validateID, 
  validatePage: validatePage, 
  validateName: validateName,
  validateOrder: validateOrder,
  validateIcon: validateIcon,
  validateColor: validateColor
}