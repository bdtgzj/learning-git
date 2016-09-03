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
export const VALIDATE_NAME_UPDATE = 'DEVICE_VALIDATE_NAME_UPDATE'
export const VALIDATE_NAME_READ = 'DEVICE_VALIDATE_NAME_READ'
export const VALIDATE_ORDER_CREATE = 'DEVICE_VALIDATE_ORDER_CREATE'
export const VALIDATE_ORDER_UPDATE = 'DEVICE_VALIDATE_ORDER_UPDATE'

export const SET_ICON_ID_CREATE = 'DEVICE_SET_ICON_ID_CREATE'
export const SET_ICON_ID_UPDATE = 'DEVICE_SET_ICON_ID_UPDATE'
export const SET_COLOR_ID_CREATE = 'DEVICE_SET_COLOR_ID_CREATE'
export const SET_COLOR_ID_UPDATE = 'DEVICE_SET_COLOR_ID_UPDATE'

export const SET_REGION_ID_CREATE = 'DEVICE_SET_REGION_ID_CREATE'
export const SET_REGION_ID_UPDATE = 'DEVICE_SET_REGION_ID_UPDATE'
export const SET_REGION_ID_READ = 'DEVICE_SET_REGION_ID_READ'
export const SET_CATEGORY_ID_CREATE = 'DEVICE_SET_CATEGORY_ID_CREATE'
export const SET_CATEGORY_ID_UPDATE = 'DEVICE_SET_CATEGORY_ID_UPDATE'
export const SET_CATEGORY_ID_READ = 'DEVICE_SET_CATEGORY_ID_READ'

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

export function setCategoryIdRead(id) {
  return {
    type: SET_CATEGORY_ID_READ,
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

/**
 * getRegionCategory
 */

export const SET_REGIONS = 'DEVICE_SET_REGIONS'
export const SET_CATEGORYS = 'DEVICE_SET_CATEGORYS'

export function setRegions(regions) {
  return {
    type: SET_REGIONS,
    regions
  }
}

export function setCategorys(categorys) {
  return {
    type: SET_CATEGORYS,
    categorys
  }
}

// network
export const READ_REQUEST = 'DEVICE_READ_REQUEST'
export const READ_FAILURE = 'DEVICE_READ_FAILURE'
export const READ_SUCCESS = 'DEVICE_READ_SUCCESS'

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

export function getRegionCategory(condition) {
  return (dispatch, getState) => {
    // sync
    dispatch(readRequest())
    // async
    const { host: apiHost, path: apiPath, accessToken } = getState().api.endpoint
    const urlRegion = `${apiHost}${apiPath}/${CONFIG.ENTITY.REGION}${condition}`
    const urlCategory = `${apiHost}${apiPath}/${CONFIG.ENTITY.CATEGORY}${condition}`
    const promises = [apiRequest(urlRegion, accessToken), apiRequest(urlCategory, accessToken)]
    Promise.all(promises)
    .then(jsons => {
      let JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer
      dispatch(readSuccess())
      dispatch(setRegions(new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(jsons[0] || {data:[]})))
      dispatch(setCategorys(new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(jsons[1] || {data:[]})))
    })
    .catch(err => {
      dispatch(readFailure())
      dispatch(openAlertDialog(true, strings.action_error_network_prompt))
    })
  }
}

