import React from 'react'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import LayoutContainer from './layout/LayoutContainer'
import LoginContainer from './login/containers/LoginContainer'
import HomecardContainer from './homecard/HomecardContainer'
import SceneContainer from './scene/SceneContainer'
import RegionContainer from './region/RegionContainer'
import CategoryContainer from './category/CategoryContainer'
import DeviceContainer from './device/DeviceContainer'
import InstructionContainer from './instruction/InstructionContainer'
import UserContainer from './user/UserContainer'
import IconContainer from './icon/IconContainer'
import ColorContainer from './color/ColorContainer'
import InscatContainer from './inscat/InscatContainer'
import FamilyContainer from './family/FamilyContainer'
import LogContainer from './log/LogContainer'
import Home from './home'

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
        <Route path="homecard" component={HomecardContainer} />
        <Route path="scene" component={SceneContainer} />
        <Route path="region" component={RegionContainer} />
        <Route path="category" component={CategoryContainer} />
        <Route path="device" component={DeviceContainer} />
        <Route path="instruction" component={InstructionContainer} />
        <Route path="user" component={UserContainer} />
        <Route path="icon" component={IconContainer} />
        <Route path="color" component={ColorContainer} />
        <Route path="inscat" component={InscatContainer} />
        <Route path="family" component={FamilyContainer} />
        <Route path="log" component={LogContainer} />
        <Route path="signout" onEnter={signout} />
        <Route path="*" component={NoMatch} onEnter={auth} />
      </Route>
    </Router>
  )

}

export default router