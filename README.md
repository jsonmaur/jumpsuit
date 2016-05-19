<div align="center">
  <img src="assets/banner.png" alt="Jumpsuit Banner" width="100%" />
  <br /> <br />

  <a href="https://travis-ci.org/zab/jumpsuit">
    <img src="https://travis-ci.org/zab/jumpsuit.svg?branch=master" alt="Build Status" />
  </a>

  <a href="https://coveralls.io/github/zab/jumpsuit?branch=master">
    <img src="https://coveralls.io/repos/github/zab/jumpsuit/badge.svg?branch=master" alt="Coverage Status" />
  </a>

  <a href="https://gitter.im/zab/jumpsuit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge">
    <img src="https://badges.gitter.im/zab/jumpsuit.js.svg" alt="Join the chat at https://gitter.im/zab/jumpsuit" />
  </a>
</div>

---

A powerful & efficient front end framework, built on the industry's best technologies.

## Installation
Install from NPM
```
$ npm install jumpsuit --save
```

## Example
```javascript
import { Render, State, Component } from 'jumpsuit'

// Create a state and with some actions
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

// Create a component
const Counter = Component({
  render() {
    return (
      <div>
        <h1>{ this.props.counter.count }</h1>
        <Button onClick={ this.increment }>Increment</Button>
        <Button onClick={ this.decrement }>Decrement</Button>
      </div>
    )
  },
  increment(){
    // Dispatch state actions
    CounterState.increment()
  },
  decrement(){
    // Dispatch state actions
    CounterState.decrement()
  },

}, (state) => ({
  // Subscribe to the counter state (will be available via this.props.counter)
  counter: state.counter
}))

// Run your app!
Render(CounterState, <Counter/>)
```

## Usage

#### Component <em>(config, stateMappingFn)</em>
- Creates a new simple or stateful component.
- Parameters
  - <strong>config</strong> Object
    - A react-class config
  - <strong>stateMappingFn(state)</strong>
    - An optional function that subscribes the component to the state
    - Must return an object, which will be available via the component's `props`
- Returns
  - React Component
- Simple Component
```javascript
  import { Component } from 'jumpsuit'

  const SayHello = Component({
    render() {
      return (
        <div>
          <Button onClick={ this.sayHello }>Say Hello</Button>
        </div>
      )
    },
    sayHello(){
      console.log('Hello!')
    },
  })
```
- Stateful Component
```javascript
  import { Component } from 'jumpsuit'

  const Counter = Component({
    render() {
      return (
        <div>
          Count: { this.props.count }
        </div>
      )
    }
  // Subscribe to the count property on the count state
  }, (state) => {
    return {
      count: state.counter.count
    }
  })
```

#### State <em>(config)</em>
- Creates a new state instance
- Parameters
  - <strong>config</strong> Object
    - <strong>initial</strong>
      - An object or value representing the initial properties for this state
    - <strong>...actionName(state, payload)</strong>
      - Actions (functions) that transform your your current state.  They receive the current state as the first parameter and any payload used by the caller as the second
- Returns
  - <strong>State Reducer</strong> function - can be used directly in the Render method, or combined with other states using State.combine. It also has these these prototype methods:
    - <strong>.getState()</strong>
      - Returns the current state of the instance
    - <strong>.dispatch()</strong>
      - The underlying redux dispatcher

  ```javascript

    import { State } from 'jumpsuit'

    const CounterState = State({
      initial: { count: 0 },
      increment (state, payload) {
        return { count: ++state.count }
      },
      set (state, payload) {
        return { count: payload }
      },
      reset (state) {
        return { count: 0 }
      }
    })

    // Call the methods normally. No action creators or dispatch required.
    CounterState.increment()
    // CounterState.getState() === { count: 1 }

    CounterState.set(5)
    // CounterState.getState() === { count: 5 }

    CounterState.reset()
    // CounterState.getState() === { count: 0 }
  ```

#### State.combine <em>(stateMapping)</em>
- Combines multiple state into a single state that you can use in Render
- Parameters
  - <strong>stateMapping</strong> Object
    - An object that maps state names to a state
- Returns
  - <strong>State Reducer</strong>, a combined reducer function that can be used directly in the Render method
  ```javascript

    import user from './states/user'
    import counter from './states/counter'

    const state = {
      user,
      counter
    }

    Render(state, <App/>)
  ```

#### Render <em>(state, component)</em>
- Renders your app to `div#app`
- Parameters
  - <strong>state</strong>
    - A single or combined state reducer
  - <strong>component</strong>
    - The root Jumpsuit/React Component of your app
  ```javascript
    import { Render } from './states/user'

    import Counter from './containers/counter'
    import CounterState from './states/counter'

    Render(CounterState, <Counter/>)
  ```

## Team

[![Jason Maurer](https://avatars2.githubusercontent.com/u/911274?v=3&s=100)](https://github.com/jsonmaur) | [![Tanner Linsley](https://avatars1.githubusercontent.com/u/5580297?v=3&s=100)](https://github.com/tannerlinsley)
:-:|:-:
[Jason Maurer](https://github.com/jsonmaur) | [Tanner Linsley](https://github.com/tannerlinsley)

## License

© 2016 [MIT](LICENSE)
