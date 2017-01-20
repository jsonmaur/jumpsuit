<div align="center">
  <a href="https://jump.suitstack.com"><img src="/assets/banner-skinny.png?raw=true" alt="Jumpsuit Banner" width="100%" /></a>
  <br />
  <br />
</div>

[![npm version](https://badge.fury.io/js/jumpsuit.svg)](https://badge.fury.io/js/jumpsuit) [![Build Status](https://travis-ci.org/jumpsuit/jumpsuit.svg?branch=master)](https://travis-ci.org/jumpsuit/jumpsuit) [![Libraries.io for GitHub](https://img.shields.io/librariesio/github/jumpsuit/jumpsuit.svg)]() [![Jumpsuit on Slack](https://img.shields.io/badge/slack-jumpsuit-blue.svg)](https://jumpsuit-slack.herokuapp.com/)

Jumpsuit is a powerful and efficient Javascript framework that helps you build great apps. It is **the fastest way** to write scalable React applications with the least overhead.

- Minimalist API
- Components by React
- State Management (powered by [Jumpstate](https://github.com/jumpsuit/jumpstate) and [Redux](http://redux.js.org))
  - Async Side-Effects
  - State/Action Hooks
- Routing
- CLI powered by [Browserify](http://browserify.org/)
- [HSR (Hot State Reloading)](https://medium.com/@tannerlinsley/introducing-hsr-the-hot-state-reloader-behind-jumpsuit-js-42498712ac90)

## Documentation
- [Introduction](https://jump.suitstack.com/docs/introduction.html)
- [Getting Started](https://jump.suitstack.com/docs/getting-started.html)
  - [Learn the Basics](https://jump.suitstack.com/docs/learn-the-basics.html)
  - [Effects](https://jump.suitstack.com/docs/effects.html)
  - [Hooks](https://jump.suitstack.com/docs/hooks.html)
  - [Sandboxed States](https://jump.suitstack.com/docs/sandboxed-states.html)
- [Tutorial](https://jump.suitstack.com/docs/tutorial.html)
- [Examples](https://jump.suitstack.com/docs/examples.html)
- [API](https://jump.suitstack.com/docs/api.html)
- [FAQ](https://jump.suitstack.com/docs/faq.html)
- [Changelog](https://jump.suitstack.com/docs/changelog.html)

## Join us on Slack!
- [Join Here](https://jumpsuit-slack.herokuapp.com/)
- [Chat Here](https://jumpsuit-js.slack.com/)

## Quick FAQ

- **What does the Jumpsuit core include?**
  - Components
  - State Management
  - Routing
  - Rendering
  - Associated Boilerplate for "hooking everything up"
- **What does the CLI do for me?**
  - Hot State Reloading
  - Dev and Production Builds
  - Getting Started Templates
  - Build System (ES6, Bundler, etc.)
  - Obviously you are free to use Jumpsuit with any build system that supports React.
- **Why another javascript framework?**
  - Javascript fatigue is a real thing, especially in the React ecosystem where there are so many options to choose from. Jumpsuit builds on the golden standards from the industry to give you the best developer and user experience. We make it easy for a developer of any skill level to write great apps. For a more in-depth discussion, [read our launch article.](https://medium.com/@tannerlinsley/jumpsuit-react-redux-made-simple-e3186ba1b077)
- **Can I use it with Create React App?**
  - You bet! Jumpsuits CLI is optional. We have instructions below on using just the Jumpsuit framework :)
- **But I've already built an app! Can I still use Jumpsuit?**
  - Of course! Jumpsuit is not an all or nothing framework. You can easily start migrating small parts of your app to use Jumpsuit.
- **I love the state management in Jumpsuit, so can I just use that?**
  - You're probably looking for [Jumpstate](https://github.com/jumpsuit/jumpstate).  We packaged it separately for people just like you :)


## Install

```bash
$ npm install -g jumpsuit-cli
```

You can also use Jumpsuit with your own build system if you don't like ours. We'll only cry a little bit.

```bash
$ npm install --save jumpsuit
```

## Quick Start
```bash
# Create a new project
$ jumpsuit new myProjectName
$ cd myProjectName

# Watch for changes
$ jumpsuit watch

# View your project
$ open localhost:8000
```

## Badge

Using Jumpsuit in your project? Show it off!

[![built with jumpsuit](https://img.shields.io/badge/built%20with-jumpsuit-3A54AD.svg)](https://github.com/jumpsuit/jumpsuit)
```markdown
[![built with jumpsuit](https://img.shields.io/badge/built%20with-jumpsuit-3A54AD.svg)](https://github.com/jumpsuit/jumpsuit)
```

## [Tutorial](https://jump.suitstack.com/docs/tutorial.html)

## Examples

- **[Todo List](https://github.com/jumpsuit/jumpsuit/tree/master/examples/todo/src)**
- **[Advanced Counter](https://github.com/jumpsuit/jumpsuit/tree/master/examples/counter/src/app.js)**

## What does it look like?
Here is the simplest Counter Example we can show you :)
```javascript
// Import Jumpsuit
import { Render, State, Actions, Component } from 'jumpsuit'


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


// Create a subscribed component
const Counter = Component({
  render() {
    return (
      <div>
        <h1>{ this.props.count }</h1>
        <button onClick={ () => Actions.increment() }>Increment</button>
        <button onClick={ () => Actions.decrement() }>Decrement</button>
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

## Team

[![Jason Maurer](https://avatars2.githubusercontent.com/u/911274?v=3&s=100)](https://github.com/jsonmaur) | [![Tanner Linsley](https://avatars1.githubusercontent.com/u/5580297?v=3&s=100)](https://github.com/tannerlinsley)
:-:|:-:
[Jason Maurer](https://github.com/jsonmaur) | [Tanner Linsley](https://github.com/tannerlinsley)

## Used By

<a href='https://nozzle.io'>
  <img src='https://nozzle.io/img/logo-blue.png' alt='Nozzle Logo' style='width:300px;'/>
</a>

## License

[MIT](LICENSE) © Jumpsuit
