import { Component } from 'jumpsuit'

export default Component({
  render () {
    return (
      <div>
        <h1>Hello Counter!</h1>
        { this.props.children }
      </div>
    )
  }
})
