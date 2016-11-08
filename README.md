<div align="center">
  <img src="/assets/banner.png?raw=true" alt="Jumpsuit Banner" width="100%" />
  <br />
  <br />
</div>

[![Jumpsuit on Slack](https://img.shields.io/badge/slack-jumpsuit-blue.svg)](https://jumpsuit-slack.herokuapp.com/)

Jumpsuit is a powerful and efficient Javascript framework that helps you build great apps. It is the fastest way to write scalable React/Redux with the least overhead.

- No boilerplate
- Minimalist API
- Components powered by React
- Full-featured state management (powered by [Jumpstate](https://github.com/jumpsuit/jumpstate))
- CLI powered by [Browserify](http://browserify.org/)
- [HSR (Hot State Reloading)](https://medium.com/@tannerlinsley/introducing-hsr-the-hot-state-reloader-behind-jumpsuit-js-42498712ac90)

## FAQ

- **Why another javascript framework?**
  - Javascript fatigue is a real thing, especially in the React ecosystem where there are so many options to choose from. Jumpsuit builds on the golden standards from the industry to give you the best developer and user experience. We make it easy for a developer of any skill level to write great apps. For a more in-depth discussion, [read our launch article.](https://medium.com/@tannerlinsley/jumpsuit-react-redux-made-simple-e3186ba1b077)
- **Can I use it with Create React App?**
  - You bet! Jumpsuits CLI is optional. We have instructions below on using just the Jumpsuit framework :)
- **But I've already built an app! Can I still use Jumpsuit?**
  - Of course! Jumpsuit is not an all or nothing framework. You can easily start migrating small parts of your app to use Jumpsuit.
- **I love the state management in Jumpsuit, so can I just use that?**
  - You're probably looking for [Jumpstate](https://github.com/jumpsuit/jumpstate).  We packaged it separately for people just like you :)


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

- **[Todo List](https://github.com/jumpsuit/jumpsuit/tree/master/examples/todo/src)**
- **[Advanced Counter](https://github.com/jumpsuit/jumpsuit/tree/master/examples/counter/src/app.js)**

Simple Counter Example
```html
<html>
<head>
  <title>Simple Counter Example</title>
</head>
<body>
  <div id="root"></div>
  <script src="app.js"></script>
</body>
</html>

```
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


// Render your app!
Render({
  counter: CounterState
}, <Counter/>)
```

## API

### Component <em>(config, stateMappingFn)</em>
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

### Global States

Creating a global state is easy, and in return you get a reducer that is usable with redux right out of the box.

```javascript
import { State, Actions } from 'jumpsuit'

// Use `State` to make a new global state
const counterReducer = State({
  // Initial State
  initial: { count: 0 },
  // Actions
  increment (state, payload) {
    return { count: state.count + 1 }
  },
  decrement (state, payload) {
    return { count: state.count - 1 }
  },
})

// Now you can use the reducer it returned in your state setup
const states = {
  counter: counterReducer
}

// Call global actions using jumpsuit's `Actions` registry
Actions.increment()
```

### State Actions
When you create a state, you assign action functions that can change that state in some way. When called, each action received the current `state`, and the `payload` that was passed with the call.

It's important to not mutate the current state in these actions, and that you return how the state has changed.

```javascript
increment (state, payload) {
  return {
    count: state.count + 1
  }
},
```

In the example above, we created a new state with our updated count. Win!

### Effects
Effects, at their core, are asynchronous actions. They build on the concepts of [thunks](https://github.com/gaearon/redux-thunk) and [sagas](https://github.com/yelouafi/redux-saga) **but are much easier to understand and use**. Unlike thunks, Effects have their own redux actions, and their callback are executed **because** of those actions. You also gain all of the benefits of a side-effects model, without having to deal with the convoluted api of redux-saga.

To create an effect:
```javascript
import { Effect, Actions } from 'jumpsuit'

const postFetchEffect = Effect('postsFetch', (payload) => {
  // You can do anything here, but async actions are a great use case:
  Actions.showLoading(true)
  Axio.get('http://mysite.com/posts')
    .then(Actions.postsFetchSuccess)
    .catch(Actions.postsFetchError)
    .finally(() => Actions.showLoading(false))
})

// Call the effect
Actions.postsFetch()
// or alternatively
postFetchEffect()
```

### Hooks
A simple hook system that lets you monitor your state for actions or conditions and do just about anything you want.

To create a global effect:
```javascript
import { Hook } from 'jumpsuit'

// You can hook into any actions, even ones from external libraries!
const myEffect = Effect((action, getState) => {
  if (action.type === 'redux-form/INITIALIZE') {
    console.log('A Redux-Form was just initialized with this payload', payload)
  }
})

// Load google analytics if it is not found
const myEffect = Hook((action, getState) => {
  GoogleAnalytics('send', 'page', payload.pathname)
})
```

### Actions
All global actions (including effects) are available via the `Actions` object.
```javascript
Actions.increment()
Actions.myEffect()
```

### Sandboxed States
Sandboxed states are namespaced and isolated from global events. Their state can only be modified by calling actions via their reducer methods. They also return a reducer that is redux-compatible out of the box.

```javascript
import { State } from 'jumpsuit'

// Create a sandboxed state by passing a name as the first parameter
const SandboxedCounter = State('otherCounter', {
  // Initial State
  initial: { count: 0 },
  // Actions
  increment (state, payload) {
    return { count: state.count + 1 }
  },
  decrement (state, payload) {
    return { count: state.count - 1 }
  },
})

// Now you can use the reducer it returned in your state
const states = {
  sandboxedCounter: SandboxedCounter
}

// Sandboxed actions are only accessible through the methods on it's reducer!
SandboxedCounter.increment()
```

### Render <em>(state, component)</em>
- Renders your app to `div#root`
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

### Router
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

### Route
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

### IndexRoute
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

### Middleware <em>(...middlewares)</em>
- A method for registering middleware into Jumpstate's underlying redux instance
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
