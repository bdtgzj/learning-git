import { connect } from 'react-redux'
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
import Region from '../components/Region'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreate: (region) => {
      dispatch(createEntity(region))
    },
    handleRead: (endpoint) => {
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