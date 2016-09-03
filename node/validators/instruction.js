/**
 * Validator -- instruction
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var _ = require('lodash');
var validatorCommon = require('../validators').Common;
var mongoose = require('mongoose');

function validateIdNameDeviceScene(query) {
  var condition = {};

  if ( (!query.id || !validator.trim(query.id.toString())) && 
       (!query.name || !validator.trim(query.name.toString())) &&
       (!query.deviceId || !validator.trim(query.deviceId.toString())) && 
       (!query.sceneId || !validator.trim(query.sceneId.toString()))
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

  if (query.deviceId) {
    var validatedDeviceId = validatorCommon.validateID(query.deviceId);
    if (!validatedDeviceId.isValid) {
      return validatedDeviceId;
    } else {
      condition['deviceId'] = mongoose.Types.ObjectId(validatedDeviceId.data);
    }
  }

  if (query.sceneId) {
    var validatedSceneId = validatorCommon.validateID(query.sceneId);
    if (!validatedSceneId.isValid) {
      return validatedSceneId;
    } else {
      condition['sceneId'] = mongoose.Types.ObjectId(validatedSceneId.data);
    }
  }

  return {isValid: true, data: condition};
}

function validateInstruction(instruction) {
  var validatedInstruction = {};

  if (!_.isObject(instruction)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedUID = validatorCommon.validateUID(instruction.uid);
  if (!validatedUID.isValid) {
    return validatedUID;
  } else {
    validatedInstruction['uid'] = validatedUID.data;
  }

  var validatedName = validatorCommon.validateName(instruction.name);
  if (!validatedName.isValid) {
    return validatedName;
  } else {
    validatedInstruction['name'] = validatedName.data;
  }

  var validatedIns = validatorCommon.validateInstruction(instruction.instruction);
  if (!validatedIns.isValid) {
    return validatedIns;
  } else {
    validatedInstruction['instruction'] = validatedIns.data;
  }

  var validatedCategoryId = validatorCommon.validateID(instruction.categoryId);
  if (!validatedCategoryId.isValid) {
    return validatedCategoryId;
  } else {
    validatedInstruction['categoryId'] = validatedCategoryId.data;
  }

  var validatedDeviceId = validatorCommon.validateID(instruction.deviceId);
  if (!validatedDeviceId.isValid) {
    return validatedDeviceId;
  } else {
    validatedInstruction['deviceId'] = validatedDeviceId.data;
  }

  if (instruction.sceneId) {
    var validatedSceneId = validatorCommon.validateID(instruction.sceneId);
    if (!validatedSceneId.isValid) {
      return validatedSceneId;
    } else {
      validatedInstruction['sceneId'] = validatedSceneId.data;
    }
  } else {
    validatedInstruction['sceneId'] = null;
  }
  
  var validatedOrder = validatorCommon.validateOrder(instruction.order);
  if (!validatedOrder.isValid) {
    return validatedOrder;
  } else {
    validatedInstruction['order'] = validatedOrder.data;
  }

  return {isValid: true, data: validatedInstruction};
}

module.exports = { 
  validateIdNameDeviceScene: validateIdNameDeviceScene,
  validateInstruction: validateInstruction
}