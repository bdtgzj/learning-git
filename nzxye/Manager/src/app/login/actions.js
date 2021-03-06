import fetch from 'isomorphic-fetch'
import { browserHistory, hashHistory } from 'react-router'
import { setAccessToken, readEndpoint } from 'redux-json-api'
// res
import strings from '../res/strings'
// config
import CONFIG from '../config'
// actions
import { setCacheUsers, setCacheIcons, setCacheColors, setCacheInscats, setCacheFamilys } from '../cache/actions'
import { openAlertDialog } from '../layout/actions'

var Base64 = require('js-base64').Base64;

export const VALIDATE_NAME = 'VALIDATE_NAME'
export const VALIDATE_PASSWORD = 'VALIDATE_PASSWORD'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const DIALOG_OK = 'DIALOG_OK'

export function validateName(name) {
  return {
    type: VALIDATE_NAME,
    name
  }
}

export function validatePassword(password) {
  return {
    type: VALIDATE_PASSWORD,
    password
  }
}

export function loginRequest(user) {
  return {
    type: LOGIN_REQUEST,
    user
  }
}

export function loginFailure(e) {
  return {
    type: LOGIN_FAILURE,
    e
  }
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export function login(user) {
  return function(dispatch) {
    // sync
    dispatch(loginRequest(user))
    // async
    return fetch(CONFIG.HOST + '/user/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          type: 'user',
          attributes: user
        }
      })
    })
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => {
        if (json.data === null) {
          dispatch(loginFailure("用户名或密码错误！"))
        } else {
          // set access token
          dispatch(setAccessToken(Base64.encode(user.name + ':' + user.key)))
          // get users & set cache
          dispatch(readEndpoint(CONFIG.ENTITY.USER))
          .then(json=>dispatch(setCacheUsers(json)))
          .catch(err=>dispatch(openAlertDialog(true, strings.cache_error_prompt_get_user)))
          // update state
          dispatch(loginSuccess(json))
          // route to main
          browserHistory.push('/')
          //hashHistory.push('/')
          //document.location.href = "http://baidu.com"
        }
      })
      .catch(e => dispatch(loginFailure(e.toString())))
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function dialogOk() {
  return {
    type: DIALOG_OK
  }
}