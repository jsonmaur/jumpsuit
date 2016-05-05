import { connect } from 'react-redux'

export default function (options, states) {
  const container = React.createClass(options)
  return connect(state => state)(container)

  // TODO: use reselect
  // return connect(() => {
  //   const state = { one: { hi: 'hi' }, two: { hello: 'hello' } }
  //   state.filter((a, key) => states.indexOf(key) > -1)
  // })(container)
}
