import { Component } from 'jumpsuit'
import styles from './index.css'

export default Component({
  render () {
    return (
      <div>
        <h1 className={ styles.title }>Hello World</h1>
        { this.props.children }
      </div>
    )
  }
})
