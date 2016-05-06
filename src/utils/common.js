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
