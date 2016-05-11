import path from 'path'
import tools from 'browserify-transform-tools'
import postcss from 'postcss'
import atImport from 'postcss-import'
import cssModules from 'postcss-modules'
import autoprefixer from 'autoprefixer'
import crypto from 'crypto-extra'
import MemoryFS from 'memory-fs'
import Clean from 'clean-css'
import { getConfig } from '../config'

const fs = new MemoryFS()

export default tools.makeStringTransform('postcss', {
  includeExtensions: ['.css'],
}, (content, opts, done) => {
  const generatedName = path.resolve(`${crypto.randomString(5)}.css`)
  const options = { from: generatedName }

  const plugins = [
    atImport({ path: path.dirname(opts.file) }),
    autoprefixer,
  ]

  if (getConfig().cssModules) {
    plugins.push(cssModulesPlugin)
  }

  postcss(plugins)
    .process(content, options)
    .then((res) => {
      const css = new Clean().minify(res.css).styles
      let outputJs = `_INSERT_CSS("${css}");`

      if (getConfig().cssModules) {
        const json = fs.readFileSync(generatedName)
        outputJs += `module.exports = ${JSON.stringify(json)};`
      }

      done(null, outputJs)
    })
})

const cssModulesPlugin = cssModules({
  getJSON (cssFilename, json) {
    fs.mkdirpSync(path.dirname(cssFilename))
    fs.writeFileSync(cssFilename, json)
  }
})
