import { combineReducers } from 'redux'
import { OPEN_ALERT_DIALOG } from './actions'

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

function user(state = {}, action) {
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

function selected(state = [], action) {
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

const indexReducer = combineReducers({
  alertDialog,
  user,
  selected
})

export default indexReducer