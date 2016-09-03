// react-redux
import { connect } from 'react-redux'
// redux-json-api
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// component
import Homecard from './Homecard'
// actions
import { openAlertDialog } from '../layout/actions'
import { openCreateDialog, openReadDialog, openUpdateDialog, openDeleteDialog,  setUser, selectRow,
         validateNameCreate, validateOrderCreate, validateNameUpdate, validateOrderUpdate, validateNameRead,
         setIconIdCreate, setIconIdUpdate, setColorIdCreate, setColorIdUpdate,
         setDeviceIdCreate, setDeviceIdUpdate, setSceneIdCreate, setSceneIdUpdate,
         getDeviceScene
       } from './actions'

var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

const mapStateToProps = (state) => {
  let homecards = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.homecard || {data:[]})
  return { users: state.cache.users,
           icons: state.cache.icons,
           colors: state.cache.colors,
           devices: state.homecard.devices,
           scenes: state.homecard.scenes,
           homecards: homecards,
           homecard: state.homecard }
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
    // device
    handleDeviceChangeCreate: (id) => {
      dispatch(setDeviceIdCreate(id))
    },
    handleDeviceChangeUpdate: (id) => {
      dispatch(setDeviceIdUpdate(id))
    },
    // scene
    handleSceneChangeCreate: (id) => {
      dispatch(setSceneIdCreate(id))
    },
    handleSceneChangeUpdate: (id) => {
      dispatch(setSceneIdUpdate(id))
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
    handleCreate: (homecard) => {
      dispatch(createEntity({type: CONFIG.ENTITY.HOMECARD, attributes: homecard}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let homecard = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (homecard.id) {
          //dispatch(readEndpoint('homecard?uid=1'))
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
      const endpoint = CONFIG.ENTITY.HOMECARD + '?uid=' + selectedValue.id
      dispatch(readEndpoint(endpoint))
      // set user state
      dispatch(setUser(selectedValue))
      // set selected state
      dispatch(selectRow([]))
      // get devices & scenes
      dispatch(getDeviceScene('?uid=' + selectedValue.id))
    },
    handleReadByCondition: (condition) => {
      const endpoint = CONFIG.ENTITY.HOMECARD + '?' + condition
      dispatch(readEndpoint(endpoint))
      // set selected state
      dispatch(selectRow([]))
      // hide read dialog
      dispatch(openReadDialog(false))
    },
    handleRefresh: (uid) => {
      const endpoint = CONFIG.ENTITY.HOMECARD + '?uid=' + uid
      dispatch(selectRow([]))
      dispatch(readEndpoint(endpoint))
      // get devices & scenes
      dispatch(getDeviceScene('?uid=' + uid))
    },
    // Update
    handleUpdate: (id, homecard) => {
      dispatch(updateEntity({type: CONFIG.ENTITY.HOMECARD, id: id, attributes: homecard}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let homecard = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (homecard.id) {
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
    handleDelete: (homecards) => {
      let promises = homecards.map((v)=>{
        return dispatch(deleteEntity({type: CONFIG.ENTITY.HOMECARD, id: v.id, attributes: v}))
      })
      Promise.all(promises)
      .then((homecards)=>{
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

const HomecardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Homecard)

export default HomecardContainer