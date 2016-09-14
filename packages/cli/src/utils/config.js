import path from 'path'
import fs from 'fs-promise'
import deepAssign from 'deep-assign'
import { warn } from './emit'
import {convertIfWin32Path} from '../utils/common'

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
    host: 'localhost',
    pushState: true
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

  const config = deepAssign({}, defaults, require(configFile))
  if (argv.hasOwnProperty('port')) {
    config.server.port = argv.port
    console.log("has port")
  }
  if (argv.hasOwnProperty('host')) {
    config.server.host = argv.host
    console.log("has host")
  }
  console.log("config =>", config )

  config.sourceDir = convertIfWin32Path(path.resolve(config.sourceDir))
  config.outputDir = convertIfWin32Path(path.resolve(config.outputDir))
  config.assetsDir = convertIfWin32Path(path.resolve(config.sourceDir, config.assetsDir))
  config.entry = convertIfWin32Path(path.resolve(config.sourceDir, config.entry))

  CONFIG = config
}
