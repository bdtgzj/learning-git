import { connect } from 'react-redux'
import { signOut } from './actions'
import Layout from './Layout'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignOut: () => {
      dispatch(signOut())
    }
  }
}

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default LayoutContainer