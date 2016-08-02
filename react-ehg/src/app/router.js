import React from 'react'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import LayoutContainer from './layout/LayoutContainer'
import LoginContainer from './login/containers/LoginContainer'
import RegionContainer from './region/containers/RegionContainer'
import Home from './home'

// 


// 
const NoMatch = () => (<div>This is a NoMatch stub.</div>)

function router(getState, persistor) {

  function auth(nextState, replace) {
    if (!getState().login.login.isLogined) {
      //replaceState({nextPathname: nextState.location.pathname}, '/login')
      //replace({ nextPathname: nextState.location.pathname }, '/login', nextState.location.query)
      replace('/login')
    }
  }

  function signout() {
    persistor.purgeAll()
    browserHistory.replace('/login')
    window.location.reload()
  }

  return (
    <Router history={browserHistory}>
      <Route path="/login" component={LoginContainer} />
      <Route path="/" component={LayoutContainer} onEnter={auth}>
        <IndexRoute component={Home} onEnter={auth} />
        <Route path="region" component={RegionContainer} />
        <Route path="signout" onEnter={signout} />
        <Route path="*" component={NoMatch} onEnter={auth} />
      </Route>
    </Router>
  )

}

export default router