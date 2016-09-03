// react-redux
import { connect } from 'react-redux'
// redux-json-api
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// component
import Family from './Family'
// actions
import { openAlertDialog } from '../layout/actions'
import { openCreateDialog, openReadDialog, openUpdateDialog, openDeleteDialog, selectRow,
         validateNameCreate, validateNameUpdate, validateNameRead,
         validateFidCreate, validateFidUpdate, validateFidRead,
         validateAddressCreate, validateAddressUpdate, validateAddressRead,
       } from './actions'

var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

const mapStateToProps = (state) => {
  let familys = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.family || {data:[]})
  return { familys: familys, family: state.family }
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
    // fid
    handleFidChangeCreate: (fid) => {
      dispatch(validateFidCreate(fid))
    },
    handleFidChangeUpdate: (fid) => {
      dispatch(validateFidUpdate(fid))
    },
    handleFidChangeRead: (fid) => {
      dispatch(validateFidRead(fid))
    },
    // address
    handleAddressChangeCreate: (address) => {
      dispatch(validateAddressCreate(address))
    },
    handleAddressChangeUpdate: (address) => {
      dispatch(validateAddressUpdate(address))
    },
    handleAddressChangeRead: (address) => {
      dispatch(validateAddressRead(address))
    },
    // Table
    handleSelectRow: (rows) => {
      return dispatch(selectRow(rows))
    },
    // Restful API
    // Create
    handleCreate: (family) => {
      dispatch(createEntity({type: CONFIG.ENTITY.FAMILY, attributes: family}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let family = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (family.id) {
          //dispatch(readEndpoint('family?uid=1'))
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
      const endpoint = CONFIG.ENTITY.FAMILY + '?' + condition
      dispatch(readEndpoint(endpoint))
      // set selected state
      dispatch(selectRow([]))
      // hide read dialog
      dispatch(openReadDialog(false))
    },
    handleRefresh: () => {
      const endpoint = CONFIG.ENTITY.FAMILY
      dispatch(selectRow([]))
      dispatch(readEndpoint(endpoint))
    },
    // Update
    handleUpdate: (id, family) => {
      dispatch(updateEntity({type: CONFIG.ENTITY.FAMILY, id: id, attributes: family}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let family = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (family.id) {
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
    handleDelete: (familys) => {
      let promises = familys.map((v)=>{
        return dispatch(deleteEntity({type: CONFIG.ENTITY.FAMILY, id: v.id, attributes: v}))
      })
      Promise.all(promises)
      .then((familys)=>{
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

const FamilyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Family)

export default FamilyContainer