import { connect } from 'react-redux'
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
import Region from '../components/Region'
import {deserializer} from '../../util/jsonapi'
import strings from '../../res/strings'
import { openAlertDialog, openCreateDialog, openUpdateDialog, openReadDialog, setUser, selectRow,
         validateNameCreate, validateOrderCreate, validateNameUpdate, validateOrderUpdate
       } from '../actions'

var JSONAPISerializer = require('../../util/jsonapi-serializer-sync').Serializer;
var JSONAPIDeserializer = require('../../util/jsonapi-serializer-sync').Deserializer;
const JSONAPI_DESERIALIZER_CONFIG = {keyForAttribute: 'camelCase'};

const mapStateToProps = (state) => {
  let users = deserializer(state.api.user)
  let regions = deserializer(state.api.region)
  return { users: users, regions: regions, region: state.region }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // Dialog
    handleOpenAlertDialog: (open, content) => {
      dispatch(openAlertDialog(open, content))
    },
    handleOpenCreateDialog: (open) => {
      dispatch(openCreateDialog(open))
    },
    handleOpenUpdateDialog: (open, selectedRow) => {
      dispatch(openUpdateDialog(open, selectedRow))
    },
    handleOpenReadDialog: (open) => {
      dispatch(openReadDialog(open))
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
    },
    handleUpdate: (id, entity) => {
      dispatch(updateEntity({type: 'region', id: id, attributes: entity}))
      .then((json)=>{
        if (json.data.type==='error') {
          return dispatch(openAlertDialog(true, json.data.attributes.detail))
        }
        let entity = new JSONAPIDeserializer(JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (entity.id) {
          //dispatch(readEndpoint('region?uid=1'))
          dispatch(openAlertDialog(true, strings.action_create_ok_prompt))
        } else {
          dispatch(openAlertDialog(true, strings.action_error_system_prompt))
        }
      })
      .catch((err)=>{
        dispatch(openAlertDialog(true, strings.action_error_network_prompt))
      })
    },
    handleDelete: (region) => {
      dispatch(deleteEntity(region))
    }
  }
}

const RegionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Region)

export default RegionContainer