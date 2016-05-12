import { Component } from 'jumpsuit'
import counterState from 'state/counter'

export default Component({
  render() {
    return (
      <div>
        <h1>{ this.props.counter.count }</h1>

        <button onClick={ this.increment }>Increment</button>
        <button onClick={ this.decrement }>Decrement</button>
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
