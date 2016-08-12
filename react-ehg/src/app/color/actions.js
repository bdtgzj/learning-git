import config from '../config'

/*
 * Dialog 
 */
export const OPEN_CREATE_DIALOG = 'COLOR_OPEN_CREATE_DIALOG'
export const OPEN_READ_DIALOG = 'COLOR_OPEN_READ_DIALOG'
export const OPEN_UPDATE_DIALOG = 'COLOR_OPEN_UPDATE_DIALOG'
export const OPEN_DELETE_DIALOG = 'COLOR_OPEN_DELETE_DIALOG'
export const VALIDATE_NAME_READ = 'COLOR_VALIDATE_NAME_READ'
export const VALIDATE_NAME_CREATE = 'COLOR_VALIDATE_NAME_CREATE'
export const VALIDATE_NAME_UPDATE = 'COLOR_VALIDATE_NAME_UPDATE'
export const VALIDATE_COLOR_CREATE = 'COLOR_VALIDATE_COLOR_CREATE'
export const VALIDATE_COLOR_UPDATE = 'COLOR_VALIDATE_COLOR_UPDATE'
export const VALIDATE_ORDER_CREATE = 'COLOR_VALIDATE_ORDER_CREATE'
export const VALIDATE_ORDER_UPDATE = 'COLOR_VALIDATE_ORDER_UPDATE'

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

// color
export function validateColorCreate(color) {
  return {
    type: VALIDATE_COLOR_CREATE,
    color
  }
}

export function validateColorUpdate(color) {
  return {
    type: VALIDATE_COLOR_UPDATE,
    color
  }
}

// order
export function validateOrderCreate(order) {
  return {
    type: VALIDATE_ORDER_CREATE,
    order
  }
}

export function validateOrderUpdate(order) {
  return {
    type: VALIDATE_ORDER_UPDATE,
    order
  }
}

/*
 * Table 
 */
export const SELECT_ROW = 'COLOR_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}