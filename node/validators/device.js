/**
 * Validator -- device
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var _ = require('lodash');
var validatorCommon = require('../validators').Common;
var mongoose = require('mongoose');

function validateIdNameRegionCategory(query) {
  var condition = {};

  if ( (!query.id || !validator.trim(query.id.toString())) && 
       (!query.name || !validator.trim(query.name.toString())) &&
       (!query.regionId || !validator.trim(query.regionId.toString())) && 
       (!query.categoryId || !validator.trim(query.categoryId.toString()))
  ) {
    return result = {isValid: true, data: {}};
  }

  if (query.id) {
    var validatedId = validatorCommon.validateID(query.id);
    if (!validatedId.isValid) {
      return validatedId;
    } else {
      condition['_id'] = mongoose.Types.ObjectId(validatedId.data);
    }
  }

  if (query.name) {
    var validatedName = validatorCommon.validateName(query.name);
    if (!validatedName.isValid) {
      return validatedName;
    } else {
      condition['name'] = {$regex: validatedName.data, $options: 'i'};
    }
  }

  if (query.regionId) {
    var validatedRegionId = validatorCommon.validateID(query.regionId);
    if (!validatedRegionId.isValid) {
      return validatedRegionId;
    } else {
      condition['regionId'] = mongoose.Types.ObjectId(validatedRegionId.data);
    }
  }

  if (query.categoryId) {
    var validatedCategoryId = validatorCommon.validateID(query.categoryId);
    if (!validatedCategoryId.isValid) {
      return validatedCategoryId;
    } else {
      condition['categoryId'] = mongoose.Types.ObjectId(validatedCategoryId.data);
    }
  }

  return {isValid: true, data: condition};
}

function validateDevice(device) {
  var validatedDevice = {};

  if (!_.isObject(device)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedUID = validatorCommon.validateUID(device.uid);
  if (!validatedUID.isValid) {
    return validatedUID;
  } else {
    validatedDevice['uid'] = validatedUID.data;
  }

  var validatedName = validatorCommon.validateName(device.name);
  if (!validatedName.isValid) {
    return validatedName;
  } else {
    validatedDevice['name'] = validatedName.data;
  }

  var validatedIconId = validatorCommon.validateID(device.iconId);
  if (!validatedIconId.isValid) {
    return validatedIconId;
  } else {
    validatedDevice['iconId'] = validatedIconId.data;
  }

  var validatedColorId = validatorCommon.validateID(device.colorId);
  if (!validatedColorId.isValid) {
    return validatedColorId;
  } else {
    validatedDevice['colorId'] = validatedColorId.data;
  }

  var validatedRegionId = validatorCommon.validateID(device.regionId);
  if (!validatedRegionId.isValid) {
    return validatedRegionId;
  } else {
    validatedDevice['regionId'] = validatedRegionId.data;
  }

  var validatedCategoryId = validatorCommon.validateID(device.categoryId);
  if (!validatedCategoryId.isValid) {
    return validatedCategoryId;
  } else {
    validatedDevice['categoryId'] = validatedCategoryId.data;
  }

  var validatedOrder = validatorCommon.validateOrder(device.order);
  if (!validatedOrder.isValid) {
    return validatedOrder;
  } else {
    validatedDevice['order'] = validatedOrder.data;
  }

  return {isValid: true, data: validatedDevice};
}

module.exports = { 
  validateIdNameRegionCategory: validateIdNameRegionCategory,
  validateDevice: validateDevice
}