/**
 * Validator -- inscat
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var _ = require('lodash');
var validatorCommon = require('./common');

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

function validateInscat(inscat) {
  if (!_.isObject(inscat)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedName = validatorCommon.validateName(inscat.name);
  if (!validatedName.isValid) {
    return validatedName;
  }

  var validatedOrder = validatorCommon.validateOrder(inscat.order);
  if (!validatedOrder.isValid) {
    return validatedOrder;
  }

  return {isValid: true, data: {
    name: validatedName.data,
    order: validatedOrder.data
  }};
}

module.exports = {
  validateInscat: validateInscat,
  validateName: validateName
}