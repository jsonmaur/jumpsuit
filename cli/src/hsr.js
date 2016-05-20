import http from 'http'
import websocket from 'websocket'
import { getFreePort } from './utils/common'
import { error } from './emit'

export const connections = new Set()

export default async function () {
  const port = process.env.WS_PORT = await getFreePort()

  const server = http.createServer()
  server.listen(port, error)

  const WsServer = websocket.server
  const ws = new WsServer({
    httpServer: server,
    autoAcceptConnections: false,
  })

  ws.on('request', (req) => {
    const conn = req.accept('echo-protocol', req.origin)

    connections.add(conn)
    conn.on('close', () => connections.delete(conn))
  })
}

export function triggerRefresh (type = 'refresh') {
  const payload = JSON.stringify({ type })
  connections.forEach((c) => c.send(payload))
}
