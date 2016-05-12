import { Component } from 'jumpsuit'
import styles from './Button.css'

export default Component({
  render () {
    return (
      <button
        className={ styles.primary }
        { ...this.props }>
        { this.props.children }
      </button>
    )
  }
})
