import { combineReducers } from 'redux'
// res
import strings from '../res/strings'
// actions
import { SET_USER,
         OPEN_READ_DIALOG, OPEN_DELETE_DIALOG,
         VALIDATE_CATEGORY_READ, VALIDATE_LOG_READ,
         SELECT_ROW,
       } from './actions'
// validator
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
function readDialog(state = {isVisible: false, category: {}, log: {}}, action) {
  switch (action.type) {
    case OPEN_READ_DIALOG:
      if (action.open) {
        return Object.assign({}, state, {isVisible: true})
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_CATEGORY_READ:
      if (action.category === -1) {
        return Object.assign({}, state, {category:{}})
      } else {
        return Object.assign({}, state, {category:{value: action.category}})
      }
    case VALIDATE_LOG_READ:
      if (!action.log || isLength(trim(action.log), {min: 2, max: 50})) {
        return Object.assign({}, state, {log:{value: action.log, valid: true}})
      } else {
        return Object.assign({}, state, {log:{value: action.log, valid: false, error: strings.error_prompt_log}})
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
        content = {__html: '确认删除日志：<span style="background-color:#ff0000; color:#ffffff;">' + tmp + '</span>吗？删除后将无法恢复！'}
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
  readDialog,
  deleteDialog,
  user,
  selected
})

export default indexReducer