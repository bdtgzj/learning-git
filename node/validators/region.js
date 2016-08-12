/**
 * Validator -- region.js
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

function validateRegion(region) {
  if (!_.isObject(region)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedUID = validatorCommon.validateUID(region.uid);
  if (!validatedUID.isValid) {
    return validatedUID;
  }

  var validatedName = validatorCommon.validateName(region.name);
  if (!validatedName.isValid) {
    return validatedName;
  }

  var validatedOrder = validatorCommon.validateOrder(region.order);
  if (!validatedOrder.isValid) {
    return validatedOrder;
  }

  return {isValid: true, data: {uid: validatedUID.data, name: validatedName.data, order: validatedOrder.data}};
}

module.exports = { 
  validateRegion: validateRegion,
  validateName: validateName
}