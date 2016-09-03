// react-redux
import { connect } from 'react-redux'
// redux-json-api
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// component
import Device from './Device'
// actions
import { openAlertDialog } from '../layout/actions'
import { openCreateDialog, openReadDialog, openUpdateDialog, openDeleteDialog,  setUser, selectRow,
         validateNameCreate, validateOrderCreate, validateNameUpdate, validateOrderUpdate, validateNameRead,
         setIconIdCreate, setIconIdUpdate, setColorIdCreate, setColorIdUpdate,
         setRegionIdCreate, setRegionIdUpdate, setRegionIdRead, setCategoryIdCreate, setCategoryIdUpdate, setCategoryIdRead,
         getRegionCategory
       } from './actions'

var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

const mapStateToProps = (state) => {
  let devices = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.device || {data:[]})
  return { users: state.cache.users,
           icons: state.cache.icons,
           colors: state.cache.colors,
           regions: state.device.regions,
           categorys: state.device.categorys,
           devices: devices,
           device: state.device }
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
    // category
    handleCategoryChangeCreate: (id) => {
      dispatch(setCategoryIdCreate(id))
    },
    handleCategoryChangeUpdate: (id) => {
      dispatch(setCategoryIdUpdate(id))
    },
    handleCategoryChangeRead: (id) => {
      dispatch(setCategoryIdRead(id))
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
    handleCreate: (device) => {
      dispatch(createEntity({type: CONFIG.ENTITY.DEVICE, attributes: device}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let device = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (device.id) {
          //dispatch(readEndpoint('device?uid=1'))
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
      const endpoint = CONFIG.ENTITY.DEVICE + '?uid=' + selectedValue.id
      dispatch(readEndpoint(endpoint))
      // set user state
      dispatch(setUser(selectedValue))
      // set selected state
      dispatch(selectRow([]))
      // get regions & categorys
      dispatch(getRegionCategory('?uid=' + selectedValue.id))
    },
    handleReadByCondition: (condition) => {
      const endpoint = CONFIG.ENTITY.DEVICE + '?' + condition
      dispatch(readEndpoint(endpoint))
      // set selected state
      dispatch(selectRow([]))
      // hide read dialog
      dispatch(openReadDialog(false))
    },
    handleRefresh: (uid) => {
      const endpoint = CONFIG.ENTITY.DEVICE + '?uid=' + uid
      dispatch(selectRow([]))
      dispatch(readEndpoint(endpoint))
      // get regions & categorys
      dispatch(getRegionCategory('?uid=' + uid))
    },
    // Update
    handleUpdate: (id, device) => {
      dispatch(updateEntity({type: CONFIG.ENTITY.DEVICE, id: id, attributes: device}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let device = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (device.id) {
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
    handleDelete: (devices) => {
      let promises = devices.map((v)=>{
        return dispatch(deleteEntity({type: CONFIG.ENTITY.DEVICE, id: v.id, attributes: v}))
      })
      Promise.all(promises)
      .then((devices)=>{
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

const DeviceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Device)

export default DeviceContainer