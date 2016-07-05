import query from 'query-string'
import axios from 'axios'
import Component from './component'
import { getDevToolsState, setDevToolsState } from './devtools'

const { WebSocket, location, history } = window

export default Component({
  _hsrUrl () {
    const port = process.env.PORT
    const host = process.env.HOST

    return `http://${host}:${port}/__hsr__`
  },

  componentWillMount () {
    const client = new WebSocket(process.env.HSR_WS, 'echo-protocol')
    const maxHistory = process.env.HSR_MAX_HISTORY

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
        const state = limitStateHistory(getDevToolsState(), maxHistory)

        axios.post(this._hsrUrl(), { state }).then((res) => {
          const params = query.parse(location.search)
          params.hsr = res.data.ts

          location.search = query.stringify(params)
        }).catch((err) => console.error(err))
      }

      if (payload.type === 'css_refresh') {
        const allLinks = Array.from(document.getElementsByTagName('link'))
        const link = allLinks.find((e) => e.href.match(/app\.css(?:\?[0-9]+)?$/))

        const newLink = document.createElement('LINK')
        newLink.type = 'text/css'
        newLink.rel = 'stylesheet'
        newLink.href = link.href
          .replace(location.origin, '')
          .replace(/\?[0-9]+/, '') + `?${Date.now()}`

        document.head.appendChild(newLink)

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
  },
})


function limitStateHistory(state, maxHistory){
  if(maxHistory < 0){
    return state
  }

  state.currentStateIndex = Math.max(state.currentStateIndex - maxHistory - 2, 0)
  state.nextActionId = Math.max(state.nextActionId - maxHistory - 2, 1)
  state.stagedActionIds = state.stagedActionIds.slice(0, maxHistory)
  state.computedStates = state.computedStates.slice(state.computedStates.length - maxHistory)

  const newActions = {}
  let i = 0
  const actionIds = Object.keys(state.actionsById)
  actionIds.forEach((d) => {
    if (d >= actionIds.length - maxHistory){
      newActions[i++] = state.actionsById[d]
    }
  })
  state.actionsById = newActions
  newActions[0].action = {
    type: "@@INIT"
  }
  return state
}
