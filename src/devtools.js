import React from 'react'
import * as DevTools from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
//

export default DevTools.createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-p'
    defaultIsVisible={false}>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
)
