import path from 'path'
import _ from 'lodash'
import fs from 'fs-promise'

export let CONFIG
const defaults = {
  sourceDir: 'src',
  outputDir: 'dist',
  assetsDir: 'assets', // relative to sourceDir

  entry: 'app.js', // relative to sourceDir

  prodSourceMaps: true,

  hsr: {
    maxAge: 1000,
    shouldCatchErrors: true
  },

  server: {
    port: 8000,
    host: 'localhost',
  },

  browserify: {
    extensions: ['.js'],
    rebundles: [],
    transforms: [],
    globals: {}
  },

  postcss: {
    extensions: ['.css'],
    plugins: [],
    parsers: [],
    modules: true,
  },

  // indexFile: {
    // template: 'assets/index.html', // auto-generates if undefined
    // title: null,
    // meta: {}, // key: value
    // entry: 'div#app',
  // },

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

export default async function (argv) {
  const configFile = path.resolve(argv.c || argv.config || 'jumpsuit.config.js')

  if (!await fs.exists(configFile)) {
    throw new Error(`"${path.basename(configFile)}" doesn't exist here!`)
  }

  const config = _.defaultsDeep(require(configFile), defaults)

  config.sourceDir = path.resolve(config.sourceDir)
  config.outputDir = path.resolve(config.outputDir)
  config.assetsDir = path.resolve(config.sourceDir, config.assetsDir)
  config.entry = path.resolve(config.sourceDir, config.entry)

  config.browserify.extensions = _.uniq(config.browserify.extensions
    .concat(defaults.browserify.extensions)
    /* so we rebundle for postcss files */
    .concat(config.postcss.extensions))

  config.postcss.extensions = _.uniq(config.postcss.extensions
    .concat(defaults.postcss.extensions))

  CONFIG = config
}
