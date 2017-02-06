import React from 'react'
import query from 'query-string'
import hsrPouch from './hsrPouch'
import { store } from './createStore'

const setDevToolsState = state => {
  const { liftedStore } = store
  liftedStore.dispatch({
    type: 'IMPORT_STATE',
    nextLiftedState: state,
    noRecompute: true
  })
}

const getDevToolsState = () => {
  const { liftedStore } = store
  return liftedStore.getState()
}

const { location, history } = global

export let hsrAPI = hsrPouch

export const Rerender = () => {
  const ts = Date.now()
  const state = getDevToolsState()

  return Promise.resolve(hsrAPI.save(ts, state))
    .then((res) => {
      const params = query.parse(location.search)
      params.hsr = ts
      location.search = query.stringify(params)
    })
    .catch((err) => console.error(err))
}

export default React.createClass({
  getInitialState () {
    return {ready: false}
  },
  componentWillMount () {
    const params = query.parse(location.search)

    if (params.hsr) {
      const ts = params.hsr
      delete params.hsr

      const newParams = query.stringify(params)
      const newUrl = location.href.substring(0, location.href.indexOf('?')) + (newParams.length ? `?${newParams}` : '')
      history.replaceState(null, null, newUrl)

      Promise.resolve(hsrAPI.restore(ts))
        .then((res) => {
          setDevToolsState(res)
          console.info('Jumpsuit State Imported')
        })
        .catch((err) => {
          console.error(err)
        })
        .then((res) => {
          console.log('ready')
          this.setState({ready: true})
        })
    } else {
      this.setState({ready: true})
    }
  },
  render () {
    return this.state.ready ? this.props.children : <span />
  }
})
