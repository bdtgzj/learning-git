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

  if ( (!query.id || !validator.trim(id.toString())) && 
       (!query.name || !validator.trim(name.toString())) &&
       (!query.region || !validator.trim(name.toString())) && 
       (!query.category || !validator.trim(name.toString()))
  ) {
    return result = {isValid: true, data: null};
  }

  var validatedId = validatorCommon.validateID(query.id);
  if (!validatedId.isValid) {
    return validatedId;
  } else {
    condition['_id'] = mongoose.Types.ObjectId(validatedId.data);
  }

  var validatedName = validatorCommon.validateName(query.name);
  if (!validatedName.isValid) {
    return validatedName;
  } else {
    condition['name'] = {$regex: validatedName.data, $options: 'i'};
  }

  var validatedRegion = validatorCommon.validateID(query.region);
  if (!validatedRegion.isValid) {
    return validatedRegion;
  } else {
    condition['regionId'] = mongoose.Types.ObjectId(validatedRegion.data);
  }

  var validatedCategory = validatorCommon.validateID(query.category);
  if (!validatedCategory.isValid) {
    return validatedCategory;
  } else {
    condition['categoryId'] = mongoose.Types.ObjectId(validatedCategory.data);
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

  var validatedIcon = validatorCommon.validateIcon(device.icon);
  if (!validatedIcon.isValid) {
    return validatedIcon;
  } else {
    validatedDevice['icon'] = validatedIcon.data;
  }

  var validatedColor = validatorCommon.validateColor(device.color);
  if (!validatedColor.isValid) {
    return validatedColor;
  } else {
    validatedDevice['color'] = validatedColor.data;
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