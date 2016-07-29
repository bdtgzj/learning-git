import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { autoRehydrate } from 'redux-persist'

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