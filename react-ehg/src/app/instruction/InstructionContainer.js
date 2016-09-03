// react-redux
import { connect } from 'react-redux'
// redux-json-api
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// component
import Instruction from './Instruction'
// actions
import { openAlertDialog } from '../layout/actions'
import { openCreateDialog, openReadDialog, openUpdateDialog, openDeleteDialog,  setUser, selectRow,
         validateNameCreate, validateNameUpdate, validateNameRead,
         validateInstructionCreate, validateInstructionUpdate,
         setCategoryIdCreate, setCategoryIdUpdate,
         setDeviceIdCreate, setDeviceIdUpdate, setDeviceIdRead,
         setSceneIdCreate, setSceneIdUpdate, setSceneIdRead,
         validateOrderCreate, validateOrderUpdate,
         getDeviceScene
       } from './actions'

var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

const mapStateToProps = (state) => {
  let instructions = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.instruction || {data:[]})
  return { users: state.cache.users,
           inscats: state.cache.inscats,
           devices: state.instruction.devices,
           scenes: state.instruction.scenes || [],
           instructions: instructions,
           instruction: state.instruction }
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
    // instruction
    handleInstructionChangeCreate: (instruction) => {
      dispatch(validateInstructionCreate(instruction))
    },
    handleInstructionChangeUpdate: (instruction) => {
      dispatch(validateInstructionUpdate(instruction))
    },
    // category
    handleCategoryChangeCreate: (id) => {
      dispatch(setCategoryIdCreate(id))
    },
    handleCategoryChangeUpdate: (id) => {
      dispatch(setCategoryIdUpdate(id))
    },
    // device
    handleDeviceChangeCreate: (id) => {
      dispatch(setDeviceIdCreate(id))
    },
    handleDeviceChangeUpdate: (id) => {
      dispatch(setDeviceIdUpdate(id))
    },
    handleDeviceChangeRead: (id) => {
      dispatch(setDeviceIdRead(id))
    },
    // scene
    handleSceneChangeCreate: (id) => {
      dispatch(setSceneIdCreate(id))
    },
    handleSceneChangeUpdate: (id) => {
      dispatch(setSceneIdUpdate(id))
    },
    handleSceneChangeRead: (id) => {
      dispatch(setSceneIdRead(id))
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
    handleCreate: (instruction) => {
      dispatch(createEntity({type: CONFIG.ENTITY.INSTRUCTION, attributes: instruction}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let instruction = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (instruction.id) {
          //dispatch(readEndpoint('instruction?uid=1'))
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
      const endpoint = CONFIG.ENTITY.INSTRUCTION + '?uid=' + selectedValue.id
      dispatch(readEndpoint(endpoint))
      // set user state
      dispatch(setUser(selectedValue))
      // set selected state
      dispatch(selectRow([]))
      // get devices & scenes
      dispatch(getDeviceScene('?uid=' + selectedValue.id))
    },
    handleReadByCondition: (condition) => {
      const endpoint = CONFIG.ENTITY.INSTRUCTION + '?' + condition
      dispatch(readEndpoint(endpoint))
      // set selected state
      dispatch(selectRow([]))
      // hide read dialog
      dispatch(openReadDialog(false))
    },
    handleRefresh: (uid) => {
      const endpoint = CONFIG.ENTITY.INSTRUCTION + '?uid=' + uid
      dispatch(selectRow([]))
      dispatch(readEndpoint(endpoint))
      // get devices & scenes
      dispatch(getDeviceScene('?uid=' + uid))
    },
    // Update
    handleUpdate: (id, instruction) => {
      dispatch(updateEntity({type: CONFIG.ENTITY.INSTRUCTION, id: id, attributes: instruction}))
      .then((json)=>{
        if (json.errors) {
          return dispatch(openAlertDialog(true, json.errors[0].detail))
        }
        let instruction = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(json)
        if (instruction.id) {
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
    handleDelete: (instructions) => {
      let promises = instructions.map((v)=>{
        return dispatch(deleteEntity({type: CONFIG.ENTITY.INSTRUCTION, id: v.id, attributes: v}))
      })
      Promise.all(promises)
      .then((instructions)=>{
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

const InstructionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Instruction)

export default InstructionContainer