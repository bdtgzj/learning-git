// react-redux
import { connect } from 'react-redux'
// redux-json-api
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// component
import Icon from './Icon'
// actions
import { openAlertDialog } from '../layout/actions'
import { openCreateDialog, openReadDialog, openUpdateDialog, openDeleteDialog, selectRow,
         validateNameCreate, validateNameUpdate, validateNameRead,
         validateIconCreate, validateIconUpdate,
         validateOrderCreate, validateOrderUpdate,
       } from './actions'

var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

const mapStateToProps = (state) => {
  let icons = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.icon || {data:[]})
  return { icons: icons, icon: state.icon }
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
    handleIconChangeCreate: (icon) => {
      dispatch(validateIconCreate(icon))
    },
    handleIconChangeUpdate: (icon) => {
      dispatch(validateIconUpdate(icon))
    },
    // order
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
    handleCreate: (icon) => {
      dispatch(createEntity({type: CONFIG.ENTITY.ICON, attributes: icon}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let icon = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (icon.id) {
          //dispatch(readEndpoint('icon?uid=1'))
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
    handleReadByCondition: (condition) => {
      const endpoint = CONFIG.ENTITY.ICON + '?' + condition
      dispatch(readEndpoint(endpoint))
      // set selected state
      dispatch(selectRow([]))
      // hide read dialog
      dispatch(openReadDialog(false))
    },
    handleRefresh: () => {
      const endpoint = CONFIG.ENTITY.ICON
      dispatch(selectRow([]))
      dispatch(readEndpoint(endpoint))
    },
    // Update
    handleUpdate: (id, icon) => {
      dispatch(updateEntity({type: CONFIG.ENTITY.ICON, id: id, attributes: icon}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let icon = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (icon.id) {
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
    handleDelete: (icons) => {
      let promises = icons.map((v)=>{
        return dispatch(deleteEntity({type: CONFIG.ENTITY.ICON, id: v.id, attributes: v}))
      })
      Promise.all(promises)
      .then((icons)=>{
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

const IconContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Icon)

export default IconContainer