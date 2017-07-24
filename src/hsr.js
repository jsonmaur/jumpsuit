import React from 'react'
import createReactClass from 'create-react-class'
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

  console.info('Saving state...')
  return Promise.resolve(hsrAPI.save(ts, state))
    .then((res) => {
      console.info('Saved state.')
      const params = query.parse(location.search)
      params.hsr = ts
      location.search = query.stringify(params)
    })
    .catch((err) => console.error(err))
}

export default createReactClass({
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

      console.info('Restoring state...')
      Promise.resolve(hsrAPI.restore(ts))
        .then((res) => {
          setDevToolsState(res)
          console.info('Restored state.')
        })
        .catch((err) => {
          console.error(err)
        })
        .then((res) => {
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
