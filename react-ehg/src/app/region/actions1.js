import config from '../config'
import fetch from 'isomorphic-fetch'
import { browserHistory, hashHistory } from 'react-router'

export const VALIDATE_NAME = 'VALIDATE_NAME'
export const VALIDATE_ORDER = 'VALIDATE_ORDER'

export const CREATE_REQUEST = 'CREATE_REQUEST'
export const CREATE_FAILURE = 'CREATE_FAILURE'
export const CREATE_SUCCESS = 'CREATE_SUCCESS'

export const DIALOG_OK = 'DIALOG_OK'


/*
 * validate 
 */
export function validateName(name) {
  return {
    type: VALIDATE_NAME,
    name
  }
}

export function validateOrder(order) {
  return {
    type: VALIDATE_ORDER,
    password
  }
}

/*
 * create
 */
export function createRequest(uid, region) {
  return {
    type: CREATE_REQUEST,
    uid,
    region
  }
}

export function createFailure(e) {
  return {
    type: CREATE_FAILURE,
    e
  }
}

export function createSuccess(region) {
  return {
    type: CREATE_SUCCESS,
    region
  }
}

export function create(region) {
  return function(dispatch) {
    // sync
    dispatch(createRequest(region))
    // async
    return fetch(config.host + 'region', {
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

/*
 * read 
 */

/*
 * update 
 */

/*
 * delete 
 */