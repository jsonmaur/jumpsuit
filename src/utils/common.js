import net from 'net'

export function debounce (func, wait) {
  let timeout

  return function () {
    const context = this
    const args = arguments

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      func.apply(context, args)
    }, wait)

    if (!timeout) func.apply(context, args)
  }
}

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
