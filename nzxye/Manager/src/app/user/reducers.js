import { combineReducers } from 'redux'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// actions
import { SET_USER,
         OPEN_CREATE_DIALOG, OPEN_READ_DIALOG, OPEN_UPDATE_DIALOG, OPEN_DELETE_DIALOG,
         VALIDATE_NAME_CREATE, VALIDATE_NAME_UPDATE, VALIDATE_NAME_READ,
         VALIDATE_NICKNAME_CREATE, VALIDATE_NICKNAME_UPDATE, VALIDATE_NICKNAME_READ,
         VALIDATE_EMAIL_CREATE, VALIDATE_EMAIL_UPDATE, VALIDATE_EMAIL_READ,
         VALIDATE_MPHONE_CREATE, VALIDATE_MPHONE_UPDATE, VALIDATE_MPHONE_READ,
         SET_STATE_CREATE, SET_STATE_UPDATE, SET_STATE_READ,
         SET_FAMILYID_CREATE, SET_FAMILYID_UPDATE, SET_FAMILYID_READ,
         SELECT_ROW,
       } from './actions'
// validator
import trim from 'validator/lib/trim'
import isLength from 'validator/lib/isLength'
import isInt from 'validator/lib/isInt'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

const defaultState = {
  isVisible: false,
  name: {},
  nickName: {},
  email: {},
  mphone: {},
  state: {value: 1},
  family: {}
}

/*
 * Dialog
 */
function createDialog(state = defaultState, action) {
  switch (action.type) {
    case OPEN_CREATE_DIALOG:
      if (action.open) {
        return Object.assign({}, state, {isVisible: true})
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_NAME_CREATE:
      if (isLength(trim(action.name), {min: 6, max: 18})) {
        return Object.assign({}, state, {name:{value: action.name, valid: true}})
      } else {
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: strings.error_prompt_loginname}})
      }
    case VALIDATE_NICKNAME_CREATE:
      if (!action.nickName || isLength(trim(action.nickName), {min: 1, max: 18})) {
        return Object.assign({}, state, {nickName:{value: trim(action.nickName), valid: true}})
      } else {
        return Object.assign({}, state, {nickName:{value: action.nickName, valid: false, error: strings.error_prompt_nickname}})
      }
    case VALIDATE_EMAIL_CREATE:
      if (isEmail(trim(action.email))) {
        return Object.assign({}, state, {email:{value: action.email, valid: true}})
      } else {
        return Object.assign({}, state, {email:{value: action.email, valid: false, error: strings.error_prompt_email}})
      }
    case VALIDATE_MPHONE_CREATE:
      if (isMobilePhone(trim(action.mphone), CONFIG.MOBILE_PHONE_LOCAL)) {
        return Object.assign({}, state, {mphone:{value: action.mphone, valid: true}})
      } else {
        return Object.assign({}, state, {mphone:{value: action.mphone, valid: false, error: strings.error_prompt_mphone}})
      }
    case SET_STATE_CREATE:
      return Object.assign({}, state, {state:{value: action.state}})
    case SET_FAMILYID_CREATE:
      return Object.assign({}, state, {family:{id: action.id}})
    default:
      return state
  }
}

function readDialog(state = defaultState, action) {
  switch (action.type) {
    case OPEN_READ_DIALOG:
      if (action.open) {
        return Object.assign({}, state, {isVisible: true})
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_NAME_READ:
      if (!action.name || isLength(trim(action.name), {min: 1, max: 10})) {
        return Object.assign({}, state, {name:{value: action.name, valid: true}})
      } else {
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: strings.error_prompt_name}})
      }
    case VALIDATE_NICKNAME_READ:
      if (!action.nickName || isLength(trim(action.nickName), {min: 1, max: 10})) {
        return Object.assign({}, state, {nickName:{value: trim(action.nickName), valid: true}})
      } else {
        return Object.assign({}, state, {nickName:{value: action.nickName, valid: false, error: strings.error_prompt_name}})
      }
    case VALIDATE_EMAIL_READ:
      if (!action.email || isEmail(trim(action.email))) {
        return Object.assign({}, state, {email:{value: action.email, valid: true}})
      } else {
        return Object.assign({}, state, {email:{value: action.email, valid: false, error: strings.error_prompt_email}})
      }
    case VALIDATE_MPHONE_READ:
      if (!action.mphone || isMobilePhone(trim(action.mphone), CONFIG.MOBILE_PHONE_LOCAL)) {
        return Object.assign({}, state, {mphone:{value: action.mphone, valid: true}})
      } else {
        return Object.assign({}, state, {mphone:{value: action.mphone, valid: false, error: strings.error_prompt_mphone}})
      }
    case SET_STATE_READ:
      if (action.state === -1) {
        return Object.assign({}, state, {state:{}})
      } else {
        return Object.assign({}, state, {state:{value: action.state}})
      }
    case SET_FAMILYID_READ:
      if (action.id === -1) {
        return Object.assign({}, state, {family:{}})
      } else {
        return Object.assign({}, state, {family:{id: action.id}})
      }
    default:
      return state
  }
}

function updateDialog(state = defaultState, action) {
  switch (action.type) {
    case OPEN_UPDATE_DIALOG:
      if (action.open) {
        return Object.assign({}, state,
          { isVisible: true, 
            id: action.selectedRow.id,
            name: {value: action.selectedRow.name, valid: true},
            nickName: {value: action.selectedRow.nickName, valid: true},
            email: {value: action.selectedRow.email, valid: true},
            mphone: {value: action.selectedRow.mphone, valid: true},
            state: {value: action.selectedRow.state, valid: true},
            family: {id: action.selectedRow.familyId, valid: true},
          })
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_NAME_UPDATE:
      if (isLength(trim(action.name), {min: 6, max: 18})) {
        return Object.assign({}, state, {name:{value: action.name, valid: true}})
      } else {
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: strings.error_prompt_loginname}})
      }
    case VALIDATE_NICKNAME_UPDATE:
      if (!action.nickName || isLength(trim(action.nickName), {min: 1, max: 18})) {
        return Object.assign({}, state, {nickName:{value: trim(action.nickName), valid: true}})
      } else {
        return Object.assign({}, state, {nickName:{value: action.nickName, valid: false, error: strings.error_prompt_nickname}})
      }
    case VALIDATE_EMAIL_UPDATE:
      if (isEmail(trim(action.email))) {
        return Object.assign({}, state, {email:{value: action.email, valid: true}})
      } else {
        return Object.assign({}, state, {email:{value: action.email, valid: false, error: strings.error_prompt_email}})
      }
    case VALIDATE_MPHONE_UPDATE:
      if (isMobilePhone(trim(action.mphone), CONFIG.MOBILE_PHONE_LOCAL)) {
        return Object.assign({}, state, {mphone:{value: action.mphone, valid: true}})
      } else {
        return Object.assign({}, state, {mphone:{value: action.mphone, valid: false, error: strings.error_prompt_mphone}})
      }
    case SET_STATE_UPDATE:
      return Object.assign({}, state, {state:{value: action.state}})
    case SET_FAMILYID_UPDATE:
      return Object.assign({}, state, {family:{id: action.id}})
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
        content = {__html: '确认删除颜色：<span style="background-user:#ff0000; user:#ffffff;">' + tmp + '</span>吗？删除后将无法恢复！'}
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