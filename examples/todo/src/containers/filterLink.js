import {Component} from 'jumpsuit'
//
import Todos from 'state/todos'
import Link from 'components/link'

export default Component({
  render () {
    return (
      <Link
        active={this.props.active}
        onClick={() => {
          Todos.setVisibility(this.props.filter)
        }}>
        {this.props.children}
      </Link>
    )
  }
}, (state, props) => {
  return {
    active: props.filter === state.todos.visibility
  }
})
