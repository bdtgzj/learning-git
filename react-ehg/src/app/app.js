import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './admin/configureStore'
import { Provider } from 'react-redux'
import LoginContainer from './admin/containers/LoginContainer'
import router from './router'

// Needed for onTouchTap of material-ui
injectTapEventPlugin()

// get & inject store, set middleware
const store = configureStore();

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/login" component={LoginContainer} />
        {router}
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