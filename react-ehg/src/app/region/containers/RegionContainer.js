import { connect } from 'react-redux'
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
import Region from '../components/Region'
import {deserializer} from '../../util/jsonapi'
import { openAlertDialog, openCreateDialog, openUpdateDialog, openReadDialog, setUser, selectRow } from '../actions'

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
    // Table
    handleSelectRow: (rows) => {
      return dispatch(selectRow(rows))
    },
    // Restful API
    handleCreate: (region) => {
      dispatch(createEntity(region))
    },
    handleRead: (selectedValue, selectedIndex) => {
      if (selectedIndex === -1) {
        dispatch(openAlertDialog(true, '请在下拉列表中选择用户!'))
        return
      }
      // page[size]=2&page[number]=2&page[sort]=1&
      const endpoint = 'region?uid=' + selectedValue.id
      dispatch(readEndpoint(endpoint))
      //
      dispatch(setUser(selectedValue.id))
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