import { connect } from 'react-redux'
import { validateName, validatePassword, login, dialogOk } from '../actions'
import Login from '../components/Login'

const mapStateToProps = (state) => {
  return state.login
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
    },
    onDialogOk: () => {
      dispatch(dialogOk())
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer