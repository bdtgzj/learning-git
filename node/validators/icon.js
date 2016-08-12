/**
 * Validator -- icon
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

function validateIcon(icon) {
  if (!_.isObject(icon)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedName = validatorCommon.validateName(icon.name);
  if (!validatedName.isValid) {
    return validatedName;
  }

  var validatedIcon = validatorCommon.validateIcon(icon.icon);
  if (!validatedIcon.isValid) {
    return validatedIcon;
  }

  var validatedOrder = validatorCommon.validateOrder(icon.order);
  if (!validatedOrder.isValid) {
    return validatedOrder;
  }

  return {isValid: true, data: {
    name: validatedName.data,
    icon: validatedIcon.data,
    order: validatedOrder.data
  }};
}

module.exports = { 
  validateIcon: validateIcon,
  validateName: validateName
}