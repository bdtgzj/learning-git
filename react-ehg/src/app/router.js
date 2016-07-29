import React from 'react'
import {IndexRoute, Route } from 'react-router'

//import Login from './admin'
import LayoutContainer from './layout/LayoutContainer'
import Home from './home'

// 


// 
const NoMatch = () => (<div>This is a NoMatch stub.</div>)

function router(getState) {

  function auth(nextState, replace) {
    if (!getState().login.admin) {
      //replaceState({nextPathname: nextState.location.pathname}, '/login')
      //replace({ nextPathname: nextState.location.pathname }, '/login', nextState.location.query)
      replace('/login')
    }
  }

  return (
    <Route path="/" component={LayoutContainer} onEnter={auth}>
      <IndexRoute component={Home} onEnter={auth} />
      <Route path="*" component={NoMatch} onEnter={auth}  />
    </Route>
  )

}

export default router