import { Component } from 'jumpsuit'
import { increment, decrement } from 'state/counter'

export default Component({
  render() {
    return (
      <div>
        <h1>{ this.props.counter.count }</h1>

        <button onClick={ increment }>Increment</button>
        <button onClick={ decrement }>Decrement</button>
      </div>
    )
  },
}, (state) => ({
  counter: state.counter
}))
