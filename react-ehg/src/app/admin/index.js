import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import LoginContainer from './containers/LoginContainer'
import configureStore from './configureStore'
import { Provider } from 'react-redux'

// Needed for onTouchTap
injectTapEventPlugin()

// inject store
const store = configureStore();

// Needed for Theme
const Index = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <LoginContainer />
    </Provider>
  </MuiThemeProvider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index />,
    document.getElementById('login')
  )
})