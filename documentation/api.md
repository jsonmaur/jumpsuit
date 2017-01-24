# API

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

### State

Creating a state is easy. Pass `State()` an object with your `initial` state object and some actions.
This returns a reducer that should then be passed into your render function's state object.


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
  Axios.get('http://mysite.com/posts')
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
const myHook = Hook((action, getState) => {
  if (action.type === 'redux-form/INITIALIZE') {
    console.log('A Redux-Form was just initialized with this payload', payload)
  }
})

// Load google analytics if it is not found
const analyticsHook = Hook((action, getState) => {
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
Sandboxed states are namespaced and isolated from global events. Their state can only be modified by calling actions via their reducer methods. This method returns a reducer that should be passed into your render function's state object.

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

### Render <em>(state, component [, options])</em>
- Renders your app to `div#app`
- Parameters
  - <strong>state or {states}</strong>
    - A single state or state combining object.  If passing a an object, the property names must use the state name they correspond to.
  - <strong>component</strong>
    - The root Jumpsuit/React Component of your app
  - <strong>options</strong>

    ```javascript
    {
      root: 'app', // The id of the root element jumpsuit renders to. (For react-native, use `root`)
      useHash: false, // Set to true for react-router to use a hash-based browser history (usually required for hybrid apps eg. Ionic)
    }
    ```
- Single State Example
  ```javascript
  import { Render } from 'jumpsuit'

  import Counter from './containers/counter'
  import CounterState from './states/counter'

  Render(CounterState, <Counter/>)
  ```
- Combined State Example
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

### Goto <em>({ path, query, hash }, append, replaceHistory)</em>
Used to navigate programmatically throughout your app's routes
- Route Object
  - `path` - the desired pathname eg. `/posts/123/comments/`
  - `query` - a key-value object of any query params to be serialized into the url. eg `{ hello: 'world', foo: 'bar' }` will serialize to `?hello=world&foo=bar`
  - `hash` - any hash string you wish to place in the url. eg. `#section-1`
- `append` - When set to `true`, the current route will updated with any new values you pass, instead of being replaced. You may also set any query params to `null` or `undefined` to have them removed.
- `replaceHistory` - When set to `true`, the update will replace the current item in the browser history stack.

**Notes:**
- To remove a hash, you must replace the entire history (don't use the `append` option)

Examples:
```javascript
import { Goto } from 'jumpsuit'

// Navigate to a new route
Goto({
  path: '/posts/123/comments'
})
location === 'https://mysite.com/posts/123/comments'

// Add a query param (without replacing the path)
Goto({
  query: {
    user: 1234,
    tab: 'friends'
  }
}, true)
location === 'https://mysite.com/posts/123/comments?user=1234&tab=friends'

// Remove a query param (without replacing the path)
Goto({
  query: {
    tab: null
  }
}, true)
location === 'https://mysite.com/posts/123/comments?user=1234'

// Go to a completely new location
Goto({
  path: '/users'
  query: {
    search: 'myfriend'
  },
  hash: 'results'
})
location === 'https://mysite.com/users?search=myfriend#results'

// Replace all queries and hashes, but keep the path
Goto({
  query: {
    search: 'otherfriend'
  },
  hash: 'hashtastic'
})
location === 'https://mysite.com/users?search=otherfriend#hashtastic'
```
