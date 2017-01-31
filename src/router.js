import React from 'react'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router } from 'react-router'
//
import { GetHistory } from './historyMode'
import { store } from './createStore'

export let syncedHistory

export default React.createClass({
  render () {
    const { history, syncedHistory: preSyncedHistory } = this.props

    let resolvedHistory
    if (history) {
      resolvedHistory = history
    } else {
      resolvedHistory = GetHistory()
    }

    syncedHistory = preSyncedHistory || syncHistoryWithStore(resolvedHistory, store)

    return (
      <Router history={syncedHistory}>
        {this.props.children}
      </Router>
    )
  }
})
