import config from '../config'

/*
 * user
 */
export const SET_USER = 'LOG_SET_USER'

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

/*
 * Dialog 
 */
export const OPEN_READ_DIALOG = 'LOG_OPEN_READ_DIALOG'
export const OPEN_DELETE_DIALOG = 'LOG_OPEN_DELETE_DIALOG'
export const VALIDATE_CATEGORY_READ = 'LOG_VALIDATE_CATEGORY_READ'
export const VALIDATE_LOG_READ = 'LOG_VALIDATE_LOG_READ'

export function openReadDialog(open) {
  return {
    type: OPEN_READ_DIALOG,
    open
  }
}

export function openDeleteDialog(open, selectedRow) {
  return {
    type: OPEN_DELETE_DIALOG,
    open,
    selectedRow
  }
}

export function validateCategoryRead(category) {
  return {
    type: VALIDATE_CATEGORY_READ,
    category
  }
}

export function validateLogRead(log) {
  return {
    type: VALIDATE_LOG_READ,
    log
  }
}

/*
 * Table 
 */
export const SELECT_ROW = 'LOG_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}

