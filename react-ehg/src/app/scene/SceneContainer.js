// react-redux
import { connect } from 'react-redux'
// redux-json-api
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// component
import Scene from './Scene'
// actions
import { openAlertDialog } from '../layout/actions'
import { openCreateDialog, openReadDialog, openUpdateDialog, openDeleteDialog,  setUser, selectRow,
         validateNameCreate, validateOrderCreate, validateNameUpdate, validateOrderUpdate, validateNameRead,
         setIconIdCreate, setIconIdUpdate, setColorIdCreate, setColorIdUpdate,
         setRegionIdCreate, setRegionIdUpdate, setRegionIdRead,
         getRegion
       } from './actions'

var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

const mapStateToProps = (state) => {
  let scenes = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.scene || {data:[]})
  return { users: state.cache.users,
           icons: state.cache.icons,
           colors: state.cache.colors,
           regions: state.scene.regions,
           scenes: scenes,
           scene: state.scene }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // Dialog
    handleOpenCreateDialog: (open) => {
      dispatch(openCreateDialog(open))
    },
    handleOpenReadDialog: (open) => {
      dispatch(openReadDialog(open))
    },
    handleOpenUpdateDialog: (open, selectedRow) => {
      dispatch(openUpdateDialog(open, selectedRow))
    },
    handleOpenDeleteDialog: (open, selectedRow) => {
      dispatch(openDeleteDialog(open, selectedRow))
    },
    // name
    handleNameChangeCreate: (name) => {
      dispatch(validateNameCreate(name))
    },
    handleNameChangeUpdate: (name) => {
      dispatch(validateNameUpdate(name))
    },
    handleNameChangeRead: (name) => {
      dispatch(validateNameRead(name))
    },
    // icon
    handleIconChangeCreate: (id) => {
      dispatch(setIconIdCreate(id))
    },
    handleIconChangeUpdate: (id) => {
      dispatch(setIconIdUpdate(id))
    },
    // color
    handleColorChangeCreate: (id) => {
      dispatch(setColorIdCreate(id))
    },
    handleColorChangeUpdate: (id) => {
      dispatch(setColorIdUpdate(id))
    },
    // region
    handleRegionChangeCreate: (id) => {
      dispatch(setRegionIdCreate(id))
    },
    handleRegionChangeUpdate: (id) => {
      dispatch(setRegionIdUpdate(id))
    },
    handleRegionChangeRead: (id) => {
      dispatch(setRegionIdRead(id))
    },
    //order
    handleOrderChangeCreate: (order) => {
      dispatch(validateOrderCreate(order))
    },
    handleOrderChangeUpdate: (order) => {
      dispatch(validateOrderUpdate(order))
    },
    // Table
    handleSelectRow: (rows) => {
      return dispatch(selectRow(rows))
    },
    // Restful API
    // Create
    handleCreate: (scene) => {
      dispatch(createEntity({type: CONFIG.ENTITY.SCENE, attributes: scene}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let scene = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (scene.id) {
          //dispatch(readEndpoint('scene?uid=1'))
          dispatch(openAlertDialog(true, strings.action_create_ok_prompt))
          // set selected
          dispatch(selectRow([0]))
        } else {
          dispatch(openAlertDialog(true, strings.action_error_system_prompt))
        }
      })
      .catch((err)=>{
        dispatch(openAlertDialog(true, strings.action_error_network_prompt))
      })
    },
    // Read
    handleRead: (selectedValue, selectedIndex) => {
      if (selectedIndex === -1) {
        dispatch(openAlertDialog(true, strings.user_select_prompt))
        return
      }
      // page[size]=2&page[number]=2&page[sort]=1&
      const endpoint = CONFIG.ENTITY.SCENE + '?uid=' + selectedValue.id
      dispatch(readEndpoint(endpoint))
      // set user state
      dispatch(setUser(selectedValue))
      // set selected state
      dispatch(selectRow([]))
      // get regions
      dispatch(getRegion('?uid=' + selectedValue.id))
    },
    handleReadByCondition: (condition) => {
      const endpoint = CONFIG.ENTITY.SCENE + '?' + condition
      dispatch(readEndpoint(endpoint))
      // set selected state
      dispatch(selectRow([]))
      // hide read dialog
      dispatch(openReadDialog(false))
    },
    handleRefresh: (uid) => {
      const endpoint = CONFIG.ENTITY.SCENE + '?uid=' + uid
      dispatch(selectRow([]))
      dispatch(readEndpoint(endpoint))
      // get regions
      dispatch(getRegion('?uid=' + uid))
    },
    // Update
    handleUpdate: (id, scene) => {
      dispatch(updateEntity({type: CONFIG.ENTITY.SCENE, id: id, attributes: scene}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let scene = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (scene.id) {
          dispatch(selectRow([0]))
          dispatch(openUpdateDialog(false))
          dispatch(openAlertDialog(true, strings.action_update_ok_prompt))
        } else {
          dispatch(openAlertDialog(true, strings.action_error_system_prompt))
        }
      })
      .catch((err)=>{
        dispatch(openAlertDialog(true, strings.action_error_network_prompt))
      })
    },
    // Delete
    handleDelete: (scenes) => {
      let promises = scenes.map((v)=>{
        return dispatch(deleteEntity({type: CONFIG.ENTITY.SCENE, id: v.id, attributes: v}))
      })
      Promise.all(promises)
      .then((scenes)=>{
        dispatch(selectRow([]))
        dispatch(openDeleteDialog(false))
        dispatch(openAlertDialog(true, strings.action_delete_ok_prompt))
      })
      .catch((err)=>{
        dispatch(selectRow([]))
        dispatch(openDeleteDialog(false))
        dispatch(openAlertDialog(true, strings.action_error_network_prompt))
      })
    }
  }
}

const SceneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scene)

export default SceneContainer