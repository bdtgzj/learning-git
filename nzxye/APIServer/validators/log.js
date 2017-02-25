/**
 * Validator -- category.js
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var validatorCommon = require('../validators').Common;

function validateCategoryLog(query) {
  var condition = {};

  if (validatorCommon.isEmpty(query.category) && validatorCommon.isEmpty(query.log)) {
    return result = {isValid: true, data: null};
  }

  if (query.category) {
    var validatedCategory = validatorCommon.validateCategory(query.category);
    if (!validatedCategory.isValid) {
      return validatedCategory;
    } else {
      condition['category'] = validatedCategory.data;
    }
  }

  if (query.log) {
    var validatedLog = validatorCommon.validateLog(query.log);
    if (!validatedLog.isValid) {
      return validatedLog;
    } else {
      condition['log'] = {$regex: validatedLog.data, $options: 'i'};
    }
  }

  return {isValid: true, data: condition};

}

function validateLog(log) {
  var validatedLog = {};

  if (!validatorCommon.isObject(log)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedUID = validatorCommon.validateUID(log.uid);
  if (!validatedUID.isValid) {
    return validatedUID;
  } else {
    validatedLog['uid'] = validatedUID.data;
  }

  var validatedCategory = validatorCommon.validateCategory(log.category);
  if (!validatedCategory.isValid) {
    return validatedCategory;
  } else {
    validatedLog['category'] = validatedCategory.data;
  }

  var validatedLogContent = validatorCommon.validateLog(log.log);
  if (!validatedLogContent.isValid) {
    return validatedLogContent;
  } else {
    validatedLog['log'] = validatedLogContent.data;
  }

  var validatedIp = validatorCommon.validateIp(log.ip);
  if (!validatedIp.isValid) {
    return validatedIp;
  } else {
    validatedLog['ip'] = validatedIp.data;
  }

  return {isValid: true, data: validatedLog};
}

module.exports = { 
  validateCategoryLog: validateCategoryLog,
  validateLog: validateLog
}