import net from 'net'
import os from "os";

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
 * Only call a function once within a given timeframe,
 * no matter how many times it is actually called.
 * @param {function} fn - The functiont to call
 * @return {function} The debounced function to call
 */
export function debounce (fn, options = {}) {
  typeCheck(fn, 'function')
  options.wait = options.wait || 100

  let timeout
  return function () {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = null
      fn.apply(this, arguments)
    }, options.wait)
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

/**
 * Converts a win32 path double backslash path to forward slash path
 * for Windows compatibility
 */

function win32PathToPosix (path) {
  return path.replace(/\\/g, '/')
}

export function convertIfWin32Path (path) {
  if (os.platform() === 'win32') {
    return win32PathToPosix(path)
  }
  return path
}
