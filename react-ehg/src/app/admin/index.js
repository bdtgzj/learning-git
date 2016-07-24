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
  <Provider store={store}>
    <MuiThemeProvider>
      <LoginContainer />
    </MuiThemeProvider>
  </Provider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index />,
    document.getElementById('login')
  )
})