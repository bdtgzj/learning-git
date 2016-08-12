/**
 * Validator -- color
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

function validateColor(color) {
  if (!_.isObject(color)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedName = validatorCommon.validateName(color.name);
  if (!validatedName.isValid) {
    return validatedName;
  }

  var validatedColor = validatorCommon.validateColor(color.color);
  if (!validatedColor.isValid) {
    return validatedColor;
  }

  var validatedOrder = validatorCommon.validateOrder(color.order);
  if (!validatedOrder.isValid) {
    return validatedOrder;
  }

  return {isValid: true, data: {
    name: validatedName.data,
    color: validatedColor.data,
    order: validatedOrder.data
  }};
}

module.exports = {
  validateColor: validateColor,
  validateName: validateName
}