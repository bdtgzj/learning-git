import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './admin/configureStore'
import { Provider } from 'react-redux'

import Login from './admin'
import Home from './home'
import LoginContainer from './admin/containers/LoginContainer'

// Needed for onTouchTap
injectTapEventPlugin()

// inject store
const store = configureStore();

// 
const NoMatch = () => (<div>This is a stub.</div>)

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" component={LoginContainer} />
        <Route path="/home" component={Home} />
        <Route path="*" component={NoMatch} />
      </Router>
    </MuiThemeProvider>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});