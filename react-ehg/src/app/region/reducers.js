import { combineReducers } from 'redux'
import { OPEN_ALERT_DIALOG, OPEN_CREATE_DIALOG, OPEN_UPDATE_DIALOG, OPEN_READ_DIALOG, SET_USER, SELECT_ROW } from './actions'


/*
 * User
 */
function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
        return {id: action.id}
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

function createDialog(state = {isVisible: false}, action) {
  switch (action.type) {
    case OPEN_CREATE_DIALOG:
      if (action.open) {
        return {isVisible: true}
      } else {
        return {isVisible: false}
      }
    default:
      return state
  }
}

function updateDialog(state = {isVisible: false}, action) {
  switch (action.type) {
    case OPEN_UPDATE_DIALOG:
      if (action.open) {
        return {isVisible: true}
      } else {
        return {isVisible: false}
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

const indexReducer = combineReducers({
  alertDialog,
  createDialog,
  updateDialog,
  readDialog,
  user,
  selected
})

export default indexReducer