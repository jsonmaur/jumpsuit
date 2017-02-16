<div align="center">
  <a href="https://jumpsuit.js.org"><img src="/assets/banner-skinny.png?raw=true" alt="Jumpsuit Banner" width="100%" /></a>
  <br />
  <br />
</div>

[![npm version](https://badge.fury.io/js/jumpsuit.svg)](https://badge.fury.io/js/jumpsuit) [![Build Status](https://travis-ci.org/jumpsuit/jumpsuit.svg?branch=master)](https://travis-ci.org/jumpsuit/jumpsuit) [![npm](https://img.shields.io/npm/dm/jumpsuit.svg)]() [![Jumpsuit on Slack](https://img.shields.io/badge/slack-jumpsuit-blue.svg)](https://jumpsuit-slack.herokuapp.com/)

Jumpsuit is a React framework for efficiently building powerful web applications.

- [Introduction](https://jumpsuit.js.org/introduction.html)
- [Getting Started](https://jumpsuit.js.org/getting-started.html)
- [Learn the Basics](https://jumpsuit.js.org/learn-the-basics.html)
- [Effects](https://jumpsuit.js.org/effects.html)
- [Hooks](https://jumpsuit.js.org/hooks.html)
- [Sandboxed States](https://jumpsuit.js.org/sandboxed-states.html)
- [Hot State Reloading (HSR)](https://jumpsuit.js.org/hot-state-reloading.md)
- [Tutorial](https://jumpsuit.js.org/tutorial.html)
- [Examples](https://jumpsuit.js.org/examples.html)
- [API](https://jumpsuit.js.org/api.html)
- [FAQ](https://jumpsuit.js.org/faq.html)
- [Changelog](https://jumpsuit.js.org/changelog.html)
- [Jumpstate](https://github.com/jumpsuit/jumpstate)

## Join us on Slack!
- [Join Here](https://jumpsuit-slack.herokuapp.com/)
- [Chat Here](https://jumpsuit-js.slack.com/)

## Quick Start
#### Install to an existing project

```bash
$ yarn add jumpsuit
# or
$ npm install --save jumpsuit
```

#### Using Create-React-App
```bash
# Create a new project with create-react-app
$ create-react-app myProjectName
$ cd myProjectName

# Install Jumpsuit
$ yarn add jumpsuit

# Start the create-react-app dev server
$ yarn start
```
#### `index.js`
```javascript
// Import Jumpsuit
import React from 'react'
import { Render, State, Actions, Component, Effect } from 'jumpsuit'

// Create a state with some actions
const CounterState = State({
  // Initial State
  initial: { count: 0 },
  // Actions
  increment: ({ count }) => ({ count: count + 1 }),
  decrement: ({ count }) => ({ count: count - 1 })
})

// Create an async action
Effect('incrementAsync', () => {
  setTimeout(() => Actions.increment(), 1000)
})

// Create a subscribed component
const Counter = Component({
  render() {
    return (
      <div>
        <h1>{ this.props.count }</h1>
        <button onClick={ Actions.increment }>Increment</button>
        <button onClick={ Actions.decrement }>Decrement</button>
        <br />
        <button onClick={ Actions.incrementAsync }>Increment Async</button>
      </div>
    )
  }
}, (state) => ({
  // Subscribe to the counter state (will be available via this.props.counter)
  count: state.counter.count
}))

// Compose the global state
const globalState = { counter: CounterState }

// Render your app!
Render(globalState, <Counter/>)
```

[Live Example on WebpackBin](http://www.webpackbin.com/V1Q_BpCdf)

## FAQ

- **What does the Jumpsuit core include?**
  - State Management powered by Jumpstate & Redux
  - Routing (React-Router)
  - Rendering/Bootstrapping
  - Hot State Reloading
- **Can I use it with Create React App?**
  - You bet! We have an [example](https://github.com/jumpsuit/jumpsuit/tree/master/examples/create-react-app-starter) you can view or drop right into your `src` directory!
- **But I've already built an app! Can I still use Jumpsuit?**
  - Of course! Jumpsuit is not an all or nothing framework and has many levels of buy-in for usefulness. You can easily migrate small parts of your app to use Jumpsuit using only the pieces you need.
- **I love the state management in Jumpsuit, so can I just use that?**
  - Of course! Head over to [Jumpstate](https://github.com/jumpsuit/jumpstate) to get started!

## Badge

Using Jumpsuit in your project? Show it off!

[![built with jumpsuit](https://img.shields.io/badge/built%20with-jumpsuit-3A54AD.svg)](https://github.com/jumpsuit/jumpsuit)
```markdown
[![built with jumpsuit](https://img.shields.io/badge/built%20with-jumpsuit-3A54AD.svg)](https://github.com/jumpsuit/jumpsuit)
```

## [Tutorial](https://jumpsuit.js.org/tutorial.html)

## Examples

- **[Create React App Starter](https://github.com/jumpsuit/jumpsuit/tree/master/examples/create-react-app-starter)**
- **[Todo List](https://github.com/jumpsuit/jumpsuit/tree/master/examples/todo/src)**
- **[Advanced Counter](https://github.com/jumpsuit/jumpsuit/tree/master/examples/counter/src/app.js)**

## Team

[![Tanner Linsley](https://avatars1.githubusercontent.com/u/5580297?v=3&s=100)](https://github.com/tannerlinsley) | [![Jason Maurer](https://avatars2.githubusercontent.com/u/911274?v=3&s=100)](https://github.com/jsonmaur)
:-:|:-:
[Tanner Linsley](https://github.com/tannerlinsley) | [Jason Maurer](https://github.com/jsonmaur)

## Used By

<a href='https://nozzle.io'>
  <img src='https://nozzle.io/img/logo-blue.png' alt='Nozzle Logo' style='width:300px;'/>
</a>

## License

[MIT](LICENSE) © Jumpsuit
