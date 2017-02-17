import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { autoRehydrate } from 'redux-persist'
import { combineReducers } from 'redux'
// reducers
import { reducer } from 'redux-json-api'
import cacheReducer from './cache/reducers'
import loginReducer from './login/reducers'
import layoutReducer from './layout/reducers'
import homecardReducer from './homecard/reducers'
import sceneReducer from './scene/reducers'
import regionReducer from './region/reducers'
import categoryReducer from './category/reducers'
import deviceReducer from './device/reducers'
import instructionReducer from './instruction/reducers'
import userReducer from './user/reducers'
import iconReducer from './icon/reducers'
import colorReducer from './color/reducers'
import inscatReducer from './inscat/reducers'
import familyReducer from './family/reducers'
import logReducer from './log/reducers'

const rootReducer = combineReducers({
  api: reducer,
  cache: cacheReducer,
  login: loginReducer,
  layout: layoutReducer,
  homecard: homecardReducer,
  scene: sceneReducer,
  region: regionReducer,
  category: categoryReducer,
  device: deviceReducer,
  instruction: instructionReducer,
  user: userReducer,
  icon: iconReducer,
  color: colorReducer,
  inscat: inscatReducer,
  family: familyReducer,
  log: logReducer
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