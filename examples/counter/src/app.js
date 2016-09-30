// Yep, that's all you have to import
import { Render, State, Component } from 'jumpsuit'

// Create a state with some actions
const CounterState = State({
  // Initial State
  initial: { count: 0 },
  // Actions
  increment (state, payload) {
    return { count: ++state.count }
  },
  decrement (state, payload) {
    return { count: --state.count }
  },
})

// Create a component
const Counter = Component({
  render() {
    return (
      <div>
        <h1>{ this.props.counter.count }</h1>
        <button onClick={ () => CounterState.increment() }>Increment</button>
        <button onClick={ () => CounterState.decrement() }>Decrement</button>
      </div>
    )
  }

}, (state) => ({
  // Subscribe to the counter state (will be available via this.props.counter)
  counter: state.counter
}))

// Render your app!
Render({
  counter: CounterState
}, <Counter/>)
