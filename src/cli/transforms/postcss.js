import path from 'path'
import tools from 'browserify-transform-tools'
import postcss from 'postcss'
import atImport from 'postcss-import'
import cssModules from 'postcss-modules'
import autoprefixer from 'autoprefixer'
// import crypto from 'crypto-extra'
import MemoryFS from 'memory-fs'
import Clean from 'clean-css'
import resolve from 'resolve'
import minimatch from 'minimatch'
import { getConfig } from '../config'
import { error } from '../emit'
import { addToDepTree } from '../deptree'

const fs = new MemoryFS()

const cssModulesPlugin = cssModules({
  getJSON (cssFilename, json) {
    fs.mkdirpSync(path.dirname(cssFilename))
    fs.writeFileSync(cssFilename, json)
  },
})

export default tools.makeStringTransform('postcss', {
  includeExtensions: ['.css', '.sss'],
}, async (content, opts, done) => {
  try {
    // const generatedName = path.resolve(`${crypto.randomString(5)}.css`)
    const options = { from: opts.file }

    const plugins = [
      atImport({
        path: [
          getConfig().source,
          path.dirname(opts.file),
          path.resolve(process.cwd(), 'node_modules')
        ],
        onImport: (files) => {
          files.forEach((f) => {
            if (f !== opts.file) {
              addToDepTree(f, opts.file)
            }
          })
        },
      }),
      autoprefixer,
    ]

    if (getConfig().cssModules) {
      plugins.push(cssModulesPlugin)
    }

    getConfig().postcss.parsers.forEach((p) => {
      if (typeof p === 'object') {
        if (minimatch(opts.file, p.match)) {
          options.parser = require(resolve.sync(p.name, { basedir: process.cwd() }))
        }
      } else if (typeof p === 'string') {
        options.parser = require(resolve.sync(p, { basedir: process.cwd() }))
      }
    })

    getConfig().postcss.plugins.forEach((p) => {
      if (typeof p === 'object') {
        plugins.push(require(resolve.sync(p.name, { basedir: process.cwd() }))(p.options || {}))
      } else {
        plugins.push(require(resolve.sync(p, { basedir: process.cwd() })))
      }
    })

    const res = await postcss(plugins).process(content, options)
    const css = new Clean().minify(res.css).styles

    let outputJs = `_INSERT_CSS_("${css}");`
    if (getConfig().cssModules) {
      const json = fs.readFileSync(opts.file)
      outputJs += `module.exports = ${JSON.stringify(json)};`
    }

    done(null, outputJs)
  } catch (err) {
    error(err)
  }
})
