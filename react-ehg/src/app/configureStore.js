import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { autoRehydrate } from 'redux-persist'
import { combineReducers } from 'redux'
// reducers
import { reducer } from 'redux-json-api'
import cacheReducer from './cache/reducers'
import loginReducer from './login/reducers'
import layoutReducer from './layout/reducers'
import regionReducer from './region/reducers'
import categoryReducer from './category/reducers'
import deviceReducer from './device/reducers'
import iconReducer from './icon/reducers'
import colorReducer from './color/reducers'

const rootReducer = combineReducers({
  api: reducer,
  cache: cacheReducer,
  login: loginReducer,
  layout: layoutReducer,
  region: regionReducer,
  category: categoryReducer,
  device: deviceReducer,
  icon: iconReducer,
  color: colorReducer
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