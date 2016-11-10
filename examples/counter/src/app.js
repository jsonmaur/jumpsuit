// Yep, that's all you have to import
import { Render, State, Effect, Hook, Actions, Component } from 'jumpsuit'

// Some reusable actions for all of our counters
const increment = (state, payload) => {
  return { count: state.count + 1 }
}
const decrement = (state, payload) => {
  return { count: state.count - 1 }
}

// Create a state with some actions
const Counter = State({
  // Initial State
  initial: { count: 0 },
  // Actions
  increment,
  decrement
})

// Create a state with some actions
const Counter2 = State({
  // Initial State
  initial: { count: 0 },
  // Actions
  increment,
  decrement
})

// Create a sandboxed state with similar actions
const SandboxCounter = State('sandboxCounter', {
  // Initial State
  initial: { count: 0 },
  // Actions
  increment,
  decrement
})

// Create a global asynchronous event
Effect('asyncIncrement', (isSandbox) => {
  if (isSandbox) {
    return setTimeout(() => SandboxCounter.increment(), 1000)
  }
  setTimeout(() => Actions.increment(), 1000)
})

// Create a global effect, that will get run after every dispatch
Hook((action, getState) => {
  // Like never letting the second counter equal 10!
  if (getState().counter2.count === 10) {
    Actions.increment()
  }
})

// Create a component
const App = Component({
  render () {
    return (
      <div className='Counter'>
        <h1>Counter 1: { this.props.count }</h1>
        <h1>Counter 2: { this.props.count2 } <em>*Try to make me 10</em></h1>
        <h1>Sandboxed Counter: { this.props.sandboxCount }</h1>
        <br />
        <br />
        {/* Call actions via the global Actions list */}
        <h3>Global Actions</h3>
        <button onClick={() => Actions.decrement()}>Decrement</button>
        <button onClick={() => Actions.increment()}>Increment</button>
        <br />
        <button onClick={() => Actions.asyncIncrement()}>Increment after 1 sec.</button>
        <br />
        <br />
        <br />
        {/* Running a global action will allow every state to respond to that action */}
        <h3>Sandboxed Actions</h3>
        <button onClick={() => SandboxCounter.decrement()}>Decrement</button>
        <button onClick={() => SandboxCounter.increment()}>Increment</button>
        <br />
        <button onClick={() => Actions.asyncIncrement(true)}>Increment after 1 sec.</button>
      </div>
    )
  }
}, (state) => {
  // Subscribe to the different counts (will be available via this.props)
  return {
    count: state.counter.count,
    count2: state.counter2.count,
    sandboxCount: state.sandboxCounter.count
  }
})

// Render your app!
Render({
  counter: Counter,
  counter2: Counter2,
  sandboxCounter: SandboxCounter
}, <App />)
