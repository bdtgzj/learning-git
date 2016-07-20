import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from 'react-bootstrap';
import Logo from './component/Logo';

// Needed for onTouchTap
injectTapEventPlugin();

const strings = {
  login_placeholder_name: '用户名 / 邮箱 / 手机号码',
  login_placeholder_password: '密码',
  login_label_submit: '登录'
};

const styles = {
  paper: { padding: '2em' }
};

// Needed for Theme
const Login = () => (
  <MuiThemeProvider>
    <Main strings={strings} styles={styles} />
  </MuiThemeProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Login />,
    document.getElementById('login')
  );
});

class Main extends Component {

  render() {

    const { strings, styles } = this.props;

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
              />
              <br />
              <TextField
                id="password"
                hintText={strings.login_placeholder_password}
                fullWidth={true}
                type={'password'}
              />
              <br />
              <br />
              <RaisedButton
                id="submit"
                label={strings.login_label_submit}
                fullWidth={true}
                primary={true}
                type={'password'}
              />
            </Paper>
          </Col>
        </Row>
      </Grid>
      
    );
  }

}