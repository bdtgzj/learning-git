import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Mvvm from './mvvm'

const Lab = () => (
  <Mvvm />
)

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <Lab />,
    document.getElementById('lab')
  )
  
})