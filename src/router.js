import React from 'react'
import createReactClass from 'create-react-class'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router } from 'react-router'
//
import { GetHistory } from './historyMode'
import { store } from './createStore'

let syncedHistory

export const getSyncedHistory = () => syncedHistory

export default createReactClass({
  render () {
    const { history, syncedHistory: customSyncedHistory } = this.props

    let resolvedHistory
    if (history) {
      resolvedHistory = history
    } else {
      resolvedHistory = GetHistory()
    }

    syncedHistory = customSyncedHistory || syncHistoryWithStore(resolvedHistory, store)

    return (
      <Router history={syncedHistory}>
        {this.props.children}
      </Router>
    )
  }
})
