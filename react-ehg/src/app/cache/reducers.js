import { combineReducers } from 'redux'
import { SET_CACHE_USERS, SET_CACHE_ICONS, 
         SET_CACHE_COLORS, SET_CACHE_INSCATS, SET_CACHE_FAMILYS,
         READ_REQUEST, READ_FAILURE, READ_SUCCESS
       } from './actions'
// config
import CONFIG from '../config'

/**
 * 
 */
var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

function users(state = [], action) {
  switch (action.type) {
    case SET_CACHE_USERS:
      return new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(action.users || {data:[]})
    default:
      return state
  }
}

function icons(state = [], action) {
  switch (action.type) {
    case SET_CACHE_ICONS:
      return new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(action.icons || {data:[]})
    default:
      return state
  }
}

function colors(state = [], action) {
  switch (action.type) {
    case SET_CACHE_COLORS:
      return new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(action.colors || {data:[]})
    default:
      return state
  }
}

function inscats(state = [], action) {
  switch (action.type) {
    case SET_CACHE_INSCATS:
      return new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(action.inscats || {data:[]})
    default:
      return state
  }
}

function familys(state = [], action) {
  switch (action.type) {
    case SET_CACHE_FAMILYS:
      return new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(action.familys || {data:[]})
    default:
      return state
  }
}

/**
 * Network
 */
function isReading(state = false, action) {
  switch (action.type) {
    case READ_REQUEST:
      return true
    case READ_SUCCESS:
      return false
    case READ_FAILURE:
      return false
    default:
      return state
  }
}


const indexReducer = combineReducers({
  users,
  icons,
  colors,
  inscats,
  familys,
  isReading,
})

export default indexReducer