// react-redux
import { connect } from 'react-redux'
// redux-json-api
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// component
import Log from './Log'
// actions
import { openAlertDialog } from '../layout/actions'
import { openReadDialog, openDeleteDialog,  setUser, selectRow,
         validateCategoryRead, validateLogRead
       } from './actions'

var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

const mapStateToProps = (state) => {
  let logs = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.log || {data:[]})
  return { users: state.cache.users, logs: logs, log: state.log }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // Dialog
    handleOpenReadDialog: (open) => {
      dispatch(openReadDialog(open))
    },
    handleOpenDeleteDialog: (open, selectedRow) => {
      dispatch(openDeleteDialog(open, selectedRow))
    },
    // Validate
    handleCategoryChangeRead: (category) => {
      dispatch(validateCategoryRead(category))
    },
    handleLogChangeRead: (log) => {
      dispatch(validateLogRead(log))
    },
    // Table
    handleSelectRow: (rows) => {
      return dispatch(selectRow(rows))
    },
    // Restful API
    // Read
    handleRead: (selectedValue, selectedIndex) => {
      if (selectedIndex === -1) {
        dispatch(openAlertDialog(true, strings.user_select_prompt))
        return
      }
      // page[size]=2&page[number]=2&page[sort]=1&
      const endpoint = CONFIG.ENTITY.LOG + '?uid=' + selectedValue.id
      dispatch(readEndpoint(endpoint))
      // set user state
      dispatch(setUser(selectedValue))
      // set selected state
      dispatch(selectRow([]))
    },
    handleReadByCondition: (condition) => {
      const endpoint = CONFIG.ENTITY.LOG + '?' + condition
      dispatch(readEndpoint(endpoint))
      // set selected state
      dispatch(selectRow([]))
      // hide read dialog
      dispatch(openReadDialog(false))
    },
    handleRefresh: (uid) => {
      const endpoint = CONFIG.ENTITY.LOG + '?uid=' + uid
      dispatch(selectRow([]))
      dispatch(readEndpoint(endpoint))
    },
    // Delete
    handleDelete: (logs) => {
      let promises = logs.map((v)=>{
        return dispatch(deleteEntity({type: CONFIG.ENTITY.LOG, id: v.id, attributes: v}))
      })
      Promise.all(promises)
      .then((logs)=>{
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

const LogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Log)

export default LogContainer