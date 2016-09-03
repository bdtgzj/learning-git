import config from '../config'

/*
 * Dialog 
 */
export const OPEN_CREATE_DIALOG = 'FAMILY_OPEN_CREATE_DIALOG'
export const OPEN_READ_DIALOG = 'FAMILY_OPEN_READ_DIALOG'
export const OPEN_UPDATE_DIALOG = 'FAMILY_OPEN_UPDATE_DIALOG'
export const OPEN_DELETE_DIALOG = 'FAMILY_OPEN_DELETE_DIALOG'
export const VALIDATE_NAME_READ = 'FAMILY_VALIDATE_NAME_READ'
export const VALIDATE_NAME_CREATE = 'FAMILY_VALIDATE_NAME_CREATE'
export const VALIDATE_NAME_UPDATE = 'FAMILY_VALIDATE_NAME_UPDATE'
export const VALIDATE_FID_READ = 'FAMILY_VALIDATE_FID_READ'
export const VALIDATE_FID_CREATE = 'FAMILY_VALIDATE_FID_CREATE'
export const VALIDATE_FID_UPDATE = 'FAMILY_VALIDATE_FID_UPDATE'
export const VALIDATE_ADDRESS_READ = 'FAMILY_VALIDATE_ADDRESS_READ'
export const VALIDATE_ADDRESS_CREATE = 'FAMILY_VALIDATE_ADDRESS_CREATE'
export const VALIDATE_ADDRESS_UPDATE = 'FAMILY_VALIDATE_ADDRESS_UPDATE'

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

// fid
export function validateFidCreate(fid) {
  return {
    type: VALIDATE_FID_CREATE,
    fid
  }
}

export function validateFidUpdate(fid) {
  return {
    type: VALIDATE_FID_UPDATE,
    fid
  }
}

export function validateFidRead(fid) {
  return {
    type: VALIDATE_FID_READ,
    fid
  }
}

// address
export function validateAddressCreate(address) {
  return {
    type: VALIDATE_ADDRESS_CREATE,
    address
  }
}

export function validateAddressUpdate(address) {
  return {
    type: VALIDATE_ADDRESS_UPDATE,
    address
  }
}

export function validateAddressRead(address) {
  return {
    type: VALIDATE_ADDRESS_READ,
    address
  }
}

/*
 * Table 
 */
export const SELECT_ROW = 'FAMILY_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}