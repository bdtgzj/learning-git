/**
 * Validator -- scene
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var _ = require('lodash');
var validatorCommon = require('../validators').Common;
var mongoose = require('mongoose');

function validateIdNameRegion(query) {
  var condition = {};

  if ( (!query.id || !validator.trim(query.id.toString())) && 
       (!query.name || !validator.trim(query.name.toString())) &&
       (!query.regionId || !validator.trim(query.regionId.toString()))
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

  return {isValid: true, data: condition};
}

function validateScene(scene) {
  var validatedScene = {};

  if (!_.isObject(scene)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedUID = validatorCommon.validateUID(scene.uid);
  if (!validatedUID.isValid) {
    return validatedUID;
  } else {
    validatedScene['uid'] = validatedUID.data;
  }

  var validatedName = validatorCommon.validateName(scene.name);
  if (!validatedName.isValid) {
    return validatedName;
  } else {
    validatedScene['name'] = validatedName.data;
  }

  var validatedIconId = validatorCommon.validateID(scene.iconId);
  if (!validatedIconId.isValid) {
    return validatedIconId;
  } else {
    validatedScene['iconId'] = validatedIconId.data;
  }

  var validatedColorId = validatorCommon.validateID(scene.colorId);
  if (!validatedColorId.isValid) {
    return validatedColorId;
  } else {
    validatedScene['colorId'] = validatedColorId.data;
  }

  var validatedRegionId = validatorCommon.validateID(scene.regionId);
  if (!validatedRegionId.isValid) {
    return validatedRegionId;
  } else {
    validatedScene['regionId'] = validatedRegionId.data;
  }

  var validatedOrder = validatorCommon.validateOrder(scene.order);
  if (!validatedOrder.isValid) {
    return validatedOrder;
  } else {
    validatedScene['order'] = validatedOrder.data;
  }

  return {isValid: true, data: validatedScene};
}

module.exports = { 
  validateIdNameRegion: validateIdNameRegion,
  validateScene: validateScene
}