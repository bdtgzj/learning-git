// react-redux
import { connect } from 'react-redux'
// redux-json-api
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// component
import Region from './Region'
// actions
import { openAlertDialog } from '../layout/actions'
import { openCreateDialog, openReadDialog, openUpdateDialog, openDeleteDialog, setUser, selectRow,
         validateNameCreate, validateOrderCreate, validateNameUpdate, validateOrderUpdate, validateNameRead
       } from './actions'

var JSONAPISerializer = require('../util/jsonapi-serializer-sync').Serializer
var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

const mapStateToProps = (state) => {
  let regions = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.region || {data:[]})
  return { users: state.cache.users, regions: regions, region: state.region }
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
    // Validate
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
    // Create
    handleCreate: (entity) => {
      dispatch(createEntity({type: CONFIG.ENTITY.REGION, attributes: entity}))
      .then((json)=>{
        if (json.data.type===CONFIG.ENTITY.ERROR) {
          return dispatch(openAlertDialog(true, json.data.attributes.detail))
        }
        let entity = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
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
    // Read
    handleRead: (selectedValue, selectedIndex) => {
      if (selectedIndex === -1) {
        dispatch(openAlertDialog(true, strings.user_select_prompt))
        return
      }
      // page[size]=2&page[number]=2&page[sort]=1&
      const endpoint = CONFIG.ENTITY.REGION + '?uid=' + selectedValue.id
      dispatch(readEndpoint(endpoint))
      // set user state
      dispatch(setUser(selectedValue))
      // set selected state
      dispatch(selectRow([]))
    },
    handleReadByCondition: (condition) => {
      const endpoint = CONFIG.ENTITY.REGION + '?' + condition
      dispatch(readEndpoint(endpoint))
      // set selected state
      dispatch(selectRow([]))
      // hide read dialog
      dispatch(openReadDialog(false))
    },
    handleRefresh: (uid) => {
      const endpoint = CONFIG.ENTITY.REGION + '?uid=' + uid
      dispatch(selectRow([]))
      dispatch(readEndpoint(endpoint))
    },
    // Update
    handleUpdate: (id, entity) => {
      dispatch(updateEntity({type: CONFIG.ENTITY.REGION, id: id, attributes: entity}))
      .then((json)=>{
        if (json.data.type===CONFIG.ENTITY.ERROR) {
          return dispatch(openAlertDialog(true, json.data.attributes.detail))
        }
        let entity = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
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
    // Delete
    handleDelete: (regions) => {
      let promises = regions.map((v)=>{
        return dispatch(deleteEntity({type: CONFIG.ENTITY.REGION, id: v.id, attributes: v}))
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