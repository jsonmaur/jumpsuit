import path from 'path'
import tools from 'browserify-transform-tools'
import postcss from 'postcss'
import postcssImport from 'postcss-import'
import postcssModules from 'postcss-modules'
import resolve from 'resolve'
import minimatch from 'minimatch'
import MemoryFS from 'memory-fs'
import Clean from 'clean-css'
import { CONFIG } from '../config'
import { addToDepTree } from '../deptree'

const fs = new MemoryFS()

const cssModulesPlugin = postcssModules({
  getJSON (cssFilename, json) {
    fs.mkdirpSync(path.dirname(cssFilename))
    fs.writeFileSync(cssFilename, json)
  }
})

export default tools.makeStringTransform('postcss', {
  includeExtensions: CONFIG.postcss.extensions
}, async (content, opts, done) => {
  try {
    const options = { from: opts.file }

    const plugins = [
      postcssImport({
        path: [
          CONFIG.sourceDir,
          path.dirname(opts.file),
          path.resolve(process.cwd(), 'node_modules')
        ],
        onImport: (files) => {
          files.forEach((f) => {
            if (f !== opts.file) addToDepTree(f, opts.file)
          })
        }
      })
    ]

    if (CONFIG.postcss.modules) {
      plugins.push(cssModulesPlugin)
    }

    CONFIG.postcss.parsers.forEach((p) => {
      if (typeof p === 'object') {
        if (minimatch(opts.file, p.match)) {
          options.parser = require(resolve.sync(p.name, { basedir: process.cwd() }))
        }
      } else if (typeof p === 'string') {
        options.parser = require(resolve.sync(p, { basedir: process.cwd() }))
      }
    })

    CONFIG.postcss.plugins.forEach((p) => {
      if (typeof p === 'object') {
        plugins.push(require(resolve.sync(p.name, { basedir: process.cwd() }))(p.options || {}))
      } else {
        plugins.push(require(resolve.sync(p, { basedir: process.cwd() })))
      }
    })

    const res = await postcss(plugins).process(content, options)
    const css = new Clean().minify(res.css).styles

    let outputJs = `_INSERT_CSS_("${css}");`
    if (CONFIG.postcss.modules) {
      const json = fs.readFileSync(opts.file)
      outputJs += `module.exports = ${JSON.stringify(json)};`
    }

    done(null, outputJs)
  } catch (err) {
    done(err)
  }
})
