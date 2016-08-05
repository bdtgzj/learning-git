import config from '../config'
import { browserHistory, hashHistory } from 'react-router'

export const VALIDATE_NAME = 'VALIDATE_NAME'
export const VALIDATE_ORDER = 'VALIDATE_ORDER'

export const OPEN_ALERT_DIALOG = 'OPEN_ALERT_DIALOG'
export const OPEN_CREATE_DIALOG = 'OPEN_CREATE_DIALOG'
export const OPEN_UPDATE_DIALOG = 'OPEN_UPDATE_DIALOG'
export const OPEN_READ_DIALOG = 'OPEN_READ_DIALOG'

export const SET_USER = 'SET_USER'

export const SELECT_ROW = 'SELECT_ROW'

/*
 * user
 */

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

/*
 * Dialog 
 */
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

export function openUpdateDialog(open) {
  return {
    type: OPEN_UPDATE_DIALOG,
    open
  }
}

export function openReadDialog(open) {
  return {
    type: OPEN_READ_DIALOG,
    open
  }
}

export function validateName(name) {
  return {
    type: VALIDATE_NAME,
    name
  }
}

export function validateOrder(order) {
  return {
    type: VALIDATE_ORDER,
    order
  }
}

/*
 * Table 
 */
export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}

