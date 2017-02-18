import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { autoRehydrate } from 'redux-persist'
import { combineReducers } from 'redux'
// reducers
import { reducer } from 'redux-json-api'
import cacheReducer from './cache/reducers'
import loginReducer from './login/reducers'
import layoutReducer from './layout/reducers'
import userReducer from './user/reducers'

const rootReducer = combineReducers({
  api: reducer,
  cache: cacheReducer,
  login: loginReducer,
  layout: layoutReducer,
  user: userReducer,
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