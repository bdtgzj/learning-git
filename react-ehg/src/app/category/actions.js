import config from '../config'

/*
 * user
 */
export const SET_USER = 'CATEGORY_SET_USER'

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

/*
 * Dialog 
 */
export const OPEN_CREATE_DIALOG = 'CATEGORY_OPEN_CREATE_DIALOG'
export const OPEN_READ_DIALOG = 'CATEGORY_OPEN_READ_DIALOG'
export const OPEN_UPDATE_DIALOG = 'CATEGORY_OPEN_UPDATE_DIALOG'
export const OPEN_DELETE_DIALOG = 'CATEGORY_OPEN_DELETE_DIALOG'
export const VALIDATE_NAME_CREATE = 'CATEGORY_VALIDATE_NAME_CREATE'
export const VALIDATE_ORDER_CREATE = 'CATEGORY_VALIDATE_ORDER_CREATE'
export const VALIDATE_NAME_UPDATE = 'CATEGORY_VALIDATE_NAME_UPDATE'
export const VALIDATE_ORDER_UPDATE = 'CATEGORY_VALIDATE_ORDER_UPDATE'
export const VALIDATE_NAME_READ = 'CATEGORY_VALIDATE_NAME_READ'

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

export function validateNameCreate(name) {
  return {
    type: VALIDATE_NAME_CREATE,
    name
  }
}

export function validateOrderCreate(order) {
  return {
    type: VALIDATE_ORDER_CREATE,
    order
  }
}

export function validateNameUpdate(name) {
  return {
    type: VALIDATE_NAME_UPDATE,
    name
  }
}

export function validateOrderUpdate(order) {
  return {
    type: VALIDATE_ORDER_UPDATE,
    order
  }
}

export function validateNameRead(name) {
  return {
    type: VALIDATE_NAME_READ,
    name
  }
}

/*
 * Table 
 */
export const SELECT_ROW = 'CATEGORY_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}

