import path from 'path'
import _ from 'lodash'
import fs from 'fs-promise'
import { warn } from './emit'

export let CONFIG
const defaults = {
  sourceDir: 'src',
  outputDir: 'dist',
  assetsDir: 'assets', // relative to sourceDir

  assetsIgnoreExtensions: [],

  entry: 'app.js', // relative to sourceDir

  prodSourceMaps: true,

  hsr: {
    maxAge: 1000,
    shouldCatchErrors: true
  },

  server: {
    port: 8000,
    host: 'localhost'
  },

  browserify: {
    extensions: ['.js'],
    rebundles: [],
    transforms: [],
    globals: {}
  },

  styles: null // eg {extensions: ['.css', '.styl'], action: (file, evt) => {return Promise.resolve(css)}}
}

export default async function (argv) {
  const configFile = path.resolve(argv.c || argv.config || 'jumpsuit.config.js')

  if (!await fs.exists(configFile)) {
    warn(`"${path.basename(configFile)}" doesn't exist. We recommend creating one!`)
    return
  }

  const config = _.defaultsDeep(require(configFile), defaults)

  config.sourceDir = path.resolve(config.sourceDir)
  config.outputDir = path.resolve(config.outputDir)
  config.assetsDir = path.resolve(config.sourceDir, config.assetsDir)
  config.entry = path.resolve(config.sourceDir, config.entry)

  CONFIG = config
}
