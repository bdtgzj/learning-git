/**
 * Validator -- customer.js
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var validatorCommon = require('../validators').Common;

function validateNameMphone(query) {
  var condition = {};

  if (validatorCommon.isEmpty(query.name) && validatorCommon.isEmpty(query.mphone)) {
    return result = {isValid: true, data: null};
  }

  if (query.name) {
    var validatedName = validatorCommon.validateName(query.name);
    if (!validatedName.isValid) {
      return validatedName;
    } else {
      condition['name'] = {$regex: validatedName.data, $options: 'i'};
    }
  }

  if (query.mphone) {
    var validatedMphone = validatorCommon.validateMphone(query.mphone);
    if (!validatedMphone.isValid) {
      return validatedMphone;
    } else {
      condition['mphone'] = {$regex: validatedMphone.data, $options: 'i'};
    }
  }

  return {isValid: true, data: condition};

}

function validateCustomer(customer) {
  var validatedCustomer = {};

  if (!validatorCommon.isObject(customer)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  /*
  var validatedUID = validatorCommon.validateUID(customer.uid);
  if (!validatedUID.isValid) {
    return validatedUID;
  } else {
    validatedCustomer['uid'] = validatedUID.data;
  }
  */

  var validatedName = validatorCommon.validateName(customer.name);
  if (!validatedName.isValid) {
    return validatedName;
  } else {
    validatedCustomer['name'] = validatedName.data;
  }

  if (customer.nickName) {
    var validatedNickName = validatorCommon.validateNickName(customer.nickName);
    if (!validatedNickName.isValid) {
      return validatedNickName;
    } else {
      validatedCustomer['nickName'] = validatedNickName.data;
    }
  }
  
  if (customer.sex) {
    var validatedSex = validatorCommon.validateSex(customer.sex);
    if (!validatedSex.isValid) {
      return validatedSex;
    } else {
      validatedCustomer['sex'] = validatedSex.data;
    }
  }

  if (customer.idCard) {
    var validatedIdCard = validatorCommon.validateIdCard(customer.idCard);
    if (!validatedIdCard.isValid) {
      return validatedIdCard;
    } else {
      validatedCustomer['idCard'] = validatedIdCard.data;
    }
  }

  var validatedMphone = validatorCommon.validateMphone(customer.mphone);
  if (!validatedMphone.isValid) {
    return validatedMphone;
  } else {
    validatedCustomer['mphone'] = validatedMphone.data;
  }

  if (customer.email) {
    var validatedEmail = validatorCommon.validateEmail(customer.email);
    if (!validatedEmail.isValid) {
      return validatedEmail;
    } else {
      validatedCustomer['email'] = validatedEmail.data;
    }
  }

  if (customer.address) {
    var validatedAddress = validatorCommon.validateAddress(customer.address);
    if (!validatedAddress.isValid) {
      return validatedAddress;
    } else {
      validatedCustomer['address'] = validatedAddress.data;
    }
  }

  if (customer.remark) {
    var validatedRemark = validatorCommon.validateRemark(customer.remark);
    if (!validatedRemark.isValid) {
      return validatedRemark;
    } else {
      validatedCustomer['remark'] = validatedRemark.data;
    }
  }

  return {isValid: true, data: validatedCustomer};
}

module.exports = { 
  validateNameMphone: validateNameMphone,
  validateCustomer: validateCustomer
}