import React from 'react'
import * as DevTools from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const reduxNotReady = 'Devtools is not yet ready to export/import state'

export const devTools = DevTools
export let getDevToolsState = () => { console.warn(reduxNotReady) }
export let setDevToolsState = () => { console.warn(reduxNotReady) }

class JumpsuitDockMonitor extends DockMonitor {
  componentDidMount () {
    super.componentDidMount()

    console.info('Dev Tools: Press ctrl+h to toggle and ctrl+p to change position')

    getDevToolsState = () => this.props.store.getState()
    setDevToolsState = (state) => this.props.dispatch({
      type: 'IMPORT_STATE',
      nextLiftedState: state,
      noRecompute: true
    })
  }
}

export default DevTools.createDevTools(
  <JumpsuitDockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-p'
    defaultIsVisible={false}>
    <LogMonitor theme='tomorrow' />
  </JumpsuitDockMonitor>
)
