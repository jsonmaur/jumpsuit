import http from 'http'
import websocket from 'websocket'
import bodyParser from 'body-parser'
import { getFreePort } from './common'

const SAVED_STATES = {}
const CONNECTIONS = new Set()

export async function enableHsr (app) {
  app.use(bodyParser.json({ limit: '100mb' }))

  app.post('/__hsr__', (req, res, next) => {
    const { state } = req.body
    const ts = Date.now()

    SAVED_STATES[ts] = state
    res.json({ ts })
  })

  app.get('/__hsr__/:ts', (req, res, next) => {
    const state = SAVED_STATES[req.params.ts]

    if (!state) res.send()
    else res.json(state)
  })

  return await startHsrWebsocket()
}

export async function startHsrWebsocket () {
  const port = await getFreePort()

  const server = http.createServer()
  server.listen(port, (err) => {
    if (err) return Promise.reject(err)
  })

  const WsServer = websocket.server
  const ws = new WsServer({
    httpServer: server,
    autoAcceptConnections: false
  })

  ws.on('request', (req) => {
    const conn = req.accept('echo-protocol', req.origin)

    CONNECTIONS.add(conn)
    conn.on('close', () => CONNECTIONS.delete(conn))
  })

  const uri = `ws://localhost:${port}`
  const send = (msg) => {
    const payload = JSON.stringify(msg)
    CONNECTIONS.forEach((c) => c.send(payload))
  }

  return { uri, send }
}
