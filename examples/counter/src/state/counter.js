import { State } from 'jumpsuit'

const duck = State('counter', {
  initial: { count: 0 },

  increment (state, payload) {
    return { count: ++state.count }
  },

  decrement (state, payload) {
    return { count: --state.count }
  },
})

export default duck

export function increment () {
  duck.dispatch(duck.increment)
}

export function decrement () {
  duck.dispatch(duck.decrement)
}
