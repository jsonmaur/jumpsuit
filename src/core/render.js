import React from 'react'
import { render } from 'react-dom'
import { Router as ReactRouter, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { combine } from './reducer'

export default function (stores, baseComponent) {
  const store = combine({
    ...stores,
    routing: routerReducer,
  })

  const syncedHistory = syncHistoryWithStore(browserHistory, store)
  const base = baseComponent.type.name === 'Router'
    ? <ReactRouter history={ syncedHistory }>{ baseComponent }</ReactRouter>
    : baseComponent

  let child = base
  if (process.env.NODE_ENV === 'development') {
    if (window.devToolsExtension) {
      console.warn('Jumpsuit doesn\'t support the Redux Dev Tools browser extension!')
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

export function Router (props) {
  return <div>{ this.props }</div>
}
// export const Router = React.createClass({
//   render: () => <div>{ this.props }</div>
// })
