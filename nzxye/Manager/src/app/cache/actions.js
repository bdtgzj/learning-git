import apiRequest from '../util/api_request'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// actions
import { openAlertDialog } from '../layout/actions'

/**
 * 
 */
export const SET_CACHE_USERS = 'SET_CACHE_USERS'
export const SET_CACHE_ICONS = 'SET_CACHE_ICONS'
export const SET_CACHE_COLORS = 'SET_CACHE_COLORS'
export const SET_CACHE_INSCATS = 'SET_CACHE_INSCATS'
export const SET_CACHE_FAMILYS = 'SET_CACHE_FAMILYS'

export function setCacheUsers(users) {
  return {
    type: SET_CACHE_USERS,
    users
  }
}

export function setCacheIcons(icons) {
  return {
    type: SET_CACHE_ICONS,
    icons
  }
}

export function setCacheColors(colors) {
  return {
    type: SET_CACHE_COLORS,
    colors
  }
}

export function setCacheInscats(inscats) {
  return {
    type: SET_CACHE_INSCATS,
    inscats
  }
}

export function setCacheFamilys(familys) {
  return {
    type: SET_CACHE_FAMILYS,
    familys
  }
}

/**
 * Network
 */
export const READ_REQUEST = 'CACHE_READ_REQUEST'
export const READ_FAILURE = 'CACHE_READ_FAILURE'
export const READ_SUCCESS = 'CACHE_READ_SUCCESS'

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

export function refreshCache() {
  return (dispatch, getState) => {
    // sync
    dispatch(readRequest())
    // async
    const { host: apiHost, path: apiPath, accessToken } = getState().api.endpoint
    const urlUser = `${apiHost}${apiPath}/${CONFIG.ENTITY.USER}`
    const urlIcon = `${apiHost}${apiPath}/${CONFIG.ENTITY.ICON}`
    const urlColor = `${apiHost}${apiPath}/${CONFIG.ENTITY.COLOR}`
    const urlInscat = `${apiHost}${apiPath}/${CONFIG.ENTITY.INSCAT}`
    const urlFamily = `${apiHost}${apiPath}/${CONFIG.ENTITY.FAMILY}`
    const promises = [
      apiRequest(urlUser, accessToken),
      apiRequest(urlIcon, accessToken),
      apiRequest(urlColor, accessToken),
      apiRequest(urlInscat, accessToken),
      apiRequest(urlFamily, accessToken)
    ]
    Promise.all(promises)
    .then(jsons => {
      dispatch(readSuccess())
      dispatch(setCacheUsers(jsons[0]))
      dispatch(setCacheIcons(jsons[1]))
      dispatch(setCacheColors(jsons[2]))
      dispatch(setCacheInscats(jsons[3]))
      dispatch(setCacheFamilys(jsons[4]))
      dispatch(openAlertDialog(true, strings.action_refresh_ok_prompt))
    })
    .catch(err => {
      dispatch(readFailure())
      dispatch(openAlertDialog(true, strings.action_error_network_prompt))
    })
  }
}