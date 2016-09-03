/**
 * Validator -- homecard
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var _ = require('lodash');
var validatorCommon = require('../validators').Common;
var mongoose = require('mongoose');

function validateIdName(query) {
  var condition = {};

  if ( (!query.id || !validator.trim(query.id.toString())) && 
       (!query.name || !validator.trim(query.name.toString()))
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

  return {isValid: true, data: condition};
}

function validateHomecard(homecard) {
  var validatedHomecard = {};

  if (!_.isObject(homecard)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedUID = validatorCommon.validateUID(homecard.uid);
  if (!validatedUID.isValid) {
    return validatedUID;
  } else {
    validatedHomecard['uid'] = validatedUID.data;
  }

  var validatedName = validatorCommon.validateName(homecard.name);
  if (!validatedName.isValid) {
    return validatedName;
  } else {
    validatedHomecard['name'] = validatedName.data;
  }

  var validatedIconId = validatorCommon.validateID(homecard.iconId);
  if (!validatedIconId.isValid) {
    return validatedIconId;
  } else {
    validatedHomecard['iconId'] = validatedIconId.data;
  }

  var validatedColorId = validatorCommon.validateID(homecard.colorId);
  if (!validatedColorId.isValid) {
    return validatedColorId;
  } else {
    validatedHomecard['colorId'] = validatedColorId.data;
  }

  if ((!homecard.deviceId && !homecard.sceneId) || (homecard.deviceId && homecard.sceneId)) {
    return {isValid: false, error: STRINGS.ERROR_PARAM_DEVICE_SCENE};
  } else {
    if (homecard.deviceId) {
      var validatedDeviceId = validatorCommon.validateID(homecard.deviceId);
      if (!validatedDeviceId.isValid) {
        return validatedDeviceId;
      } else {
        validatedHomecard['deviceId'] = validatedDeviceId.data;
      }
    } else {
      validatedHomecard['deviceId'] = null;
    }
    if (homecard.sceneId) {
      var validatedSceneId = validatorCommon.validateID(homecard.sceneId);
      if (!validatedSceneId.isValid) {
        return validatedSceneId;
      } else {
        validatedHomecard['sceneId'] = validatedSceneId.data;
      }
    } else {
      validatedHomecard['sceneId'] = null;
    }
  }
  
  var validatedOrder = validatorCommon.validateOrder(homecard.order);
  if (!validatedOrder.isValid) {
    return validatedOrder;
  } else {
    validatedHomecard['order'] = validatedOrder.data;
  }

  return {isValid: true, data: validatedHomecard};
}

module.exports = { 
  validateIdName: validateIdName,
  validateHomecard: validateHomecard
}