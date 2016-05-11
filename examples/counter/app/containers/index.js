import { Component } from 'jumpsuit'
import globalStyles from '../styles/app.css'
import styles from './index.css'
console.log(globalStyles)

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
