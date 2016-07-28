import React from 'react'
import {IndexRoute, Route } from 'react-router'

//import Login from './admin'
import Layout from './components/Layout'
import Home from './home'

// 
const NoMatch = () => (<div>This is a NoMatch stub.</div>)

const router = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="*" component={NoMatch} />
  </Route>
)

export default router