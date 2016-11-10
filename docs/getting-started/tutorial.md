# Your First Jumpsuit App: A Counter.

After you have installed Jumpsuit, you can immediately start building your app! Don't worry, we're going to show you how to build a simple counter app in just a few lines of code.

## Import Jumpsuit
To use Jumpsuit, you need to import a few of it's modules first.
```javascript
import {State, Actions, Component, Render} from 'jumpsuit'
```

## State
If we're building a counter, we need to keep track of our count somehow. To do that, we use jumpsuit's `State` method.
```javascript
const counterState = State(...)
```

Every state needs an `initial` starting point, and all we need to keep track of is the count. So let's keep it simple:
```javascript
const counterState = State({
  initial: { count: 0 }
})
```

This is great! However, we need a way to make our counter go up, so we are going to add an `action` to our state that tells it how to `increment`:
```javascript
const counterState = State({
  initial: { count: 0 },
  increment (state) {
    return { count: state.count + 1}
  }
})
```

An action is a function that takes the current `state`, and returns a new state. **It's very important, though, that we don't mutate the current state when we do this**. For example:
```javascript
increment (state) {
  state.count = state.count + 1 // NO! Mutation
  // or
  state.count++ // NO! Mutation
}
```
*This would be mutating the current state and in the long run could cause some high-power nuclear reactor to go into hyper-meltdown. Ha! No, the real reason for this is explained in detail here. In a nutshell, if we mutate our state, there is no way to trace our state changes back in time for debugging. We'll get into this more later, so for now, let's focus on our counter app!*

Let's add another action to `decrement` our count:
```javascript
const counterState = State({
  initial: { count: 0 },
  increment (state) {
    return { count: state.count + 1}
  },
  decrement (state) {
    return { count: state.count - 1}
  }
})
```

Perfect!  Our state is looking good.

## Components
What good is a counter if we can't see the count? Let's build a react component that will show us the current count.

To make a new component, call `Component` with a component config
```javascript
const App = Component({
  render () {
    return (
      <div>
        <h1>Count: 0</h1>
      </div>
    )
  }
})
```

That was easy! If you have never used React before, the `render` function can return HTML right inside your javascript while curly braces can be used anywhere in the HTML that javascript is needed.  For more information on how React works, start here.

Now let's add some buttons to change the count!
```javascript
const App = Component({
  render () {
    return (
      <div>
        <h1>Count: 0</h1>
        <button>Decrement</button>
        <button>Increment</button>
      </div>
    )
  }
})
```

## Subscribing Components to State
So far, we have our state and component built, but things aren't very dynamic just yet. We need to link the count from our state to our component, so when the state changes, the data in our component will update automatically.

Let's add a function after your component that returns any pieces from the state it may need.  This function passes you the global state object for your entire app, from which you can return what you need. Anything you return in an object will be placed on the component's `props` for use in the component.
```javascript
const App = Component({
  render () {
    return (
      <div>
        <h1>Count: 0</h1>
        <button>Decrement</button>
        <button>Increment</button>
      </div>
    )
  }
}, (state) => {
  return {
    count: state.counter.count // All we need is the `count` from `counter`
  }
})
```

Now the `count` is accessible via our components props. Let's put it in where our count should be!
```javascript
const App = Component({
  render () {
    return (
      <div>
        <h1>Count: {this.props.count}</h1>
        <button>Decrement</button>
        <button>Increment</button>
      </div>
    )
  }
}, (state) => {
  return {
    count: state.counter.count
  }
})
```

## Actions
Our component is done and is subscribed to our `counter` state, so really the only thing left to do is make our buttons work! To do this, we need to call the actions we previously created in our `counterState`. Luckily those actions can be called from anywhere in your app, via the global `Actions` list.

Let's add each action to it's corresponding button:
```javascript
const App = Component({
  render () {
    return (
      <div>
        <h1>Count: {this.props.count}</h1>
        <button onClick={() => Actions.decrement()}>Decrement</button>
        <button onClick={() => Actions.increment()}>Increment</button>
      </div>
    )
  }
}, (state) => {
  return {
    count: state.counter.count // All we need is the `count` from `counter`
  }
})
```

It's that simple.  Now when the "Increment" button is clicked, it will fire the global `increment` action for *every state we've created*.

## Rendering & Composing Global State
To render our app to the webpage, we need to call the `Render` method with 2 arguments:
- A *global state* object
- A `Component`

To make a global state, create a new object and place each of your `State`s on a unique property that makes sense:
```javascript
const globalState = {
  counter: counterState // counterState is the function returned from creating our counter state earlier
}
```
Remember the subscriber function in our component?
```javascript
(state) => {
  return {
    count: state.counter.count
  }
}
```
The `state` you are passed in a subscriber function is the `globalState` you just created!  Now it all makes sense. :)

Now let's call `Render`:
```javascript
Render(globalState, <App />)
```

Notice we pass our `App` component as JSX. You will receive an error if you pass your component without calling it as JSX.

*Note: If you don't have an `index.html` file in your project yet, you can always [copy ours](a).*

## All together now!

```javascript
import {State, Actions, Component, Render} from 'jumpsuit'

const counterState = State({
  initial: { count: 0 },
  increment (state) {
    return { count: state.count + 1}
  },
  decrement (state) {
    return { count: state.count - 1}
  }
})

const App = Component({
  render () {
    return (
      <div>
        <h1>Count: {this.props.count}</h1>
        <button onClick={() => Actions.decrement()}>Decrement</button>
        <button onClick={() => Actions.increment()}>Increment</button>
      </div>
    )
  }
}, (state) => {
  return {
    count: state.counter.count
  }
})

const globalState = {
  counter: counterState // counterState is the function returned from creating our counter state earlier
}

Render(globalState, <App />)
```

Victory! As you can see, it's quick and painless to be productive with Jumpsuit. This is only the beginning, too!

If you're ready to harness the full power of Jumpsuit, you should move on to one of our more sophisticated [examples](a). Great work!
