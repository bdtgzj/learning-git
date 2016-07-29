import { combineReducers } from 'redux'
import { SIGN_OUT } from './actions'

function isLogined(state = false, action) {
  switch (action.type) {
    case SIGN_OUT:
      return false
    default:
      return state
  }
}

const indexReducer = combineReducers({
  isLogined
})

export default indexReducer