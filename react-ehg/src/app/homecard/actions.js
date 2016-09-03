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
export const SET_USER = 'HOMECARD_SET_USER'

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

/*
 * Dialog 
 */
export const OPEN_CREATE_DIALOG = 'HOMECARD_OPEN_CREATE_DIALOG'
export const OPEN_READ_DIALOG = 'HOMECARD_OPEN_READ_DIALOG'
export const OPEN_UPDATE_DIALOG = 'HOMECARD_OPEN_UPDATE_DIALOG'
export const OPEN_DELETE_DIALOG = 'HOMECARD_OPEN_DELETE_DIALOG'

export const VALIDATE_NAME_CREATE = 'HOMECARD_VALIDATE_NAME_CREATE'
export const VALIDATE_NAME_UPDATE = 'HOMECARD_VALIDATE_NAME_UPDATE'
export const VALIDATE_NAME_READ = 'HOMECARD_VALIDATE_NAME_READ'
export const VALIDATE_ORDER_CREATE = 'HOMECARD_VALIDATE_ORDER_CREATE'
export const VALIDATE_ORDER_UPDATE = 'HOMECARD_VALIDATE_ORDER_UPDATE'

export const SET_ICON_ID_CREATE = 'HOMECARD_SET_ICON_ID_CREATE'
export const SET_ICON_ID_UPDATE = 'HOMECARD_SET_ICON_ID_UPDATE'
export const SET_COLOR_ID_CREATE = 'HOMECARD_SET_COLOR_ID_CREATE'
export const SET_COLOR_ID_UPDATE = 'HOMECARD_SET_COLOR_ID_UPDATE'

export const SET_DEVICE_ID_CREATE = 'HOMECARD_SET_DEVICE_ID_CREATE'
export const SET_DEVICE_ID_UPDATE = 'HOMECARD_SET_DEVICE_ID_UPDATE'
export const SET_SCENE_ID_CREATE = 'HOMECARD_SET_SCENE_ID_CREATE'
export const SET_SCENE_ID_UPDATE = 'HOMECARD_SET_SCENE_ID_UPDATE'

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

// device
export function setDeviceIdCreate(id) {
  return {
    type: SET_DEVICE_ID_CREATE,
    id
  }
}

export function setDeviceIdUpdate(id) {
  return {
    type: SET_DEVICE_ID_UPDATE,
    id
  }
}

// scene
export function setSceneIdCreate(id) {
  return {
    type: SET_SCENE_ID_CREATE,
    id
  }
}

export function setSceneIdUpdate(id) {
  return {
    type: SET_SCENE_ID_UPDATE,
    id
  }
}

/*
 * Table 
 */
export const SELECT_ROW = 'HOMECARD_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}

/**
 * getDeviceScene
 */

export const SET_DEVICES = 'HOMECARD_SET_DEVICES'
export const SET_SCENES = 'HOMECARD_SET_SCENES'

export function setDevices(devices) {
  return {
    type: SET_DEVICES,
    devices
  }
}

export function setScenes(scenes) {
  return {
    type: SET_SCENES,
    scenes
  }
}

// network
export const READ_REQUEST = 'HOMECARD_READ_REQUEST'
export const READ_FAILURE = 'HOMECARD_READ_FAILURE'
export const READ_SUCCESS = 'HOMECARD_READ_SUCCESS'

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

export function getDeviceScene(condition) {
  return (dispatch, getState) => {
    // sync
    dispatch(readRequest())
    // async
    const { host: apiHost, path: apiPath, accessToken } = getState().api.endpoint
    const urlDevice = `${apiHost}${apiPath}/${CONFIG.ENTITY.DEVICE}${condition}`
    const urlScene = `${apiHost}${apiPath}/${CONFIG.ENTITY.SCENE}${condition}`
    const promises = [apiRequest(urlDevice, accessToken), apiRequest(urlScene, accessToken)]
    Promise.all(promises)
    .then(jsons => {
      let JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer
      dispatch(readSuccess())
      dispatch(setDevices(new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(jsons[0] || {data:[]})))
      dispatch(setScenes(new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(jsons[1] || {data:[]})))
    })
    .catch(err => {
      dispatch(readFailure())
      dispatch(openAlertDialog(true, strings.action_error_network_prompt))
    })
  }
}

