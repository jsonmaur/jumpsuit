import path from 'path'

const defaults = {
  source: 'src',
  output: 'dist',
  entry: 'app.js',
  entryStyl: 'app.styl', // wont be needed once css modules work
  assets: 'assets',

  indexFile: {
    // template: 'assets/index.html', // auto-generates if undefined
    title: null,
    // meta: {}, // key: value
    // entry: 'div#app',
  },

  server: {
    port: 8000,
    host: 'localhost',
    // other zab server options
  },

  // transforms: [],
  // build: {
  //   development: {
  //     sourceMaps: true, // only internal
  //   },
  //   production: {
  //     sourceMaps: false, // only external
  //     minify: true,
  //     fingerprint: true,
  //     prefix: '/',
  //   },
  // },
}

export function getConfig () {
  const pkg = require(path.resolve('package.json'))
  const config = Object.assign({}, defaults, pkg.jumpsuit)

  const needToResolve = ['source', 'output']
  needToResolve.forEach((key) => {
    config[key] = path.resolve(config[key])
  })

  config.entry = path.resolve(config.source, config.entry)
  config.entryStyl = path.resolve(config.source, config.entryStyl)
  config.indexFile.title = config.indexFile.title || pkg.name

  return config
}
