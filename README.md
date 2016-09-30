<div align="center">
  <a href="https://gitter.im/jumpsuit/jumpsuit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge">
    <img src="https://badges.gitter.im/jumpsuit/jumpsuit.js.svg" alt="Join the chat at https://gitter.im/jumpsuit/jumpsuit" />
  </a>
  <br /> <br />

  <img src="/assets/banner.png?raw=true" alt="Jumpsuit Banner" width="100%" />
</div>
<br />

> *Jumpsuit is still under active development, so any feedback is welcome and appreciated!*

A powerful and efficient Javascript framework that helps you build great apps. It is the fastest way to write scalable React/Redux with the least overhead.

- No boilerplate
- Minimalist API
- Built-in support for ES6
- Components powered by React
- State based on Redux
- CLI powered by Browserify
- [HSR (Hot State Reloading)](https://medium.com/@tannerlinsley/introducing-hsr-the-hot-state-reloader-behind-jumpsuit-js-42498712ac90)

## Why another Javascript framework?

[Just read this.](https://medium.com/@tannerlinsley/jumpsuit-react-redux-made-simple-e3186ba1b077)

Javascript fatigue is a real thing, especially in the React/Webpack/Redux world where there are so many options to choose from. Jumpsuit brings together the best standards in the industry with the least amount of headache. It should be easy for a developer of any skill level to get started writing great apps without spending hours setting them up.

## Getting Started

#### Install

```bash
$ npm install -g jumpsuit-cli
```

You can also use Jumpsuit with your own build system if you don't like ours. We'll only cry a little bit.

```bash
$ npm install --save jumpsuit
```

#### Quick Start
```bash
# Create a new project
$ jumpsuit new myProjectName
$ cd myProjectName

# Watch for changes
$ jumpsuit watch

# View your project
$ open localhost:8000
```

#### Badge

Using Jumpsuit in your project? Show it off!

[![built with jumpsuit](https://img.shields.io/badge/built%20with-jumpsuit-3A54AD.svg)](https://github.com/jumpsuit/jumpsuit)
```markdown
[![built with jumpsuit](https://img.shields.io/badge/built%20with-jumpsuit-3A54AD.svg)](https://github.com/jumpsuit/jumpsuit)
```

## Examples

#### [Todo List](https://github.com/jumpsuit/jumpsuit/tree/master/examples/todo/src)

#### Counter
```html
<html>
<head>
  <title>Jumpsuit Example</title>
</head>
<body>
  <div id="app"></div>
  <script src="app.js"></script>
</body>
</html>

```
```javascript
// Yep, that's all you have to import
import { Render, State, Component } from 'jumpsuit'

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
```

## API

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
          <button onClick={ this.sayHello }>Say Hello</button>
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

#### State <em>([ config/name,] actions)</em>
**Powered by [Jumpstate](https://github.com/jumpsuit/jumpstate)**
Below is a simple example on how to use Jumpsuit's `State` component
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

// Get the current Counter state outside of a Linked Component
CounterState()
// { count: 1 }

// Call the methods normally. No action creators or dispatch required.
CounterState.increment()
// { count: 1 }

CounterState.set(5)
// { count: 5 }

CounterState.reset()
// { count: 0 }
```

The `State` component packs way more power than we show here. For the full documentation, visit [Jumpstate](https://github.com/jumpsuit/jumpstate). There you will find examples on how to:

- Name your state for easier debugging
- Set global defaults and configure individual states
- Use `State` as an action creator factory and use the traditional redux dispatcher
- Create vanilla JS states that do not rely on Redux
- Manage your own immutability within the state

#### Render <em>(state, component)</em>
- Renders your app to `div#app`
- Parameters
  - <strong>state or {states}</strong>
    - A single state or state combining object.  If passing a an object, the property names must use the state name they correspond to.
  - <strong>component</strong>
    - The root Jumpsuit/React Component of your app
  - Single State
    ```javascript
    import { Render } from 'jumpsuit'

    import Counter from './containers/counter'
    import CounterState from './states/counter'

    Render(CounterState, <Counter/>)
    ```
  - Combined State
    ```javascript
    import { Render } from 'jumpsuit'

    import App from './containers/app'

    import CounterState from './states/counter'
    import TimerState from './states/timer'

    const state = {
      counter: CounterState, // CounterState's name is 'counter'
      timer: TimerState // TimerState's name is 'timer'
    }

    Render(state, <App/>)
    ```

#### Router
- Jumpsuit's built-in router
  ```javascript
  import { Render, Router, IndexRoute, Route } from 'jumpsuit'

  Render(state, (
    <Router>
      <IndexRoute component={ Home }/>
      <Route path="/counter" component={ Counter }/>
    </Router>
  ))
  ```

#### Route
- Renders a component at the specified route
  ```javascript
  import { Render, Router, Route } from 'jumpsuit'

  import Counter from './components/counter'

  Render(state, (
    <Router>
      <Route path="/counter" component={ Counter }/>
    </Router>
  ))
  ```

#### IndexRoute
- Renders a component at the index route of your app
  ```javascript
  import { Render, Router, Route } from 'jumpsuit'

  import Home from './components/home'

  Render(state, (
    <Router>
      <IndexRoute component={ Home }/>
    </Router>
  ))
  ```

#### Middleware <em>(...middlewares)</em>
- A method for registering middleware into the underlying redux instance
  ```javascript
  import { Render, Middleware } from 'jumpsuit'

  const myMiddleware = store => next => action => {
    let result = next(action)
    return result
  }

  Middleware(myMiddleware, ...OtherMiddleWares)

  Render(state, <App/>)
  ```

## Build System & CLI

#### CLI Usage
```bash
Usage:

    jumpsuit <command> [options]

Commands:

    new [dir] [example]   start a new project at the specified
                          directory using an optional example template

    init [example]        start a new project in the current directory
                          using an optional example template

    watch                 build initial app and wait for file changes
    build                 create a production-ready version of app
    serve                 run the static server

Options:

    -p, --port            specify the port you want to run on
    -h, --host            specify the host you want to run on
    -v, --version         show jumpsuit version number
```

#### jumpsuit.config.js
An optional (but recommended) file at your project's root that can contain any of the following customizations:
```javascript
// Defaults
module.exports = {
  sourceDir: 'src', // Where source files are located
  outputDir: 'dist', // Where your built files will be placed
  assetsDir: 'assets', // Relative to your sourceDir, everything in here is placed in the root of your outputDir directory.

  assetsIgnoreExtensions: [], // If you don't want any files in your assets to copy over, ignore them here. eg ['*.scss']

  entry: 'app.js', // Jumpsuit starts building here, relative to your sourceDir

  prodSourceMaps: true, // Whether we should output sourcemaps in your production builds

  hsr: {
    maxAge: 1000, // Max age for Hot State Replacement
    shouldCatchErrors: true // Should Hot State replacement catch errors?
  },

  server: {
    host: 'localhost', // The host we serve on when watching
    port: 8000, // The port we serve on when watching
  },

  // More customizations available for browserify
  browserify: {
    extensions: ['.js'],
    rebundles: [],
    transforms: [],
    globals: {}
  },

  // Note: By default style hooks are disabled. Standard css files should be placed in your assetsDir

  // Style hooks (see Common CSS Configs for example usage)
  styles: {
    extensions: [], // Extensions of style files in your srcDir that will be watch and passed to the action below on change
    action: null // A debounced function that should return all of your css as a string (supports a promise). Debounced by default by 300ms
  }
}
```

## Common CSS Configs

#### Stylus
jumpsuit.config.js
```javascript
var fs = require('fs')
var path = require('path')
var stylus = require('stylus')
var nib = require('nib')

module.exports = {
  styles: {
    extensions: ['.css', '.styl'],
    action: buildStyles
  }
}
var stylusEntry = path.resolve('src/app.styl')

function buildStyles(){
  return new Promise((resolve, reject) => {
    stylus.render(fs.readFileSync(stylusEntry, 'utf8'), {
      'include css': true,
      'hoist atrules': true,
      compress: process.env.NODE_ENV === 'production',
      paths: [path.resolve('src')],
      use: nib()
    }, function(err, css){
      if (err) reject(err)
      resolve(css)
    });
  })
}
```

#### Sass
jumpsuit.config.js
```javascript
var fs = require('fs')
var path = require('path')
var sass = require('node-sass')

module.exports = {
  styles: {
    extensions: ['.css', '.scss'],
    action: buildStyles
  }
}
var sassEntry = path.resolve('src/app.scss')

function buildStyles(){
  return new Promise((resolve, reject) => {
    sass.render({
      file: sassEntry,
      outputStyle: 'compressed'
    }, function(err, res) {
      if (err){
        return reject(err)
      }
      resolve(res.css.toString())
    });
  })
}
```

## Team

[![Jason Maurer](https://avatars2.githubusercontent.com/u/911274?v=3&s=100)](https://github.com/jsonmaur) | [![Tanner Linsley](https://avatars1.githubusercontent.com/u/5580297?v=3&s=100)](https://github.com/tannerlinsley)
:-:|:-:
[Jason Maurer](https://github.com/jsonmaur) | [Tanner Linsley](https://github.com/tannerlinsley)

## License

[MIT](LICENSE) © Jumpsuit
