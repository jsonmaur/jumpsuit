import { State } from 'jumpsuit'

export default State({
  initial: {
    count: 0
  },
  decrement ({count, ...rest}) {
    return {
      ...rest,
      count: count - 1
    }
  },
  increment ({count, ...rest}) {
    return {
      ...rest,
      count: count + 2
    }
  }
})
