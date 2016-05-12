import { Component } from 'jumpsuit'
import counterState from 'state/counter'
import Button from 'components/Button/Button'

export default Component({
  render() {
    return (
      <div>
        <h1>{ this.props.counter.count }</h1>

        <Button onClick={ this.increment }>Increment</Button>
        <Button onClick={ this.decrement }>Decrement</Button>
      </div>
    )
  },
  increment(){
    counterState.increment()
  },
  decrement(){
    counterState.decrement()
  },

}, (state) => ({
  counter: state.counter
}))
