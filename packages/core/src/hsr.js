import query from 'query-string'
import axios from 'axios'
import Component from './component'
import { getDevToolsState, setDevToolsState } from './devtools'

const { WebSocket, location, history } = global

export default Component({
  _hsrUrl () {
    const port = process.env.PORT
    const host = process.env.HOST

    return `http://${host}:${port}/__hsr__`
  },

  componentWillMount () {
    const client = new WebSocket(process.env.HSR_WS, 'echo-protocol')

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
          // We need to set the state outside of the axios stack
          // so potential stack traces are accurate
          setTimeout(() => {
            setDevToolsState(res.data)
          }, 1)
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

      if (payload.type === 'styles') {
        const allLinks = Array.from(document.getElementsByTagName('link'))
        const urlReg = new RegExp(`${escapeRegExp(payload.url)}(?:\\?[0-9]+)?$`, 'g')
        const link = allLinks.find((e) => e.href.match(urlReg))

        const newLink = document.createElement('link')
        newLink.type = 'text/css'
        newLink.rel = 'stylesheet'
        newLink.href = link.href
          .replace(location.origin, '')
          .replace(/\?[0-9]+/, '') + `?${Date.now()}`

        document.head.appendChild(newLink)

        console.info('Styles Updated')

        /* prevents flash of unstyled content */
        const vars = 'sheet' in newLink ? ['sheet', 'cssRules'] : ['styleSheet', 'rules']
        const isLoaded = setInterval(() => {
          if (newLink[vars[0]] && newLink[vars[0]][vars[1]].length) {
            link && link.remove()
            clearInterval(isLoaded)
          }
        }, 10)
      }
    }
  },

  render () {
    return null
  }
})

function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}
