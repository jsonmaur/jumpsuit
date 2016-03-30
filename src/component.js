import { connect } from 'react-redux'

export function statelessComponent(config) {
  return React.createClass(config)
}

export function connectedComponent(config) {
  const Comp = React.createClass(config)
  return connect(state => state)(Comp)
}
