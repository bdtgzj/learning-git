import { connect } from 'react-redux'
import { validateName } from '../actions'
import Login from '../components/Login'

const mapStateToProps = (state) => {
  return {name: 'state.name'}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (name) => {
      dispatch(validateName(name))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer