import { connect } from 'react-redux'
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
import Region from '../components/Region'
import {deserializer} from '../../util/jsonapi'

const mapStateToProps = (state) => {
  let users = deserializer(state.api.user)
  let regions = deserializer(state.api.region)
  return { users: users, regions: regions }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreate: (region) => {
      dispatch(createEntity(region))
    },
    handleRead: (userID) => {
      // page[size]=2&page[number]=2&page[sort]=1&
      const endpoint = 'region?uid=' + userID
      dispatch(readEndpoint(endpoint))
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