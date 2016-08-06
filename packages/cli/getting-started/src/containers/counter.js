import { Component } from 'jumpsuit'
import Counter, { incrementAsync } from 'state/counter'
import Button from 'components/Button/Button'

export default Component({
  render () {
    return (
      <div>
        <h1>{this.props.counter.count}</h1>
        <Button onClick={Counter.increment}>Increment</Button>
        <Button onClick={Counter.decrement}>Decrement</Button>
        <br /> <br />
        <Button onClick={incrementAsync}>Increment Async</Button>
      </div>
    )
  }
}, (state) => ({
  counter: state.counter
}))
