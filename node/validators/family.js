/**
 * Validator -- family
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var _ = require('lodash');
var validatorCommon = require('./common');

function validateNameFidAddress(query) {
  var condition = {};

  if (validatorCommon.isEmpty(query.name) && 
      validatorCommon.isEmpty(query.fid)&& 
      validatorCommon.isEmpty(query.address)
     ) {
    return {isValid: true, data: {}};
  }

  if (!validatorCommon.isEmpty(query.name)) {
    var validatedName = validatorCommon.validateName(query.name);
    if (!validatedName.isValid) {
      return validatedName;
    } else {
      condition['name'] = {$regex: validatedName.data, $options: 'i'};
    }
  }

  if (!validatorCommon.isEmpty(query.fid)) {
    var validatedFid = validatorCommon.validateFid(query.fid);
    if (!validatedFid.isValid) {
      return validatedFid;
    } else {
      condition['fid'] = validatedFid.data;
    }
  }

  if (!validatorCommon.isEmpty(query.address)) {
    var validatedAddress = validatorCommon.validateAddress(query.address);
    if (!validatedAddress.isValid) {
      return validatedAddress;
    } else {
      condition['address'] = {$regex: validatedAddress.data, $options: 'i'};
    }
  }

  return {isValid: true, data: condition};
}

function validateFamily(family) {
  var validatedFamily = {};

  if (!validatorCommon.isObject(family)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedName = validatorCommon.validateName(family.name);
  if (!validatedName.isValid) {
    return validatedName;
  } else {
    validatedFamily['name'] = validatedName.data;
  }

  var validatedFid = validatorCommon.validateFid(family.fid);
  if (!validatedFid.isValid) {
    return validatedFid;
  } else {
    validatedFamily['fid'] = validatedFid.data;
  }

  if (!validatorCommon.isEmpty(family.address)) {
    var validatedAddress = validatorCommon.validateAddress(family.address);
    if (!validatedAddress.isValid) {
      return validatedAddress;
    } else {
      validatedFamily['address'] = validatedAddress.data;
    }
  } else {
    validatedFamily['address'] = null;
  }

  return {isValid: true, data: validatedFamily};
}

module.exports = {
  validateFamily: validateFamily,
  validateNameFidAddress: validateNameFidAddress
}