import path from 'path'
import fs from 'fs'

const defaults = {
  source: 'src',
  output: 'dist',
  entry: 'app.js',
  assets: 'assets',
  cssModules: true,

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

  browserify: {
    rebundles: [],
    extensions: ['.js', '.css'],
    transforms: [],
  },

  postcss: {
    plugins: [],
    parsers: [],
  },

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
  const pkgFile = path.resolve('package.json')
  const pkg = fs.existsSync(pkgFile) ? require(pkgFile) : {}

  const jmpFile = path.resolve('jumpsuit.config.js')
  const jmp = fs.existsSync(jmpFile) ? require(jmpFile) : {}

  const config = Object.assign({}, defaults, pkg.jumpsuit || {}, jmp)

  const needToResolve = ['source', 'output']
  needToResolve.forEach((key) => {
    config[key] = path.resolve(config[key])
  })

  config.entry = path.resolve(config.source, config.entry)
  config.indexFile.title = config.indexFile.title || pkg.name

  config.browserify = Object.assign({}, defaults.browserify, config.browserify)
  const combinedExts = defaults.browserify.extensions
    .concat(config.browserify.extensions)
  config.browserify.extensions = new Set(combinedExts)

  return config
}
