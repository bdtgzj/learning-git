import { connect } from 'react-redux'
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
import Region from '../components/Region'
import {deserializer} from '../../util/jsonapi'
import strings from '../../res/strings'
import { openAlertDialog, openCreateDialog, openUpdateDialog, openReadDialog, setUser, selectRow,
         validateName, validateOrder
       } from '../actions'


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
    handleOpenUpdateDialog: (open) => {
      dispatch(openUpdateDialog(open))
    },
    handleOpenReadDialog: (open) => {
      dispatch(openReadDialog(open))
    },
    handleNameChange: (name) => {
      dispatch(validateName(name))
    },
    handleOrderChange: (order) => {
      dispatch(validateOrder(order))
    },
    // Table
    handleSelectRow: (rows) => {
      return dispatch(selectRow(rows))
    },
    // Restful API
    handleCreate: (region) => {
      dispatch(createEntity({type: 'region', attributes: region}))
      .then((json)=>{
        dispatch(openAlertDialog(true, strings.action_create_ok_prompt))
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
    handleUpdate: (region) => {
      dispatch(updateEntity(region))
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