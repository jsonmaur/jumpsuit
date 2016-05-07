import net from 'net'

/**
 * Gets a variable type without using typeof.
 * @param {any} value - The value to analyze
 * @return {string} The var type
 */
export function getType (value) {
  return ({}).toString.call(value).match(/\s([^\]]+)/)[1].toLowerCase()
}

/**
 * Checks the data type of a value and throws type errors.
 * @param {any} value - The value to check type on
 * @param {string|array} type - The type(s) to use
 * @return {boolean} Whether the type check passed
 */
export function typeCheck (value, types, options = {}) {
  if (options.throw === undefined) options.throw = true

  const typesType = getType(types)
  if (!types || !typesType.match(/string|array/)) {
    throw new Error('typeCheck type param must be a string or array')
  }

  if (typesType !== 'array') types = [types]

  const valueType = getType(value)
  const valueStr = valueType === 'string' ? `"${value}"` : value
  const typeStr = types.length > 1 ? `{${types.join(', ')}}` : types[0]

  if (value && types.indexOf(valueType) === -1) {
    const error = `value ${valueStr} should be a ${typeStr} but got ${valueType}`

    if (options.throw) throw new TypeError(error)
    return false
  }

  return true
}

/**
 * Gets a value in a deep object with the path defined as a string.
 * @param {object} obj - The object to search in
 * @param {string} path - The path to search
 * @return {any} The value found at the path
 */
export function deepGet (obj = {}, path = '') {
  typeCheck(obj, 'object')
  typeCheck(path, 'string')

  const paths = path.split('.')

  let current = obj
  for (const i in paths) {
    if (current[paths[i]] === undefined) return
    current = current[paths[i]]
  }

  return current
}

/**
 * Only call a function once within a given timeframe,
 * no matter how many times it is actually called.
 * @param {function} fn - The functiont to call
 * @param {integer} wait - The limit time (in ms)
 * @return {function} The debounced function to call
 */
export function debounce (fn, wait = 100) {
  typeCheck(fn, 'function')

  let timeout
  return function () {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = null
      fn.apply(this, arguments)
    }, wait)

    if (!timeout) fn.apply(this, arguments)
  }
}

/**
 * Returns a port that is free on the host machine.
 * @return {integer} A free port
 */
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
