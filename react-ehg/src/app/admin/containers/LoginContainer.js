import { connect } from 'react-redux'
import { validateName, validatePassword, login } from '../actions'
import Login from '../components/Login'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (name) => {
      dispatch(validateName(name))
    },
    onPasswordChange: (password) => {
      dispatch(validatePassword(password))
    },
    onLogin: (admin) => {
      dispatch(login(admin))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer