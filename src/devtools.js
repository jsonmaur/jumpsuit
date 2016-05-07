import React, {Component, PropTypes} from 'react'
import * as DevTools from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export const devTools = DevTools

class JumpsuitDockMonitor extends DockMonitor {
  componentDidMount(){
    getDevToolsState = () => this.props.store.getState()
    setDevToolsState = (state) => {
      this.props.dispatch({
        type: 'IMPORT_STATE',
        nextLiftedState: state
      })
    }
  }
}

export default DevTools.createDevTools(
  <JumpsuitDockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    defaultIsVisible={ true }>
    <LogMonitor theme='tomorrow' />
  </JumpsuitDockMonitor>
)

export function getDevToolsState(){}
export function setDevToolsState(){}
