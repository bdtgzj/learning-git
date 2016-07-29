import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './configureStore'
import { Provider } from 'react-redux'
import LoginContainer from './admin/containers/LoginContainer'
import router from './router'
import { persistStore, getStoredState } from 'redux-persist'

// Needed for onTouchTap of material-ui
injectTapEventPlugin()

// get & inject store, set middleware, persist store
// let store = configureStore()
// persistStore(store)

const persistConfig = {}

document.addEventListener('DOMContentLoaded', () => {
  // get state from localStorage
  // why can't use promise?
  getStoredState(persistConfig, (err, restoredState) => {
    if (err) {
      console.log(err)
      return
    }
    // get & inject store, set middleware, persist store 
    const store = configureStore(restoredState)
    persistStore(store)

    // get routes
    const routes = router(store.getState)

    // React Component
    const App = () => (
      <Provider store={store}>
        <MuiThemeProvider>
          <Router history={browserHistory}>
            <Route path="/login" component={LoginContainer} />
            {routes}
          </Router>
        </MuiThemeProvider>
      </Provider>
    )

    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
  })

});


