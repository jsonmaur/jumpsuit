import { Component } from 'jumpsuit'

export default Component({
  render () {
    return (
      <div>
        <h1>Hello Tanner</h1>
        { this.props.children }
      </div>
    )
  }
})
