import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

// Needed for onTouchTap
injectTapEventPlugin();

// Needed for Theme
const Login = () => (
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Login />,
    document.getElementById('login')
  );
});

class Main extends Component {

  const

  render() {
    return (
      <Paper>
        <TextField
          id="name"
          hintText={str.placeholder.name}
        />
        <br />
        <TextField
          id="password"
          hintText={str.placeholder.password}
        />
      </Paper>
    );
  }

}