import { combineReducers } from 'redux'
// res
import strings from '../res/strings'
// actions
import { SET_USER,
         OPEN_CREATE_DIALOG, OPEN_READ_DIALOG, OPEN_UPDATE_DIALOG, OPEN_DELETE_DIALOG,
         VALIDATE_NAME_CREATE, VALIDATE_ORDER_CREATE, VALIDATE_NAME_UPDATE, VALIDATE_ORDER_UPDATE, VALIDATE_NAME_READ,
         SET_ICON_ID_CREATE, SET_ICON_ID_UPDATE, SET_COLOR_ID_CREATE, SET_COLOR_ID_UPDATE,
         SET_DEVICE_ID_CREATE, SET_DEVICE_ID_UPDATE, SET_SCENE_ID_CREATE, SET_SCENE_ID_UPDATE,
         SELECT_ROW,
         SET_DEVICES, SET_SCENES
       } from './actions'
// validator
import trim from 'validator/lib/trim'
import isLength from 'validator/lib/isLength'
import isInt from 'validator/lib/isInt'

/*
 * User
 */
function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
        return action.user
    default:
      return state
  }
}

/*
 * Dialog
 */
function createDialog(state = {isVisible: false, name: {}, icon: {}, color: {}, device: {}, scene: {}, order: {}}, action) {
  switch (action.type) {
    case OPEN_CREATE_DIALOG:
      if (action.open) {
        return Object.assign({}, state, {isVisible: true})
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_NAME_CREATE:
      if (isLength(trim(action.name), {min: 1, max: 10})) {
        return Object.assign({}, state, {name:{value: action.name, valid: true}})
      } else {
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: strings.error_prompt_name}})
      }
    case SET_ICON_ID_CREATE:
      return Object.assign({}, state, {icon:{id: action.id}})
    case SET_COLOR_ID_CREATE:
      return Object.assign({}, state, {color:{id: action.id}})
    case SET_DEVICE_ID_CREATE:
      if (action.id === -1) {
        return Object.assign({}, state, {device:{}})
      } else {
        return Object.assign({}, state, {device:{id: action.id}})
      }
    case SET_SCENE_ID_CREATE:
      if (action.id === -1) {
        return Object.assign({}, state, {scene:{}})
      } else {
        return Object.assign({}, state, {scene:{id: action.id}})
      }
    case VALIDATE_ORDER_CREATE:
      if (isInt(trim(action.order))) {
        return Object.assign({}, state, {order:{value: action.order, valid: true}})
      } else {
        return Object.assign({}, state, {order:{value: action.order, valid: false, error: strings.error_prompt_order}})
      }
    default:
      return state
  }
}

function readDialog(state = {isVisible: false, name: {}}, action) {
  switch (action.type) {
    case OPEN_READ_DIALOG:
      if (action.open) {
        return Object.assign({}, state, {isVisible: true})
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_NAME_READ:
      if (isLength(trim(action.name), {min: 0, max: 10})) {
        return Object.assign({}, state, {name:{value: action.name, valid: true}})
      } else {
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: strings.error_prompt_name}})
      }
    default:
      return state
  }
}

function updateDialog(state = {isVisible: false, name: {}, icon: {}, color: {}, device: {}, scene: {}, order: {}}, action) {
  switch (action.type) {
    case OPEN_UPDATE_DIALOG:
      if (action.open) {
        return Object.assign({}, state,
          { isVisible: true, 
            id: action.selectedRow.id,
            name: {value: action.selectedRow.name, valid: true},
            icon: {id: action.selectedRow.iconId},
            color: {id: action.selectedRow.colorId},
            device: {id: action.selectedRow.deviceId},
            scene: {id: action.selectedRow.sceneId},
            order: {value: action.selectedRow.order, valid: true}
          })
      } else {
        return Object.assign({}, state, {isVisible: false})
      }
    case VALIDATE_NAME_UPDATE:
      if (isLength(trim(action.name), {min: 1, max: 10})) {
        return Object.assign({}, state, {name:{value: action.name, valid: true}})
      } else {
        return Object.assign({}, state, {name:{value: action.name, valid: false, error: strings.error_prompt_name}})
      }
    case SET_ICON_ID_UPDATE:
      return Object.assign({}, state, {icon:{id: action.id}})
    case SET_COLOR_ID_UPDATE:
      return Object.assign({}, state, {color:{id: action.id}})
    case SET_DEVICE_ID_UPDATE:
      if (action.id === -1) {
        return Object.assign({}, state, {device:{}})
      } else {
        return Object.assign({}, state, {device:{id: action.id}})
      }
    case SET_SCENE_ID_UPDATE:
      if (action.id === -1) {
        return Object.assign({}, state, {scene:{}})
      } else {
        return Object.assign({}, state, {scene:{id: action.id}})
      }
    case VALIDATE_ORDER_UPDATE:
      if (isInt(trim(action.order))) {
        return Object.assign({}, state, {order:{value: action.order, valid: true}})
      } else {
        return Object.assign({}, state, {order:{value: action.order, valid: false, error: strings.error_prompt_order}})
      }
    default:
      return state
  }
}

function deleteDialog(state = {isVisible: false, content: ''}, action) {
  switch (action.type) {
    case OPEN_DELETE_DIALOG:
      if (action.open) {
        let content = '';
        let tmp = action.selectedRow.reduce((previousValue, v, k)=>{
          return previousValue += k===0 ? ('【' + v + '】') :  ('，【' + v + '】') 
        }, '')
        content = {__html: '确认删除首页卡片：<span style="background-color:#ff0000; color:#ffffff;">' + tmp + '</span>吗？删除后将无法恢复！'}
        return Object.assign({}, state, {isVisible: true, content: content})
      } else {
        return Object.assign({}, state, {isVisible: false, content: ''})
      }
    default:
      return state
  }
}

/*
 * Devices
 */
function devices(state = [], action) {
  switch (action.type) {
    case SET_DEVICES:
      return action.devices
    default:
      return state
  }
}

/*
 * Scenes
 */
function scenes(state = [], action) {
  switch (action.type) {
    case SET_SCENES:
      return action.scenes
    default:
      return state
  }
}

/*
 * Table
 */
function selected(state = [], action) {
  switch (action.type) {
    case SELECT_ROW:
      return action.rows
    default:
      return state
  }
}

// combine
const indexReducer = combineReducers({
  createDialog,
  readDialog,
  updateDialog,
  deleteDialog,
  user,
  selected,
  devices,
  scenes
})

export default indexReducer