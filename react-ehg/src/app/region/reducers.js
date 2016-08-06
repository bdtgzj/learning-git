import { combineReducers } from 'redux'
import { SET_USER,
         OPEN_ALERT_DIALOG, OPEN_CREATE_DIALOG, OPEN_UPDATE_DIALOG, OPEN_READ_DIALOG, 
         VALIDATE_NAME_CREATE, VALIDATE_ORDER_CREATE, VALIDATE_NAME_UPDATE, VALIDATE_ORDER_UPDATE,
         SELECT_ROW,
       } from './actions'

import trim from 'validator/lib/trim'
import isLength from 'validator/lib/isLength'
import isInt from 'validator/lib/isInt'

/*
 * User
 */
function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
        return action.user
    default:
      return state
  }
}

/*
 * Dialog
 */
function alertDialog(state = {isVisible: false, content: ''}, action) {
  switch (action.type) {
    case OPEN_ALERT_DIALOG:
      if (action.open) {
        return {
          isVisible: true,
          content: action.content
        }
      } else {
        return {
          isVisible: false,
        }
      }
    default:
      return state
  }
}

function createDialog(state = {isVisible: false, name: {}, order: {}}, action) {
  switch (action.type) {
    case OPEN_CREATE_DIALOG:
      if (action.open) {
        return Object.assign({}, state, {isVisible: true})
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_NAME_CREATE:
      if (isLength(trim(action.name), {min: 1, max: 10})) {
        return Object.assign({}, state, {name:{value: action.name, valid: true}})
      } else {
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: '请输入1至10个字符！'}})
      }
    case VALIDATE_ORDER_CREATE:
      if (isInt(trim(action.order))) {
        return Object.assign({}, state, {order:{value: action.order, valid: true}})
      } else {
        return Object.assign({}, state, {order:{value: action.order, valid: false, error: '请输入数字字符！'}})
      }
    default:
      return state
  }
}

function updateDialog(state = {isVisible: false, name: {}, order: {}}, action) {
  switch (action.type) {
    case OPEN_UPDATE_DIALOG:
      if (action.open) {
        return Object.assign({}, state,
          { isVisible: true, 
            id: action.selectedRow.id,
            name: {value: action.selectedRow.name, valid: true},
            order: {value: action.selectedRow.order, valid: true}
          })
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_NAME_UPDATE:
      if (isLength(trim(action.name), {min: 1, max: 10})) {
        return Object.assign({}, state, {name:{value: action.name, valid: true}})
      } else {
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: '请输入1至10个字符！'}})
      }
    case VALIDATE_ORDER_UPDATE:
      if (isInt(trim(action.order))) {
        return Object.assign({}, state, {order:{value: action.order, valid: true}})
      } else {
        return Object.assign({}, state, {order:{value: action.order, valid: false, error: '请输入数字字符！'}})
      }
    default:
      return state
  }
}

function readDialog(state = {isVisible: false}, action) {
  switch (action.type) {
    case OPEN_READ_DIALOG:
      if (action.open) {
        return {isVisible: true}
      } else {
        return {isVisible: false}
      }
    default:
      return state
  }
}


/*
 * Table
 */
// state: 'none' 'all' [0, 1, 2]
function selected(state = 'none', action) {
  switch (action.type) {
    case SELECT_ROW:
      return action.rows
    default:
      return state
  }
}

// combine
const indexReducer = combineReducers({
  alertDialog,
  createDialog,
  updateDialog,
  readDialog,
  user,
  selected
})

export default indexReducer