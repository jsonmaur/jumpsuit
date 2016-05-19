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


## Team

[![Jason Maurer](https://avatars2.githubusercontent.com/u/911274?v=3&s=100)](https://github.com/jsonmaur) | [![Tanner Linsley](https://avatars1.githubusercontent.com/u/5580297?v=3&s=100)](https://github.com/tannerlinsley)
:-:|:-:
[Jason Maurer](https://github.com/jsonmaur) | [Tanner Linsley](https://github.com/tannerlinsley)

## License

© 2016 [MIT](LICENSE)
