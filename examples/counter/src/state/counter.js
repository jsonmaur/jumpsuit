import { State } from 'jumpsuit'

const state = State('counter', {
  initial: { count: 0 },

  increment (state, payload) {
    return { count: ++state.count }
  },

  decrement (state, payload) {
    return { count: --state.count }
  },
})

export default state

export function incrementAsync(amount){
  setTimeout(() => {
    state.increment(amount)
  }, 1000)
}
