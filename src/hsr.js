// import React from 'react'
// import { connect } from 'react-redux'
import Container from './container'
import query from 'query-string'

export default Container({
  componentDidMount () {
    const client = new WebSocket('ws://0.0.0.0:7000/', 'echo-protocol')

    client.onopen = () => {
      const params = query.parse(location.search)
      const ts = params.hsr
      delete params.hsr

      const newParams = query.stringify(params)
      const newUrl = location.href.substring(0, location.href.indexOf('?'))
        + (newParams.length ? `?${newParams}` : '')

      if (ts) history.replaceState(null, null, newUrl)

      const payload = JSON.stringify({ type: 'requestState', ts })
      client.send(payload)
      console.log('Hot State Reload is ready!')
    }

    client.onerror = () => {
      console.log('HSR Connection Error!')
    }

    client.onmessage = (e) => {
      const payload = JSON.parse(e.data)

      if (payload.type === 'refresh') {

        const params = query.parse(location.search)
        const ts = Date.now()
        params.hsr = ts
        this.props.dispatch({ type: '_HSR_GET' })
        const state = this.props._state || {}
        delete state._state
        client.send(JSON.stringify({ type: 'saveState', ts, state }))
      }

      else if (payload.type === 'savedSaved') {
        const params = query.parse(location.search)
        params.hsr = payload.ts
        location.search = query.stringify(params)
      }

      else if (payload.type === 'loadState') {
        // console.log(payload.state)
        this.props.dispatch({ type: '_HSR_REPLACE', payload: payload.state })
      }

      else {
        console.log(payload)
      }
    }

    // client.onclose = () => {
    //   console.log('echo-protocol Client Closed')
    // }
  },

  render () {
    return <div />
  }
})
