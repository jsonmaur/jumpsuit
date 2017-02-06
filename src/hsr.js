import React from 'react'
import query from 'query-string'
import hsrAPI from './hsrPersistent'
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

export const Rerender = () => {
  const ts = Date.now()
  hsrAPI.save(ts, getDevToolsState())
  const params = query.parse(location.search)
  params.hsr = ts
  location.search = query.stringify(params)
}

export default React.createClass({
  componentWillMount () {
    const params = query.parse(location.search)

    if (params.hsr) {
      const ts = params.hsr
      delete params.hsr

      const newParams = query.stringify(params)
      const newUrl = location.href.substring(0, location.href.indexOf('?')) + (newParams.length ? `?${newParams}` : '')
      history.replaceState(null, null, newUrl)
      setDevToolsState(hsrAPI.restore(ts))
      console.info("Jumpsuit State Imported")
    }
  },
  render () {
    return this.props.children;
  }
})
