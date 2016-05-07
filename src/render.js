import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { combine } from './rootReducer'

export default function (stores, routes) {
  const store = combine({
    ...stores,
    routing: routerReducer
  })
  const syncedHistory = syncHistoryWithStore(browserHistory, store)
  const base = <Router history={ syncedHistory }>{ routes }</Router>

  let child = base
  if (process.env.NODE_ENV === 'development') {
    if (window.devToolsExtension) {
      console.error('Jumpsuit doesn\'t support the Redux Dev Tools browser extension!')
    }

    const Hsr = require('./hsr').default
    const DevTools = require('./devtools').default

    child = <div>{ base }<DevTools /><Hsr /></div>
  }

  render(
    <Provider store={ store }>{ child }</Provider>,
    document.getElementById('app')
  )
}
