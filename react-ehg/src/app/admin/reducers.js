import { combineReducers } from 'redux'
import { VALIDATE_NAME, VALIDATE_PASS } from './actions'

function user(state = {}, action) {
  switch (action.type) {
    case VALIDATE_NAME:
      if (!action.name) {
        return {error: 'please input your name!'}
      } else {
        return {name: action.name}
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user
})

export default rootReducer