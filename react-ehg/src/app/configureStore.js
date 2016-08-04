import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { autoRehydrate } from 'redux-persist'
import { combineReducers } from 'redux'
// reducers
import { reducer } from 'redux-json-api'
import loginReducer from './login/reducers'
import layoutReducer from './layout/reducers'
import regionReducer from './region/reducers'

const rootReducer = combineReducers({
  api: reducer,
  login: loginReducer,
  layout: layoutReducer,
  region: regionReducer
})

const enhancer = (
  autoRehydrate(),
  applyMiddleware(thunkMiddleware)
)

function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    enhancer
  )
}

export default configureStore