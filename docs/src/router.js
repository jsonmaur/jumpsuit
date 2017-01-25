import React from 'react'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router } from 'react-router'
//
import { GetHistory } from './historyMode'
import { store } from './createStore'

export default React.createClass({
  render () {
    const { history, syncedHistory } = this.props

    let resolvedHistory
    if (history) {
      resolvedHistory = history
    } else {
      resolvedHistory = GetHistory()
    }

    const resolvedSyncedHistory = syncedHistory || syncHistoryWithStore(resolvedHistory, store)

    return (
      <Router history={resolvedSyncedHistory}>
        {this.props.children}
      </Router>
    )
  }
})
