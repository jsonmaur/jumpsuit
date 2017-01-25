# Sandboxed States

Consider the following 2 states:
```javascript
import { State } from 'jumpsuit'

const counterState = State({
  initial: { count: 0 },
  increment (state) {
    return { count: state.count + 1}
  },
  decrement (state) {
    return { count: state.count - 1}
  }
})

// somewhere in another state...

const threatLevelState = State({
  initial: { level: 0 },
  increment (state) {
    return { count: state.count + 1}
  },
  decrement (state) {
    return { count: state.count - 1}
  }
})
```

We may have just created an unwanted side-effect by colliding on our action names! This means that calling `Actions.increment()` would trigger both `increment` actions on both of these states that have nothing in common! Not cool.

A dirty fix would be to prefix each action name like so: `counter_increment`, `threatLevel_increment`. But, this gets annoying and unmanageable really quick.

Sandboxed States solves this problem with some clever name-spacing :)

```javascript
import { State, Actions } from 'jumpsuit'

const counterState = State('counter', {
  initial: { count: 0 },
  increment (state) {
    return { count: state.count + 1}
  },
  decrement (state) {
    return { count: state.count - 1}
  }
})

// somewhere in another state...

const threatLevelState = State('threatLevel', {
  initial: { level: 0 },
  increment (state) {
    return { count: state.count + 1}
  },
  decrement (state) {
    return { count: state.count - 1}
  }
})

Actions.counter.increment()
Actions.threatLevel.increment()
// or
counterState.increment()
threatLevel.increment()
```
Amazing!  We just *sandboxed* our states! Now their actions are isolated from each other and won't collide on actions like `Actions.increment()`

### Using Sandboxed States
As you might have seen in the above example, sandboxed states get their own action list located at `Actions[sandboxName]`.  This keeps in line with easily being able to access all of the available actions in your app from one place.

So, to call the `increment` action on a sandboxed state called `myCounter`, you could do one of the following:
- Call it via the global Actions object: `Actions.myCounter.increment()`
- Call it via the reducer itself: `myCounter.increment()`

Sandboxed states are awesome, and help immensely when organizing your state and associated actions :) 
