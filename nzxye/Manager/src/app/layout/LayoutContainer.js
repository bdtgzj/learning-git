import { connect } from 'react-redux'
import Layout from './Layout'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
// action
import { openAlertDialog } from './actions'
import { createEntity, readEndpoint, updateEntity, deleteEntity } from 'redux-json-api'
import { setCacheUsers, setCacheIcons, setCacheColors, refreshCache } from '../cache/actions'

var JSONAPIDeserializer = require('../util/jsonapi-serializer-sync').Deserializer

const mapStateToProps = (state) => {
  let users = new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(state.api.user || {data:[]})
  return {layout: state.layout, users: users}
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRefresh: () => {
      dispatch(refreshCache())
    },
    handleOpenAlertDialog: (open, content) => {
      dispatch(openAlertDialog(open, content))
    }
  }
}

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default LayoutContainer