// Yep, that's all you have to import
import { Render, State, Effect, Actions, Component } from 'jumpsuit'

// Create a state with some actions
const CounterState = State('counter', {
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

// Create another state with similar actions
const OtherCounterState = State('otherCounter', {
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

// Create a named effect which, when called, will dispatch a parent action
// called 'asyncIncrement', which will then trigger it's callback
Effect('asyncIncrement', (isGlobal) => {
  if (isGlobal) {
    return setTimeout(() => Actions.increment(), 1000)
  }
  setTimeout(() => Actions.Counter.increment(), 1000)
})

// Create a global effect, that will get run after every dispatch
Effect((action, getState) => {
  if (getState().counter.count === 10){
    Actions.Counter.increment()
  }
})

// Create a component
const Counter = Component({
  render() {
    return (
      <div>
        <h1>Counter: { this.props.counter.count } <em>*Try to make me 10</em></h1>
        <h1>Other Counter: { this.props.otherCounter.count }</h1>
        <br />
        <br />
        {/* Action can be called via the state reducer, or via the global Actions lists' state sections, whichever is more convenient */}
        <button onClick={ () => CounterState.decrement() }>Decrement</button>
        <button onClick={ () => Actions.Counter.increment() }>Increment</button>
        <br />
        <button onClick={ () => Actions.asyncIncrement() }>Increment after 1 sec.</button>
        <br />
        <br />
        <br />
        {/* Running a global action will allow every state to respond to that action*/}
        <button onClick={ () => Actions.decrement() }>Global Decrement</button>
        <button onClick={ () => Actions.increment() }>Global Increment</button>
        <br />
        <button onClick={ () => Actions.asyncIncrement(true) }>Increment after 1 sec.</button>
      </div>
    )
  }

}, (state) => ({
  // Subscribe to states (will be available via this.props.counter)
  counter: state.counter,
  otherCounter: state.otherCounter
}))

// Render your app!
Render({
  counter: CounterState,
  otherCounter: OtherCounterState
}, <Counter/>)
