import { connect } from 'react-redux'
import { validateName, validatePassword, login, dialogOk } from '../actions'
import Region from '../components/Region'

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
    onRegion: (admin) => {
      dispatch(login(admin))
    },
    onDialogOk: () => {
      dispatch(dialogOk())
    }
  }
}

const RegionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Region)

export default RegionContainer