import query from 'query-string'
import axios from 'axios'
import Container from './container'
import { getDevToolsState, setDevToolsState } from './devtools'

const { WebSocket, location, history } = window

export default Container({
  port: process.env.PORT,
  host: process.env.HOST,
  wsPort: process.env.WS_PORT,

  componentWillMount () {
    const client = new WebSocket(`ws://0.0.0.0:${this.wsPort}/`, 'echo-protocol')

    client.onopen = () => {
      const params = query.parse(location.search)

      if (params.hsr) {
        const ts = params.hsr
        delete params.hsr

        const newParams = query.stringify(params)
        const newUrl = location.href.substring(0, location.href.indexOf('?')) +
          (newParams.length ? `?${newParams}` : '')

        history.replaceState(null, null, newUrl)
        axios.get(`http://${this.host}:${this.port}/__hsr__/${ts}`).then((res) => {
          setDevToolsState(res.data)
          console.log('HSR data loaded!')
        }).catch((err) => console.log(err))
      }

      // const payload = JSON.stringify({ type: 'requestState', ts })
      // client.send(payload)
      console.log('HSR is ready!')
    }

    client.onerror = () => {
      console.log('HSR Connection Error!')
    }

    client.onmessage = (e) => {
      const payload = JSON.parse(e.data)

      if (payload.type === 'refresh') {
        // const params = query.parse(location.search)
        // const ts = Date.now()
        // params.hsr = ts

        const state = getDevToolsState()
        axios.post(`http://${this.host}:${this.port}/__hsr__`, { state }).then((res) => {
          const params = query.parse(location.search)
          params.hsr = res.data.ts
          location.search = query.stringify(params)
        }).catch((err) => console.log(err))

        // client.send(JSON.stringify({ type: 'saveState', ts, state }))
      // } else if (payload.type === 'savedSaved') {
        // const params = query.parse(location.search)
        // params.hsr = payload.ts
        // location.search = query.stringify(params)
      // } else if (payload.type === 'loadState') {
        // setDevToolsState(payload.state)
      // } else {
        // console.log(payload)
      }

      if (payload.type === 'cssRefresh'){
        axios.get(`/app.css`).then((res) => {
          const existingCssStyles = document.getElementById('__HMR_STYLES__')
          existingCssStyles && existingCssStyles.remove()
          const newCssStyles = document.createElement('style')
          newCssStyles.id = "__HMR_STYLES__"
          newCssStyles.innerHTML = res.data
          document.head.appendChild(newCssStyles)
        }).catch((err) => console.log(err))
      }
    }

    // client.onclose = () => {
    //   console.log('echo-protocol Client Closed')
    // }
  },

  render () {
    return <div />
  },
})
