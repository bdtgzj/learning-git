import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { autoRehydrate } from 'redux-persist'
import { combineReducers } from 'redux'
// reducers
import adminReducer from './admin/reducers'
import layoutReducer from './layout/reducers'
import { reducer } from 'redux-json-api'

const rootReducer = combineReducers({
  admin: adminReducer,
  layout: layoutReducer,
  api: reducer
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