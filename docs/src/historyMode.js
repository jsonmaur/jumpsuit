import { browserHistory, hashHistory, createMemoryHistory } from 'react-router'
const modes = ['browser', 'hash', 'memory']
let historyMode = 'browser'
// let historyMode = 'hash'

// Basic setter/getter
export default mode => {
  if (mode) {
    if (modes.indexOf(mode) === -1) {
      throw new Error(`"${mode}" is not a valid browser mode! Must be one of: ${JSON.stringify(modes)}`)
    }
    historyMode = mode
  }
  return historyMode
}

export const GetHistory = () => {
  if (global.IS_SERVERSIDE || historyMode === 'memory') {
    return createMemoryHistory()
  }
  if (historyMode === 'browser') {
    return browserHistory
  }
  if (historyMode === 'hash') {
    return hashHistory
  }
}
