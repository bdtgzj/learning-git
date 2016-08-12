import config from '../config'

/*
 * Dialog 
 */
export const OPEN_CREATE_DIALOG = 'ICON_OPEN_CREATE_DIALOG'
export const OPEN_READ_DIALOG = 'ICON_OPEN_READ_DIALOG'
export const OPEN_UPDATE_DIALOG = 'ICON_OPEN_UPDATE_DIALOG'
export const OPEN_DELETE_DIALOG = 'ICON_OPEN_DELETE_DIALOG'
export const VALIDATE_NAME_READ = 'ICON_VALIDATE_NAME_READ'
export const VALIDATE_NAME_CREATE = 'ICON_VALIDATE_NAME_CREATE'
export const VALIDATE_NAME_UPDATE = 'ICON_VALIDATE_NAME_UPDATE'
export const VALIDATE_ICON_CREATE = 'ICON_VALIDATE_ICON_CREATE'
export const VALIDATE_ICON_UPDATE = 'ICON_VALIDATE_ICON_UPDATE'
export const VALIDATE_ORDER_CREATE = 'ICON_VALIDATE_ORDER_CREATE'
export const VALIDATE_ORDER_UPDATE = 'ICON_VALIDATE_ORDER_UPDATE'

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

// icon
export function validateIconCreate(icon) {
  return {
    type: VALIDATE_ICON_CREATE,
    icon
  }
}

export function validateIconUpdate(icon) {
  return {
    type: VALIDATE_ICON_UPDATE,
    icon
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
export const SELECT_ROW = 'ICON_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}

