import { Component } from 'jumpsuit'
import { increment, decrement } from 'state/counter'
import Button from 'components/Button/Button'

export default Component({
  render() {
    return (
      <div>
        <h1>{ this.props.counter.count }</h1>

        <Button onClick={ increment }>Increment</Button>
        <Button onClick={ decrement }>Decrement</Button>
      </div>
    )
  },
}, (state) => ({
  counter: state.counter
}))
