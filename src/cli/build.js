import path from 'path'
import fs from 'fs-promise'
import glob from 'glob'
import chokidar from 'chokidar'
import { debounce } from './utils/common'
import serve from './serve'
import { CONFIG } from './config'
import { outputLogo, pending, pendingDone, error } from './emit'
import { buildJs } from './compilers/javascript'
import { buildAsset } from './compilers/assets'
import { buildStyles } from './compilers/styles'

export default function (argv) {
  outputLogo({ indent: 1 })

  glob(`${CONFIG.sourceDir}/**/*`, { nodir: true }, (err, files) => {
    if (err) return error(err)
    files.forEach(async (file) => await handleEvent('add', file))
  })
}

export async function watch (argv) {
  outputLogo({ indent: 1 })

  const { sourceDir, outputDir } = CONFIG

  fs.emptyDirSync(outputDir)
  const watcher = chokidar.watch(sourceDir, {
    persistent: true,
    ignored: /[\/\\](\.)|node_modules|bower_components/
  })

  watcher.on('all', handleEvent)
  await serve(argv)
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
    return error(err, true)
  }

  /* output build complete and build time */
  if (--evtCount === 0) {
    isDone(Date.now() - buildTime)
  }
}
