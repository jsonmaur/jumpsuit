import React from 'react'
import { render } from 'react-dom'
import { Router as ReactRouter, browserHistory, hashHistory, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { combine } from './reducer'

let syncedHistory

export default function (stores, baseComponent, options = {}) {
  const store = combine({
    ...stores,
    routing: routerReducer
  }, options)

  let history
  if (global.IS_SERVERSIDE) {
    history = createMemoryHistory()
  } else {
    history = options.useHash ? hashHistory : browserHistory
  }
  syncedHistory = syncHistoryWithStore(history, store)
  const base = baseComponent

  let child = base
  if (process.env.NODE_ENV !== 'production') {
    if (global.devToolsExtension) {
      console.warn('Jumpsuit doesn\'t support the Redux Dev Tools browser extension!')
    }

    const Hsr = require('./hsr').default
    const DevTools = require('./devtools').default

    child = <div>{base}<DevTools /><Hsr /></div>
  }

  const root = <Provider store={store}>{child}</Provider>

  global.document && render(
    root,
    global.document.getElementById('app')
  )

  return root
}

export const Router = React.createClass({
  propTypes: { children: React.PropTypes.object },
  getDefaultProps: () => ({ _isRouteWrapper: true }),
  render: function () {
    return (
      <ReactRouter history={syncedHistory}>
        {this.props.children}
      </ReactRouter>
    )
  }
})
