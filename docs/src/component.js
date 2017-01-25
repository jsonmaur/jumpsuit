import { connect } from 'react-redux'
import { component } from './utils'

// Decorates a component to be subscribed to the underlying redux store
// @Component(connectFn); class - functions as an ES7 decorator
export default (p1, p2) => {
  if (p2) {
    return connect(p2)(component(p1))
  }
  return item => connect(p1)(component(item))
}
