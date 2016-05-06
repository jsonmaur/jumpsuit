import http from 'http'
import websocket from 'websocket'
import { getFreePort } from '../utils/common'

export const connections = new Set()

const SAVED_STATES = {}
export default async function () {
  // const port = await getFreePort()
  const port = 7000

  const server = http.createServer()
  server.listen(port)

  const ws = new websocket.server({
    httpServer: server,
    autoAcceptConnections: false,
  })

  // ws.on('request', (req) => {
  //   const conn = req.accept('echo-protocol', req.origin)
  //   conn.send('welcome')
  //
  //   conn.on('message', (msg) => {
  //     // console.log('Received Message: ' + msg.utf8Data)
  //     conn.sendUTF(msg.utf8Data)
  //   })
  // })

  // return new Promise((resolve, reject) => {
    ws.on('request', (req) => {
      const conn = req.accept('echo-protocol', req.origin)
      connections.add(conn)

      // console.log(Object.keys(SAVED_STATES))
      conn.send(JSON.stringify(Object.keys(SAVED_STATES)))

      conn.on('message', (msg) => {
        const payload = JSON.parse(msg.utf8Data)

        if (payload.type === 'saveState') {
          SAVED_STATES[payload.ts] = payload.state
          conn.send(JSON.stringify({ type: 'savedSaved', ts: payload.ts }))
        }

        else if (payload.type === 'requestState') {
          if (SAVED_STATES[payload.ts]) {
            conn.send(JSON.stringify({ type: 'loadState', state: SAVED_STATES[payload.ts] }))
          }
        }
      })

      conn.on('close', (code) => connections.delete(conn))

      // resolve(conn)
    })
  // })
}
