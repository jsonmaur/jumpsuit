import { connect } from 'react-redux'

export default function (options, connectFn) {
  if (!connectFn) connectFn = (state) => state

  const container = React.createClass(options)
  return connect(connectFn)(container)
}
