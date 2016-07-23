import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from 'react-bootstrap';
import Logo from '../../components/Logo';

const strings = {
  login_placeholder_name: '用户名 / 邮箱 / 手机号码',
  login_placeholder_password: '密码',
  login_label_submit: '登录'
};

const styles = {
  paper: { padding: '2em' }
};

class Login extends Component {

  render() {

    const { name, onChange } = this.props;

    let textFieldName;

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
                errorText={name && name.error}
                onChange={() => onChange(textFieldName.value)}
                ref={(node) => textFieldName=node}
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

export default Login