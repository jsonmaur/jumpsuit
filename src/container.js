import {connect} from 'react-redux'

export default function (options, states) {
  states = typeof (states) == 'string' ? [states] : states
  const container = React.createClass(options)
    // TODO: use reselect
  return connect((state) => {
    const filteredState = {}
    for (var key in state) {
      if (state.hasOwnProperty(key) && states.indexOf(key) > -1) {
        filteredState[key] = state[key].state
      }
    }
    return {
      state: filteredState,
      actions: state[key].dispatchers
    }
  })(container)
}
