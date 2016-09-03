/**
 * Validator -- user
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var _ = require('lodash');
var validatorCommon = require('./common');
var mongoose = require('mongoose');

// for signin
function validateSignin(user) {
  if (!_.isObject(user)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedName = validatorCommon.validateLoginName(user.name);
  if (!validatedName.isValid) {
    return validatedName;
  }

  var validatedPassword = validatorCommon.validatePassword(user.password);
  if (!validatedPassword.isValid) {
    return validatedPassword;
  }

  return {isValid: true, data: {
    name: validatedName.data,
    password: validatedPassword.data
  }};
}

// for search
function validateIdNameNicknameEmailMphoneStateFamilyid(query) {
  var condition = {};

  if ( validatorCommon.isEmpty(query.id) && 
       validatorCommon.isEmpty(query.name) &&
       validatorCommon.isEmpty(query.nickName) &&
       validatorCommon.isEmpty(query.email) &&
       validatorCommon.isEmpty(query.mphone) &&
       validatorCommon.isEmpty(query.state) &&
       validatorCommon.isEmpty(query.familyId)
  ) {
    return result = {isValid: true, data: {}};
  }

  if (!validatorCommon.isEmpty(query.id)) {
    var validatedId = validatorCommon.validateUID(query.id);
    if (!validatedId.isValid) {
      return validatedId;
    } else {
      condition['id'] = validatedId.data;
    }
  }

  if (!validatorCommon.isEmpty(query.name)) {
    var validatedName = validatorCommon.validateName(query.name);
    if (!validatedName.isValid) {
      return validatedName;
    } else {
      condition['name'] = {$regex: validatedName.data, $options: 'i'};
    }
  }

  if (!validatorCommon.isEmpty(query.nickName)) {
    var validatedNickName = validatorCommon.validateName(query.nickName);
    if (!validatedNickName.isValid) {
      return validatedNickName;
    } else {
      condition['nickName'] = {$regex: validatedNickName.data, $options: 'i'};
    }
  }

  if (!validatorCommon.isEmpty(query.email)) {
    var validatedEmail = validatorCommon.validateEmail(query.email);
    if (!validatedEmail.isValid) {
      return validatedEmail;
    } else {
      condition['email'] = {$regex: validatedEmail.data, $options: 'i'};
    }
  }

  if (!validatorCommon.isEmpty(query.mphone)) {
    var validatedMphone = validatorCommon.validateMphone(query.mphone);
    if (!validatedMphone.isValid) {
      return validatedMphone;
    } else {
      condition['mphone'] = {$regex: validatedMphone.data, $options: 'i'};
    }
  }

  if (!validatorCommon.isEmpty(query.state)) {
    var validatedState = validatorCommon.validateState(query.state);
    if (!validatedState.isValid) {
      return validatedState;
    } else {
      condition['state'] = validatedState.data;
    }
  }

  if (!validatorCommon.isEmpty(query.familyId)) {
    var validatedFamilyId = validatorCommon.validateID(query.familyId);
    if (!validatedFamilyId.isValid) {
      return validatedFamilyId;
    } else {
      condition['familyId'] = mongoose.Types.ObjectId(validatedFamilyId.data);
    }
  }

  return {isValid: true, data: condition};
}

// for create & update
function validateUser(user) {
  var validatedUser = {};

  if (!validatorCommon.isObject(user)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedName = validatorCommon.validateLoginName(user.name);
  if (!validatedName.isValid) {
    return validatedName;
  } else {
    validatedUser['name'] = validatedName.data;
  }

  if (!validatorCommon.isEmpty(user.nickName)) {
    var validatedNickName = validatorCommon.validateNickName(user.nickName);
    if (!validatedNickName.isValid) {
      return validatedNickName;
    } else {
      validatedUser['nickName'] = validatedNickName.data;
    }
  }

  var validatedEmail = validatorCommon.validateEmail(user.email);
  if (!validatedEmail.isValid) {
    return validatedEmail;
  } else {
    validatedUser['email'] = validatedEmail.data;
  }

  var validatedMphone = validatorCommon.validateMphone(user.mphone);
  if (!validatedMphone.isValid) {
    return validatedMphone;
  } else {
    validatedUser['mphone'] = validatedMphone.data;
  }

  var validatedState = validatorCommon.validateState(user.state);
  if (!validatedState.isValid) {
    return validatedState;
  } else {
    validatedUser['state'] = validatedState.data;
  }

  var validatedFamilyId = validatorCommon.validateID(user.familyId);
  if (!validatedFamilyId.isValid) {
    return validatedFamilyId;
  } else {
    validatedUser['familyId'] = validatedFamilyId.data;
  }

  validatedUser['updated'] = new Date().toJSON();

  return {isValid: true, data: validatedUser};
}

module.exports = {
  validateSignin: validateSignin,
  validateIdNameNicknameEmailMphoneStateFamilyid: validateIdNameNicknameEmailMphoneStateFamilyid,
  validateUser: validateUser
}