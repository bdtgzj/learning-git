import config from '../config'
import { browserHistory, hashHistory } from 'react-router'

/*
 * user
 */
export const SET_USER = 'REGION_SET_USER'

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

/*
 * Dialog 
 */
export const OPEN_ALERT_DIALOG = 'REGION_OPEN_ALERT_DIALOG'
export const OPEN_CREATE_DIALOG = 'REGION_OPEN_CREATE_DIALOG'
export const OPEN_UPDATE_DIALOG = 'REGION_OPEN_UPDATE_DIALOG'
export const OPEN_READ_DIALOG = 'REGION_OPEN_READ_DIALOG'
export const VALIDATE_NAME_CREATE = 'REGION_VALIDATE_NAME_CREATE'
export const VALIDATE_ORDER_CREATE = 'REGION_VALIDATE_ORDER_CREATE'
export const VALIDATE_NAME_UPDATE = 'REGION_VALIDATE_NAME_UPDATE'
export const VALIDATE_ORDER_UPDATE = 'REGION_VALIDATE_ORDER_UPDATE'

export function openAlertDialog(open, content) {
  return {
    type: OPEN_ALERT_DIALOG,
    open,
    content
  }
}

export function openCreateDialog(open) {
  return {
    type: OPEN_CREATE_DIALOG,
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

export function openReadDialog(open) {
  return {
    type: OPEN_READ_DIALOG,
    open
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

/*
 * Table 
 */
export const SELECT_ROW = 'REGION_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}

