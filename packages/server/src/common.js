import net from 'net'

export function getFreePort () {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(0, (err) => {
      if (err) return reject(err)

      const port = server.address().port
      server.close(() => resolve(port))
    })
  })
}
