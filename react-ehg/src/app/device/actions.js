import config from '../config'

/*
 * user
 */
export const SET_USER = 'DEVICE_SET_USER'

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

/*
 * Dialog 
 */
export const OPEN_CREATE_DIALOG = 'DEVICE_OPEN_CREATE_DIALOG'
export const OPEN_READ_DIALOG = 'DEVICE_OPEN_READ_DIALOG'
export const OPEN_UPDATE_DIALOG = 'DEVICE_OPEN_UPDATE_DIALOG'
export const OPEN_DELETE_DIALOG = 'DEVICE_OPEN_DELETE_DIALOG'

export const VALIDATE_NAME_CREATE = 'DEVICE_VALIDATE_NAME_CREATE'
export const VALIDATE_ORDER_CREATE = 'DEVICE_VALIDATE_ORDER_CREATE'
export const VALIDATE_NAME_UPDATE = 'DEVICE_VALIDATE_NAME_UPDATE'
export const VALIDATE_ORDER_UPDATE = 'DEVICE_VALIDATE_ORDER_UPDATE'
export const VALIDATE_NAME_READ = 'DEVICE_VALIDATE_NAME_READ'

export const SET_ICON_ID_CREATE = 'DEVICE_SET_ICON_ID_CREATE'
export const SET_ICON_ID_UPDATE = 'DEVICE_SET_ICON_ID_UPDATE'
export const SET_COLOR_ID_CREATE = 'DEVICE_SET_COLOR_ID_CREATE'
export const SET_COLOR_ID_UPDATE = 'DEVICE_SET_COLOR_ID_UPDATE'

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
export function validateNameRead(name) {
  return {
    type: VALIDATE_NAME_READ,
    name
  }
}

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

// icon
export function setIconIdCreate(id) {
  return {
    type: SET_ICON_ID_CREATE,
    id
  }
}

export function setIconIdUpdate(id) {
  return {
    type: SET_ICON_ID_UPDATE,
    id
  }
}

// color
export function setColorIdCreate(id) {
  return {
    type: SET_COLOR_ID_CREATE,
    id
  }
}

export function setColorIdUpdate(id) {
  return {
    type: SET_COLOR_ID_UPDATE,
    id
  }
}

/*
 * Table 
 */
export const SELECT_ROW = 'DEVICE_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}

