import config from '../config'

/*
 * Dialog 
 */
export const OPEN_CREATE_DIALOG = 'USER_OPEN_CREATE_DIALOG'
export const OPEN_READ_DIALOG = 'USER_OPEN_READ_DIALOG'
export const OPEN_UPDATE_DIALOG = 'USER_OPEN_UPDATE_DIALOG'
export const OPEN_DELETE_DIALOG = 'USER_OPEN_DELETE_DIALOG'
export const VALIDATE_NAME_READ = 'USER_VALIDATE_NAME_READ'
export const VALIDATE_NAME_CREATE = 'USER_VALIDATE_NAME_CREATE'
export const VALIDATE_NAME_UPDATE = 'USER_VALIDATE_NAME_UPDATE'
export const VALIDATE_NICKNAME_READ = 'USER_VALIDATE_NICKNAME_READ'
export const VALIDATE_NICKNAME_CREATE = 'USER_VALIDATE_NICKNAME_CREATE'
export const VALIDATE_NICKNAME_UPDATE = 'USER_VALIDATE_NICKNAME_UPDATE'
export const VALIDATE_EMAIL_READ = 'USER_VALIDATE_EMAIL_READ'
export const VALIDATE_EMAIL_CREATE = 'USER_VALIDATE_EMAIL_CREATE'
export const VALIDATE_EMAIL_UPDATE = 'USER_VALIDATE_EMAIL_UPDATE'
export const VALIDATE_MPHONE_READ = 'USER_VALIDATE_MPHONE_READ'
export const VALIDATE_MPHONE_CREATE = 'USER_VALIDATE_MPHONE_CREATE'
export const VALIDATE_MPHONE_UPDATE = 'USER_VALIDATE_MPHONE_UPDATE'
export const SET_STATE_READ = 'USER_SET_STATE_READ'
export const SET_STATE_CREATE = 'USER_SET_STATE_CREATE'
export const SET_STATE_UPDATE = 'USER_SET_STATE_UPDATE'
export const SET_FAMILYID_READ = 'USER_SET_FAMILYID_READ'
export const SET_FAMILYID_CREATE = 'USER_SET_FAMILYID_CREATE'
export const SET_FAMILYID_UPDATE = 'USER_SET_FAMILYID_UPDATE'

export function openCreateDialog(open) {
  return {
    type: OPEN_CREATE_DIALOG,
    open
  }
}

export function openReadDialog(open) {
  return {
    type: OPEN_READ_DIALOG,
    open
  }
}

export function openUpdateDialog(open, selectedRow) {
  return {
    type: OPEN_UPDATE_DIALOG,
    open,
    selectedRow
  }
}

export function openDeleteDialog(open, selectedRow) {
  return {
    type: OPEN_DELETE_DIALOG,
    open,
    selectedRow
  }
}

// name
export function validateNameCreate(name) {
  return {
    type: VALIDATE_NAME_CREATE,
    name
  }
}

export function validateNameUpdate(name) {
  return {
    type: VALIDATE_NAME_UPDATE,
    name
  }
}

export function validateNameRead(name) {
  return {
    type: VALIDATE_NAME_READ,
    name
  }
}

// nickName
export function validateNickNameCreate(nickName) {
  return {
    type: VALIDATE_NICKNAME_CREATE,
    nickName
  }
}

export function validateNickNameUpdate(nickName) {
  return {
    type: VALIDATE_NICKNAME_UPDATE,
    nickName
  }
}

export function validateNickNameRead(nickName) {
  return {
    type: VALIDATE_NICKNAME_READ,
    nickName
  }
}

// email
export function validateEmailCreate(email) {
  return {
    type: VALIDATE_EMAIL_CREATE,
    email
  }
}

export function validateEmailUpdate(email) {
  return {
    type: VALIDATE_EMAIL_UPDATE,
    email
  }
}

export function validateEmailRead(email) {
  return {
    type: VALIDATE_EMAIL_READ,
    email
  }
}

// mphone
export function validateMphoneCreate(mphone) {
  return {
    type: VALIDATE_MPHONE_CREATE,
    mphone
  }
}

export function validateMphoneUpdate(mphone) {
  return {
    type: VALIDATE_MPHONE_UPDATE,
    mphone
  }
}

export function validateMphoneRead(mphone) {
  return {
    type: VALIDATE_MPHONE_READ,
    mphone
  }
}

// state
export function setStateCreate(state) {
  return {
    type: SET_STATE_CREATE,
    state
  }
}

export function setStateUpdate(state) {
  return {
    type: SET_STATE_UPDATE,
    state
  }
}

export function setStateRead(state) {
  return {
    type: SET_STATE_READ,
    state
  }
}

// familyId
export function setFamilyIdCreate(id) {
  return {
    type: SET_FAMILYID_CREATE,
    id
  }
}

export function setFamilyIdUpdate(id) {
  return {
    type: SET_FAMILYID_UPDATE,
    id
  }
}

export function setFamilyIdRead(id) {
  return {
    type: SET_FAMILYID_READ,
    id
  }
}

/*
 * Table 
 */
export const SELECT_ROW = 'USER_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}