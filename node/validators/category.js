/**
 * Validator -- category.js
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var _ = require('lodash');
var validatorCommon = require('../validators').Common;

function validateName(name) {
  if (!name || !validator.trim(name.toString())) {
    return result = {isValid: true, data: null};
  }
  var validatedName = validatorCommon.validateName(name);
  if (!validatedName.isValid) {
    return validatedName;
  } else {
    return {isValid: true, data: {name: {$regex: validatedName.data, $options: 'i'}}};
  }
}

function validateCategory(category) {
  if (!_.isObject(category)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedUID = validatorCommon.validateUID(category.uid);
  if (!validatedUID.isValid) {
    return validatedUID;
  }

  var validatedName = validatorCommon.validateName(category.name);
  if (!validatedName.isValid) {
    return validatedName;
  }

  var validatedOrder = validatorCommon.validateOrder(category.order);
  if (!validatedOrder.isValid) {
    return validatedOrder;
  }

  return {isValid: true, data: {uid: validatedUID.data, name: validatedName.data, order: validatedOrder.data}};
}

module.exports = { 
  validateCategory: validateCategory,
  validateName: validateName
}