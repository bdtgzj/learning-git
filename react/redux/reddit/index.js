//import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Root />,
    document.getElementById('root')
  )
})