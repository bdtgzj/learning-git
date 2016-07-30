import React from 'react'

const Index = () => (<div>This is a home stub.</div>)

export default Index
/*
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './configureStore'
import { Provider } from 'react-redux'
import LoginContainer from './containers/LoginContainer'

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

export default Index


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index />,
    document.getElementById('login')
  )
})
*/