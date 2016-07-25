import fetch from 'isomorphic-fetch'

export const VALIDATE_NAME = 'VALIDATE_NAME'
export const VALIDATE_PASSWORD = 'VALIDATE_PASSWORD'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

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

export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    json
  }
}

export function login(admin) {
  return function(dispatch) {
    // sync
    dispatch(loginRequest(admin))
    // async
    return fetch('http://localhost:3000/admin/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
    })
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => dispatch(loginSuccess(json)))
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