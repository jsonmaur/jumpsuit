import React from 'react'
import { Component, Actions, Link } from 'jumpsuit'
//
export default Component({
  render() {
    return (
      <div className='Counter'>
        <p>
          <Link to='/'>Go Home</Link>
        </p>
        <p>
          Count: {this.props.count}
        </p>
        <button onClick={() => Actions.decrement()}>-</button>
        <button onClick={() => Actions.increment()}>+</button>
      </div>
    )
  }
}, state => ({
  count: state.counter.count
}))
