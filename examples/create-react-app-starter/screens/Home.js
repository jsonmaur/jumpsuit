import React from 'react'
import { Link } from 'jumpsuit'
//
export default React.createClass({
  render() {
    return (
      <div className='Welcome'>
        <p>
          To get started, edit files in <code>src</code> and save to reload.
        </p>
        <Link to='/counter'>Go To Counter</Link>
      </div>
    )
  }
})
