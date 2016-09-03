import apiRequest from '../util/api_request'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// actions
import { openAlertDialog } from '../layout/actions'

/*
 * user
 */
export const SET_USER = 'SCENE_SET_USER'

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

/*
 * Dialog 
 */
export const OPEN_CREATE_DIALOG = 'SCENE_OPEN_CREATE_DIALOG'
export const OPEN_READ_DIALOG = 'SCENE_OPEN_READ_DIALOG'
export const OPEN_UPDATE_DIALOG = 'SCENE_OPEN_UPDATE_DIALOG'
export const OPEN_DELETE_DIALOG = 'SCENE_OPEN_DELETE_DIALOG'

export const VALIDATE_NAME_CREATE = 'SCENE_VALIDATE_NAME_CREATE'
export const VALIDATE_NAME_UPDATE = 'SCENE_VALIDATE_NAME_UPDATE'
export const VALIDATE_NAME_READ = 'SCENE_VALIDATE_NAME_READ'
export const VALIDATE_ORDER_CREATE = 'SCENE_VALIDATE_ORDER_CREATE'
export const VALIDATE_ORDER_UPDATE = 'SCENE_VALIDATE_ORDER_UPDATE'

export const SET_ICON_ID_CREATE = 'SCENE_SET_ICON_ID_CREATE'
export const SET_ICON_ID_UPDATE = 'SCENE_SET_ICON_ID_UPDATE'
export const SET_COLOR_ID_CREATE = 'SCENE_SET_COLOR_ID_CREATE'
export const SET_COLOR_ID_UPDATE = 'SCENE_SET_COLOR_ID_UPDATE'

export const SET_REGION_ID_CREATE = 'SCENE_SET_REGION_ID_CREATE'
export const SET_REGION_ID_UPDATE = 'SCENE_SET_REGION_ID_UPDATE'
export const SET_REGION_ID_READ = 'SCENE_SET_REGION_ID_READ'

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

// region
export function setRegionIdCreate(id) {
  return {
    type: SET_REGION_ID_CREATE,
    id
  }
}

export function setRegionIdUpdate(id) {
  return {
    type: SET_REGION_ID_UPDATE,
    id
  }
}

export function setRegionIdRead(id) {
  return {
    type: SET_REGION_ID_READ,
    id
  }
}

/*
 * Table 
 */
export const SELECT_ROW = 'SCENE_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}

/**
 * getRegion
 */

export const SET_REGIONS = 'SCENE_SET_REGIONS'

export function setRegions(regions) {
  return {
    type: SET_REGIONS,
    regions
  }
}

// network
export const READ_REQUEST = 'SCENE_READ_REQUEST'
export const READ_FAILURE = 'SCENE_READ_FAILURE'
export const READ_SUCCESS = 'SCENE_READ_SUCCESS'

export function readRequest() {
  return {
    type: READ_REQUEST
  }
}

export function readFailure() {
  return {
    type: READ_REQUEST
  }
}

export function readSuccess() {
  return {
    type: READ_REQUEST
  }
}

export function getRegion(condition) {
  return (dispatch, getState) => {
    // sync
    dispatch(readRequest())
    // async
    const { host: apiHost, path: apiPath, accessToken } = getState().api.endpoint
    const urlRegion = `${apiHost}${apiPath}/${CONFIG.ENTITY.REGION}${condition}`
    apiRequest(urlRegion, accessToken)
    .then(json => {
      let JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer
      dispatch(readSuccess())
      dispatch(setRegions(new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json || {data:[]})))
    })
    .catch(err => {
      dispatch(readFailure())
      dispatch(openAlertDialog(true, strings.action_error_network_prompt))
    })
  }
}

