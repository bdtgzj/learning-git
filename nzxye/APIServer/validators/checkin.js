/**
 * Validator -- checkin.js
 */

const STRINGS = require('../res/strings');
var validator = require('validator');
var validatorCommon = require('../validators').Common;

function validateCidCreated(query) {
  var condition = {};

  /*
  if (validatorCommon.isEmpty(query.cid) && validatorCommon.isEmpty(query.startDate) && validatorCommon.isEmpty(query.endDate)) {
    return result = {isValid: true, data: null};
  }
  */

  if (query.cid) {
    var validatedCid = validatorCommon.validateID(query.cid);
    if (!validatedCid.isValid) {
      return validatedCid;
    } else {
      condition['cid'] = validatedCid.data;
    }
  }

  if (query.startDate) {
    var validatedStartDate = validatorCommon.validateDate(query.startDate);
    if (!validatedStartDate.isValid) {
      return validatedStartDate;
    }
    //
    var validatedEndDate = {isValid: true, data: new Date().toJSON().slice(0,10)};
    if (query.endDate) {
      validatedEndDate = validatorCommon.validateDate(query.endDate);
      if (!validatedEndDate.isValid) {
        return validatedEndDate;
      }
    }
    //
    condition['created'] = {$gte: ISODate(validatedStartDate.data + 'T00:00:00Z'), $lte: ISODate(validatedEndDate.Date + 'T24:00:00Z')};
  }

  return {isValid: true, data: condition};

}

function validateCheckin(checkin) {
  var validatedCheckin = {};

  if (!validatorCommon.isObject(checkin)) {
    return {isValid: false, error: STRINGS.ERROR_EXCEPTION_DATA};
  }

  var validatedCID = validatorCommon.validateID(checkin.cid);
  if (!validatedCID.isValid) {
    return validatedCID;
  } else {
    validatedCheckin['cid'] = validatedCID.data;
  }

  if (checkin.remark) {
    var validatedRemark = validatorCommon.validateRemark(checkin.remark);
    if (!validatedRemark.isValid) {
      return validatedRemark;
    } else {
      validatedCheckin['remark'] = validatedRemark.data;
    }
  }

  return {isValid: true, data: validatedCheckin};
}

module.exports = { 
  validateCidCreated: validateCidCreated,
  validateCheckin: validateCheckin
}