import path from 'path'
import fs from 'fs-promise'
import glob from 'glob'
import chokidar from 'chokidar'
import serve from './serve'
import { debounce } from '../utils/common'
import { CONFIG } from '../utils/config'
import { outputLogo, pending, pendingDone, error } from '../utils/emit'
import { buildJs } from '../compilers/javascript'
import { buildAsset } from '../compilers/assets'
import { buildStyles } from '../compilers/styles'

export default async function (argv) {
  outputLogo()
  const files = glob.sync(`${CONFIG.sourceDir}/**/*`, { nodir: true })
  await Promise.all(files.map((file) => handleEvent('add', file)))
  if (process.env.NODE_ENV === 'production') {
    require('./prerender').default(argv)
  }
}

export async function watch (argv) {
  outputLogo()
  const { sourceDir, outputDir } = CONFIG

  fs.emptyDirSync(outputDir)
  const watcher = chokidar.watch(sourceDir, {
    persistent: true,
    ignored: /[\/\\](\.)|node_modules|bower_components/
  })

  watcher.on('all', handleEvent)
  await serve(argv, true)
}

let evtCount = 0
let buildTime
const isBuilding = debounce(() => pending('building'))
const isDone = debounce((time) => pendingDone(time))

export async function handleEvent (evt, file) {
  /* skip dir events */
  if (evt.match(/Dir$/)) return

  /* output build message and start timer */
  if (++evtCount === 1) {
    buildTime = Date.now()
    isBuilding()
  }

  try {
    /* determine action based on file extension */
    const ext = path.extname(file)
    if (CONFIG.browserify.extensions.indexOf(ext) > -1) {
      await buildJs(evt, file)
    } else if (CONFIG.styles && CONFIG.styles.extensions.indexOf(ext) > -1) {
      await buildStyles(evt, file)
    } else if (CONFIG.assetsIgnoreExtensions.indexOf(ext) === -1) {
      await buildAsset(evt, file)
    }
  } catch (err) {
    evtCount--
    error(err, true)
    if (process.env.NODE_ENV === 'production') {
      throw err
    }
  }

  /* output build complete and build time */
  if (--evtCount === 0) {
    isDone(Date.now() - buildTime)
  }
}
