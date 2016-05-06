import React from 'react'
import * as DevTools from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export const devTools = DevTools

export default DevTools.createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    defaultIsVisible={ true }>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
)
