import fetch from 'isomorphic-fetch'
import { browserHistory, hashHistory } from 'react-router'

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

export function loginRequest(admin) {
  return {
    type: LOGIN_REQUEST,
    admin
  }
}

export function loginFailure(e) {
  return {
    type: LOGIN_FAILURE,
    e
  }
}

export function loginSuccess(admin) {
  return {
    type: LOGIN_SUCCESS,
    admin
  }
}

export function login(admin) {
  return function(dispatch) {
    // sync
    dispatch(loginRequest(admin))
    // async
    return fetch('http://localhost:3000/admin/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          type: 'admin',
          attributes: admin
        }
      })
    })
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => {
        if (json.data === null) {
          dispatch(loginFailure("用户名或密码错误！"))
        } else {
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