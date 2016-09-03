// react-redux
import { connect } from 'react-redux'
// redux-json-api
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// component
import User from './User'
// actions
import { openAlertDialog } from '../layout/actions'
import { openCreateDialog, openReadDialog, openUpdateDialog, openDeleteDialog, selectRow,
         validateNameCreate, validateNameUpdate, validateNameRead,
         validateNickNameCreate, validateNickNameUpdate, validateNickNameRead,
         validateEmailCreate, validateEmailUpdate, validateEmailRead,
         validateMphoneCreate, validateMphoneUpdate, validateMphoneRead,
         setStateCreate, setStateUpdate, setStateRead,
         setFamilyIdCreate, setFamilyIdUpdate, setFamilyIdRead,
       } from './actions'

var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

const mapStateToProps = (state) => {
  let users = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.user || {data:[]})
  return { users: users, user: state.user, familys: state.cache.familys }
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
    // nickName
    handleNickNameChangeCreate: (nickName) => {
      dispatch(validateNickNameCreate(nickName))
    },
    handleNickNameChangeUpdate: (nickName) => {
      dispatch(validateNickNameUpdate(nickName))
    },
    handleNickNameChangeRead: (nickName) => {
      dispatch(validateNickNameRead(nickName))
    },
    // email
    handleEmailChangeCreate: (email) => {
      dispatch(validateEmailCreate(email))
    },
    handleEmailChangeUpdate: (email) => {
      dispatch(validateEmailUpdate(email))
    },
    handleEmailChangeRead: (email) => {
      dispatch(validateEmailRead(email))
    },
    // mphone
    handleMphoneChangeCreate: (mphone) => {
      dispatch(validateMphoneCreate(mphone))
    },
    handleMphoneChangeUpdate: (mphone) => {
      dispatch(validateMphoneUpdate(mphone))
    },
    handleMphoneChangeRead: (mphone) => {
      dispatch(validateMphoneRead(mphone))
    },
    // state
    handleStateChangeCreate: (state) => {
      dispatch(setStateCreate(state))
    },
    handleStateChangeUpdate: (state) => {
      dispatch(setStateUpdate(state))
    },
    handleStateChangeRead: (state) => {
      dispatch(setStateRead(state))
    },
    // family
    handleFamilyChangeCreate: (family) => {
      dispatch(setFamilyIdCreate(family))
    },
    handleFamilyChangeUpdate: (family) => {
      dispatch(setFamilyIdUpdate(family))
    },
    handleFamilyChangeRead: (family) => {
      dispatch(setFamilyIdRead(family))
    },
    // Table
    handleSelectRow: (rows) => {
      return dispatch(selectRow(rows))
    },
    // Restful API
    // Create
    handleCreate: (user) => {
      dispatch(createEntity({type: CONFIG.ENTITY.USER, attributes: user}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let user = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (user.id) {
          //dispatch(readEndpoint('user?uid=1'))
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
      const endpoint = CONFIG.ENTITY.USER + '?' + condition
      dispatch(readEndpoint(endpoint))
      .then((json) => {
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
      })
      .catch((err) => {
        dispatch(openAlertDialog(true, strings.action_error_network_prompt))
      })
      // set selected state
      dispatch(selectRow([]))
      // hide read dialog
      dispatch(openReadDialog(false))
    },
    handleRefresh: () => {
      const endpoint = CONFIG.ENTITY.USER
      dispatch(selectRow([]))
      dispatch(readEndpoint(endpoint))
    },
    // Update
    handleUpdate: (id, user) => {
      dispatch(updateEntity({type: CONFIG.ENTITY.USER, id: id, attributes: user}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let user = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (user.id) {
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
    handleDelete: (users) => {
      let promises = users.map((v)=>{
        return dispatch(deleteEntity({type: CONFIG.ENTITY.USER, id: v.id, attributes: v}))
      })
      Promise.all(promises)
      .then((users)=>{
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

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default UserContainer