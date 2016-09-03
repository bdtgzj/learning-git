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
export const SET_USER = 'INSTRUCTION_SET_USER'

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

/*
 * Dialog 
 */
export const OPEN_CREATE_DIALOG = 'INSTRUCTION_OPEN_CREATE_DIALOG'
export const OPEN_READ_DIALOG = 'INSTRUCTION_OPEN_READ_DIALOG'
export const OPEN_UPDATE_DIALOG = 'INSTRUCTION_OPEN_UPDATE_DIALOG'
export const OPEN_DELETE_DIALOG = 'INSTRUCTION_OPEN_DELETE_DIALOG'

export const VALIDATE_NAME_CREATE = 'INSTRUCTION_VALIDATE_NAME_CREATE'
export const VALIDATE_NAME_UPDATE = 'INSTRUCTION_VALIDATE_NAME_UPDATE'
export const VALIDATE_NAME_READ = 'INSTRUCTION_VALIDATE_NAME_READ'
export const VALIDATE_INSTRUCTION_CREATE = 'INSTRUCTION_VALIDATE_INSTRUCTION_CREATE'
export const VALIDATE_INSTRUCTION_UPDATE = 'INSTRUCTION_VALIDATE_INSTRUCTION_UPDATE'
export const SET_CATEGORY_ID_CREATE = 'INSTRUCTION_SET_CATEGORY_ID_CREATE'
export const SET_CATEGORY_ID_UPDATE = 'INSTRUCTION_SET_CATEGORY_ID_UPDATE'
export const SET_DEVICE_ID_CREATE = 'INSTRUCTION_SET_DEVICE_ID_CREATE'
export const SET_DEVICE_ID_UPDATE = 'INSTRUCTION_SET_DEVICE_ID_UPDATE'
export const SET_DEVICE_ID_READ = 'INSTRUCTION_SET_DEVICE_ID_READ'
export const SET_SCENE_ID_CREATE = 'INSTRUCTION_SET_SCENE_ID_CREATE'
export const SET_SCENE_ID_UPDATE = 'INSTRUCTION_SET_SCENE_ID_UPDATE'
export const SET_SCENE_ID_READ = 'INSTRUCTION_SET_SCENE_ID_READ'
export const VALIDATE_ORDER_CREATE = 'INSTRUCTION_VALIDATE_ORDER_CREATE'
export const VALIDATE_ORDER_UPDATE = 'INSTRUCTION_VALIDATE_ORDER_UPDATE'

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

// instruction
export function validateInstructionCreate(instruction) {
  return {
    type: VALIDATE_INSTRUCTION_CREATE,
    instruction
  }
}

export function validateInstructionUpdate(instruction) {
  return {
    type: VALIDATE_INSTRUCTION_UPDATE,
    instruction
  }
}

// category
export function setCategoryIdCreate(id) {
  return {
    type: SET_CATEGORY_ID_CREATE,
    id
  }
}

export function setCategoryIdUpdate(id) {
  return {
    type: SET_CATEGORY_ID_UPDATE,
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

export function setDeviceIdRead(id) {
  return {
    type: SET_DEVICE_ID_READ,
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

export function setSceneIdRead(id) {
  return {
    type: SET_SCENE_ID_READ,
    id
  }
}

/*
 * Table 
 */
export const SELECT_ROW = 'INSTRUCTION_SELECT_ROW'

export function selectRow(rows) {
  return {
    type: SELECT_ROW,
    rows
  }
}

/**
 * getDeviceScene
 */

export const SET_DEVICES = 'INSTRUCTION_SET_DEVICES'
export const SET_SCENES = 'INSTRUCTION_SET_SCENES'

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
export const READ_REQUEST = 'INSTRUCTION_READ_REQUEST'
export const READ_FAILURE = 'INSTRUCTION_READ_FAILURE'
export const READ_SUCCESS = 'INSTRUCTION_READ_SUCCESS'

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

