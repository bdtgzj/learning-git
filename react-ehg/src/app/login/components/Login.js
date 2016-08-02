import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Grid, Row, Col} from 'react-bootstrap'
import Logo from '../../components/Logo'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

const strings = {
  login_placeholder_name: '用户名 / 邮箱 / 手机号码',
  login_placeholder_password: '密码',
  login_label_submit: '登录',
  login_dialog_ok: '确定'
}

const styles = {
  paper: { padding: '2em' },
  circularProgress: { display: 'none' },
  dialogContent: { width: '50%' }
}

class Login extends Component {

  render() {

    const { name, password, login, onNameChange, onPasswordChange, onLogin, onDialogOk } = this.props

    const actions = [<FlatButton label={strings.login_dialog_ok} primary={true} onTouchTap={onDialogOk} />]

    return (
      <Grid>
        <Row><Logo /></Row>
        <Row>
          <Col md={4} mdOffset={4} xs={6} xsOffset={3}>
            <Paper style={styles.paper}>
              <TextField
                id="name"
                hintText={strings.login_placeholder_name}
                fullWidth={true}
                errorText={!name.valid && name.error}
                onChange={() => onNameChange(this.textFieldName.input.value)}
                // onBlur={}
                ref={(node) => this.textFieldName=node}
              />
              <br />
              <TextField
                id="password"
                hintText={strings.login_placeholder_password}
                fullWidth={true}
                type={'password'}
                errorText={!password.valid && password.error}
                onChange={() => onPasswordChange(this.textFieldPassword.input.value)}
                ref={(node) => this.textFieldPassword=node}
              />
              <br />
              <br />
              <RaisedButton
                id="submit"
                label={strings.login_label_submit}
                fullWidth={true}
                primary={true}
                type={'password'}
                disabled={!name.valid || !password.valid}
                onClick={() => onLogin({name: name.value, password: this.textFieldPassword.input.value})}
              />
              <Dialog
                actions={actions}
                modal={true}
                contentStyle={styles.dialogContent}
                open={login.logining}
              >
                <CircularProgress
                  style={(login.admin || login.e) && styles.circularProgress}
                />
                <div>{login.admin || login.e}</div>
              </Dialog>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default Login