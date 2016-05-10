import query from 'query-string'
import axios from 'axios'
import Component from './component'
import { getDevToolsState, setDevToolsState } from './devtools'

const { WebSocket, location, history } = window

export default Component({
  _hsrWsPort: process.env.WS_PORT,
  _hsrUrl () {
    const port = process.env.PORT
    const host = process.env.HOST

    return `http://${host}:${port}/__hsr__`
  },

  componentWillMount () {
    const client = new WebSocket(`ws://0.0.0.0:${this._hsrWsPort}/`, 'echo-protocol')

    client.onclose = () => {
      console.warn('HSR connection closed')
    }

    client.onerror = () => {
      console.error('HSR connection error')
    }

    client.onopen = () => {
      const params = query.parse(location.search)

      if (params.hsr) {
        const ts = params.hsr
        delete params.hsr

        const newParams = query.stringify(params)
        const newUrl = location.href.substring(0, location.href.indexOf('?')) +
          (newParams.length ? `?${newParams}` : '')

        history.replaceState(null, null, newUrl)

        axios.get(`${this._hsrUrl()}/${ts}`).then((res) => {
          setDevToolsState(res.data)
          console.info('HSR data loaded')
        }).catch((err) => console.error(err))
      }

      console.info('HSR is ready')
    }

    client.onmessage = (e) => {
      const payload = JSON.parse(e.data)

      if (payload.type === 'refresh') {
        const state = getDevToolsState()

        axios.post(this._hsrUrl(), { state }).then((res) => {
          const params = query.parse(location.search)
          params.hsr = res.data.ts

          location.search = query.stringify(params)
        }).catch((err) => console.error(err))
      }

      if (payload.type === 'css_refresh') {
        const allLinks = Array.from(document.getElementsByTagName('link'))
        const link = allLinks.find((e) => e.href.match(/app\.css(?:\?[0-9]+)?$/))
        const href = link.href || '/app.css'

        const newLink = document.createElement('LINK')
        newLink.type = 'text/css'
        newLink.rel = 'stylesheet'
        newLink.href = href
          .replace(location.origin, '')
          .replace(/\?[0-9]+/, '') + `?${Date.now()}`

        document.head.appendChild(newLink)

        /* prevents flash of unstyled content */
        const varNames = 'sheet' in newLink ? ['sheet', 'cssRules'] : ['styleSheet', 'rules']
        const isLoaded = setInterval(() => {
          const a = varNames[0]
          const b = varNames[1]
          if (newLink[a] && newLink[a][b].length) {
            link && link.remove()
            clearInterval(isLoaded)
          }
        }, 10)
      }
    }
  },

  render () {
    return null
  },
})
