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
  if (!icon || !validator.trim(icon.toString()) || !validator.isLength(icon, {min: 1, max: 50})) {
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

function validateInstruction(instruction) {
  var result = {};
  if (!instruction || !validator.trim(instruction.toString()) || !validator.isLength(instruction, {min: 1, max: 300})) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_INSTRUCTION};
  } else {
    result =  {isValid: true, data: validator.trim(instruction)};
  }
  return result;
}

/**
 * User
 */
function validateLoginName(loginName) {
  var result = {};
  if (!loginName || !validator.trim(loginName.toString()) || !validator.isLength(loginName, {min: 6, max: 18})) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_LOGIN_NAME};
  } else {
    result =  {isValid: true, data: validator.trim(loginName)};
  }
  return result;
}

function validatePassword(password) {
  var result = {};
  if (!password || !validator.trim(password.toString()) || !validator.isLength(password, {min: 6, max: 18})) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_PASSWORD};
  } else {
    result =  {isValid: true, data: validator.trim(password)};
  }
  return result;
}

function validateNickName(nickName) {
  var result = {};
  if (!nickName || !validator.trim(nickName.toString()) || !validator.isLength(nickName, {min: 1, max: 18})) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_NICKNAME};
  } else {
    result =  {isValid: true, data: validator.trim(nickName)};
  }
  return result;
}

function validateEmail(email) {
  var result = {};
  if (!email || !validator.trim(email.toString()) || !validator.isEmail(email)) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_NICKNAME};
  } else {
    result =  {isValid: true, data: validator.trim(email)};
  }
  return result;
}

function validateMphone(mphone) {
  var result = {};
  if (!mphone || !validator.trim(mphone.toString()) || !validator.isMobilePhone(mphone, 'zh-CN')) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_MPHONE};
  } else {
    result =  {isValid: true, data: validator.trim(mphone)};
  }
  return result;
}

function validateState(state) {
  var result = {};
  if (!state || !validator.isInt(state.toString())) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_STATE};
  } else {
    result =  {isValid: true, data: parseInt(state)};
  }
  return result;
}

/**
 * Family
 */
function validateFid(fid) {
  var result = {};
  if (!fid || !validator.isInt(fid.toString()) || fid<1) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_FID};
  } else {
    result =  {isValid: true, data: parseInt(fid)};
  }
  return result;
}

function validateAddress(address) {
  var result = {};
  if (isEmpty(address) || !validator.isLength(address, {min: 2, max: 50})) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_ADDRESS};
  } else {
    result =  {isValid: true, data: validator.trim(address)};
  }
  return result;
}

/**
 * Log
 */
function validateLog(log) {
  var result = {};
  if (isEmpty(log) || !validator.isLength(log, {min: 2, max: 50})) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_LOG};
  } else {
    result =  {isValid: true, data: validator.trim(log)};
  }
  return result;
}

function validateCategory(category) {
  var result = {};
  if (!category || !validator.isInt(category.toString()) || category<1) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_FID};
  } else {
    result =  {isValid: true, data: parseInt(category)};
  }
  return result;
}

function validateIp(ip) {
  var result = {};
  if (!ip || !validator.isIP(ip.toString())) {
    result =  {isValid: false, error: STRINGS.ERROR_PARAM_IP};
  } else {
    result =  {isValid: true, data: ip};
  }
  return result;
}

/**
 * Page
 */
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

/**
 * Common
 */
function isObject(obj) {
  return _.isObject(obj);
}

function isEmpty(v) {
  return (!v || !validator.trim(v.toString()));
}

function isDate(date) {
  return (!date || !validator.trim(date.toString()) || !validator.isDate(date));
}

module.exports = {
  validateUID: validateUID,
  validateID: validateID,
  validatePage: validatePage, 
  validateName: validateName,
  validateOrder: validateOrder,
  validateIcon: validateIcon,
  validateColor: validateColor,
  validateInstruction: validateInstruction,
  // user
  validateLoginName: validateLoginName,
  validatePassword: validatePassword,
  validateNickName: validateNickName,
  validateEmail: validateEmail,
  validateMphone: validateMphone,
  validateState: validateState,
  // family
  validateFid: validateFid,
  validateAddress: validateAddress,
  // log
  validateLog: validateLog,
  validateCategory: validateCategory,
  validateIp: validateIp,
  // common
  isObject: isObject,
  isEmpty: isEmpty,
  isDate: isDate
}