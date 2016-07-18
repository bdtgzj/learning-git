import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './main';

// Needed for onTouchTap
injectTapEventPlugin();

// Needed for Theme
const App = () => (
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});