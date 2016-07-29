import { combineReducers } from 'redux'
import { VALIDATE_NAME, VALIDATE_PASSWORD, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, DIALOG_OK } from './actions'
import trim from 'validator/lib/trim'
import isLength from 'validator/lib/isLength'

function name(state = {value: '', valid: false}, action) {
  switch (action.type) {
    case VALIDATE_NAME:
      if (isLength(trim(action.name), {min: 6, max: 18})) {
        return {
          value: action.name,
          valid: true
        }
      } else {
        return {
          value: action.name,
          valid: false,
          error: '请输入6至18个字符！'
        }
      }
    default:
      return state
  }
}

function password(state = {value: '', valid: false}, action) {
  switch (action.type) {
    case VALIDATE_PASSWORD:
      if (isLength(trim(action.password), {min: 6, max: 18})) {
        return {
          value: action.password,
          valid: true
        }
      } else {
        return {
          value: action.password,
          valid: false,
          error: '请输入6至18个字符！'
        }
      }
    default:
      return state
  }
}

function login(state = {logining: false}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {logining: true})
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {logining: false, admin: action.admin})
    case LOGIN_FAILURE:
      return Object.assign({}, state, {logining: true, e: action.e})
    case DIALOG_OK:
      return {logining: false}
    default:
      return state
  }
}

const indexReducer = combineReducers({
  name,
  password,
  login
})

export default indexReducer