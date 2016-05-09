import path from 'path'

export function getConfig () {
  const pkg = path.resolve('package.json')
  return require(pkg).jumpsuit
}
