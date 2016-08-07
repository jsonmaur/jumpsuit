import { Component } from 'jumpsuit'

export default Component({
  render () {
    return (
      <div className='container'>
        <section>
          <div className='logo'>
            <img src='/logo.svg' />
          </div>

          <h1 className='title'>Welcome to Jumpsuit</h1>
          <h4 className='subtitle'>GETTING STARTED EXAMPLE</h4>
        </section>

        <section>
          {this.props.children}
        </section>
      </div>
    )
  }
})
