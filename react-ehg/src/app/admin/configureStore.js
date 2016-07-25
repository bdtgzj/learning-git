import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  )
}

export default configureStore