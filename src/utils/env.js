export function isDev () {
  return process.env.NODE_ENV === 'development'
}

export function isDevTools () {
  return Boolean(window.devToolsExtension)
}
