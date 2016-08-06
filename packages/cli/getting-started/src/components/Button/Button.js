import { Component } from 'jumpsuit'

export default Component({
  render () {
    return (
      <button
        {...this.props}>
        {this.props.children}
      </button>
    )
  }
})
