import http from 'http'
import websocket from 'websocket'
// import { getFreePort } from '../utils/common'
import { error } from './emit'

export const connections = new Set()

const SAVED_STATES = {}
export default async function () {
  // const port = await getFreePort()
  const port = 7000

  const server = http.createServer()
  server.listen(port, (err) => {
    if (err) error(err)
  })

  const WsServer = websocket.server
  const ws = new WsServer({
    httpServer: server,
    autoAcceptConnections: false,
  })

  ws.on('request', (req) => {
    const conn = req.accept('echo-protocol', req.origin)
    connections.add(conn)

    conn.send(JSON.stringify(Object.keys(SAVED_STATES)))

    conn.on('message', (msg) => {
      const payload = JSON.parse(msg.utf8Data)

      if (payload.type === 'saveState') {
        // TODO: only add if state has actually changed (check a hash)
        SAVED_STATES[payload.ts] = payload.state
        conn.send(JSON.stringify({ type: 'savedSaved', ts: payload.ts }))
      } else if (payload.type === 'requestState') {
        if (SAVED_STATES[payload.ts]) {
          conn.send(JSON.stringify({ type: 'loadState', state: SAVED_STATES[payload.ts] }))
        }
      }
    })

    conn.on('close', (code) => {
      console.log('closing web socket', code)
      connections.delete(conn)
    })
  })
}
