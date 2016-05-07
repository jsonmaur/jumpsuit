import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { combine } from './rootReducer'
import { isDevTools } from './utils/env'


export default function (stores, routes) {
  const store = combine({
    ...stores,
    routing: routerReducer
  })
  const syncedHistory = syncHistoryWithStore(browserHistory, store)
  const base = <Router history={ syncedHistory }>{ routes }</Router>

  let child = base
  if (process.env.NODE_ENV === 'development') {
    const Hsr = require('./hsr').default
    child = <div>{ base }<Hsr /></div>

    if (!isDevTools()) {
      const DevTools = require('./devtools').default
      child = <div>{ base }<DevTools /><Hsr /></div>
    }
  }

  render(
    <Provider store={ store }>{ child }</Provider>,
    document.getElementById('app')
  )
}
