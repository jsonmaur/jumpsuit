import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { combine } from './rootReducer'
import { isDev, isDevTools } from './utils/env'

export default function (stores, routes) {
  const base = <Router history={ browserHistory }>{ routes }</Router>

  let child = base
  if (isDev() && !isDevTools()) {
    const DevTools = require('./devtools').default
    child = <div>{ base }<DevTools /></div>
  }

  render(
    <Provider store={ combine(stores) }>{ child }</Provider>,
    document.getElementById('app')
  )
}
