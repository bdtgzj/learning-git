import { connect } from 'react-redux'
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
import Region from '../components/Region'
import {deserializer} from '../../util/jsonapi'
import strings from '../../res/strings'
import { openCreateDialog, openReadDialog, openUpdateDialog, openDeleteDialog, openAlertDialog,  setUser, selectRow,
         validateNameCreate, validateOrderCreate, validateNameUpdate, validateOrderUpdate, validateNameRead
       } from '../actions'

var JSONAPISerializer = require('../../util/jsonapi-serializer-sync').Serializer;
var JSONAPIDeserializer = require('../../util/jsonapi-serializer-sync').Deserializer;
const JSONAPI_DESERIALIZER_CONFIG = {keyForAttribute: 'camelCase'};

const mapStateToProps = (state) => {
  let users = new JSONAPIDeserializer(JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.user)
  let regions = new JSONAPIDeserializer(JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.region)
  return { users: users, regions: regions, region: state.region }
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
    handleOpenAlertDialog: (open, content) => {
      dispatch(openAlertDialog(open, content))
    },
    handleNameChangeCreate: (name) => {
      dispatch(validateNameCreate(name))
    },
    handleOrderChangeCreate: (order) => {
      dispatch(validateOrderCreate(order))
    },
    handleNameChangeUpdate: (name) => {
      dispatch(validateNameUpdate(name))
    },
    handleOrderChangeUpdate: (order) => {
      dispatch(validateOrderUpdate(order))
    },
    handleNameChangeRead: (name) => {
      dispatch(validateNameRead(name))
    },
    // Table
    handleSelectRow: (rows) => {
      return dispatch(selectRow(rows))
    },
    // Restful API
    handleCreate: (entity) => {
      dispatch(createEntity({type: 'region', attributes: entity}))
      .then((json)=>{
        if (json.data.type==='error') {
          return dispatch(openAlertDialog(true, json.data.attributes.detail))
        }
        let entity = new JSONAPIDeserializer(JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (entity.id) {
          //dispatch(readEndpoint('region?uid=1'))
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
    handleRead: (selectedValue, selectedIndex) => {
      if (selectedIndex === -1) {
        dispatch(openAlertDialog(true, strings.user_select_prompt))
        return
      }
      // page[size]=2&page[number]=2&page[sort]=1&
      const endpoint = 'region?uid=' + selectedValue.id
      dispatch(readEndpoint(endpoint))
      // set user state
      dispatch(setUser(selectedValue))
      // set selected state
      dispatch(selectRow([]))
    },
    handleReadByCondition: (condition) => {
      const endpoint = 'region?' + condition
      dispatch(readEndpoint(endpoint))
      // set selected state
      dispatch(selectRow([]))
      // hide read dialog
      dispatch(openReadDialog(false))
    },
    handleRefresh: (uid) => {
      const endpoint = 'region?uid=' + uid
      dispatch(selectRow([]))
      dispatch(readEndpoint(endpoint))
    },
    handleUpdate: (id, entity) => {
      dispatch(updateEntity({type: 'region', id: id, attributes: entity}))
      .then((json)=>{
        if (json.data.type==='error') {
          return dispatch(openAlertDialog(true, json.data.attributes.detail))
        }
        let entity = new JSONAPIDeserializer(JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (entity.id) {
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
    handleDelete: (regions) => {
      let promises = regions.map((v)=>{
        return dispatch(deleteEntity({type: 'region', id: v.id, attributes: v}))
      })
      Promise.all(promises)
      .then((entitys)=>{
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

const RegionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Region)

export default RegionContainer