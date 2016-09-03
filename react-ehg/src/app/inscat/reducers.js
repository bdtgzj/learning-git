import { combineReducers } from 'redux'
// res
import strings from '../res/strings'
// actions
import { SET_USER,
         OPEN_CREATE_DIALOG, OPEN_READ_DIALOG, OPEN_UPDATE_DIALOG, OPEN_DELETE_DIALOG,
         VALIDATE_NAME_CREATE, VALIDATE_NAME_UPDATE, VALIDATE_NAME_READ,
         VALIDATE_ORDER_CREATE, VALIDATE_ORDER_UPDATE, 
         SELECT_ROW,
       } from './actions'
// validator
import trim from 'validator/lib/trim'
import isLength from 'validator/lib/isLength'
import isInt from 'validator/lib/isInt'

/*
 * Dialog
 */
function createDialog(state = {isVisible: false, name: {}, inscat: {}, order: {}}, action) {
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
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: strings.error_prompt_name}})
      }
    case VALIDATE_ORDER_CREATE:
      if (isInt(trim(action.order))) {
        return Object.assign({}, state, {order:{value: action.order, valid: true}})
      } else {
        return Object.assign({}, state, {order:{value: action.order, valid: false, error: strings.error_prompt_order}})
      }
    default:
      return state
  }
}

function readDialog(state = {isVisible: false, name: {}}, action) {
  switch (action.type) {
    case OPEN_READ_DIALOG:
      if (action.open) {
        return Object.assign({}, state, {isVisible: true})
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_NAME_READ:
      if (isLength(trim(action.name), {min: 1, max: 10})) {
        return Object.assign({}, state, {name:{value: action.name, valid: true}})
      } else {
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: strings.error_prompt_name}})
      }
    default:
      return state
  }
}

function updateDialog(state = {isVisible: false, name: {}, inscat: {}, order: {}}, action) {
  switch (action.type) {
    case OPEN_UPDATE_DIALOG:
      if (action.open) {
        return Object.assign({}, state,
          { isVisible: true, 
            id: action.selectedRow.id,
            name: {value: action.selectedRow.name, valid: true},
            inscat: {value: action.selectedRow.inscat, valid: true},
            order: {value: action.selectedRow.order, valid: true}
          })
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_NAME_UPDATE:
      if (isLength(trim(action.name), {min: 1, max: 10})) {
        return Object.assign({}, state, {name:{value: action.name, valid: true}})
      } else {
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: strings.error_prompt_name}})
      }
    case VALIDATE_ORDER_UPDATE:
      if (isInt(trim(action.order))) {
        return Object.assign({}, state, {order:{value: action.order, valid: true}})
      } else {
        return Object.assign({}, state, {order:{value: action.order, valid: false, error: strings.error_prompt_order}})
      }
    default:
      return state
  }
}

function deleteDialog(state = {isVisible: false, content: ''}, action) {
  switch (action.type) {
    case OPEN_DELETE_DIALOG:
      if (action.open) {
        let content = '';
        let tmp = action.selectedRow.reduce((previousValue, v, k)=>{
          return previousValue += k===0 ? ('【' + v + '】') :  ('，【' + v + '】')
        }, '')
        content = {__html: '确认删除指令类型：<span style="background-color:#ff0000; color:#ffffff;">' + tmp + '</span>吗？删除后将无法恢复！'}
        return Object.assign({}, state, {isVisible: true, content: content})
      } else {
        return Object.assign({}, state, {isVisible: false, content: ''})
      }
    default:
      return state
  }
}

/*
 * Table
 */
function selected(state = [], action) {
  switch (action.type) {
    case SELECT_ROW:
      return action.rows
    default:
      return state
  }
}

// combine
const indexReducer = combineReducers({
  createDialog,
  readDialog,
  updateDialog,
  deleteDialog,
  selected
})

export default indexReducer