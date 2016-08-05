<div align="center">
  <img src="/assets/banner.png?raw=true" alt="Jumpsuit Banner" width="100%" />
</div>

# Jumpsuit
A powerful and extremely efficient Front-end framework & CLI. It is the fastest way to write scalable react/redux apps with the least overhead.

- No boilerplate
- Dedicated build system
- Scaffolding tools
- Minimal API
- Simple and scalable state management based on redux

<a href="https://gitter.im/jumpsuit/jumpsuit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge">
  <img src="https://badges.gitter.im/jumpsuit/jumpsuit.js.svg" alt="Join the chat at https://gitter.im/jumpsuit/jumpsuit" />
</a>

> Jumpsuit is still under active development, so any feedback is welcome and appreciated!

## Installation
Install from NPM
```bash
# CLI
$ npm install -g jumpsuit-cli

# Framework Only
$ npm install --save jumpsuit
```

## Quick start
```bash
# Create a new project
$ jumpsuit new myProjectName && cd myProjectName
# Watch for changes
$ jumpsuit watch
# View your project
$ open localhost:8000
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

#### State <em>(name, config, detachedState)</em>
- Creates a new state instance
- Parameters
  - <strong>name</strong> String
    - A unique name for this state
  - <strong>config</strong> Object
    - <strong>initial</strong>
      - An object or value representing the initial properties for this state
    - <strong>...actionName(state, payload)</strong>
      - Actions (functions) that transform your your current state.  They receive the current state as the first parameter and any payload used by the caller as the second. Returns a new partial state object to be merged with the existing state.
      - Notes on immutability: Any object returned will be automatically assigned to a new copy of the state object. This means you don't need to use `Object.assign` on the root object of your returns, but you will however need to maintain immutability for nested properties. If you're not sure what this means, see the `state/todos.js` file in the Todo List example for reference.
  - <strong>detachedState</strong> Boolean
    - If set to true, the state will not be attached to the underlying redux instance, and cannot be combined with other states.  This basically creates a state machine that you can use how you please.
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
var sassEntry = path.resolve('src/app.styl')

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
