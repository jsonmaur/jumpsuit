var fs = require('fs')
var path = require('path')
var stylus = require('stylus')
var nib = require('nib')

var stylusEntry = path.resolve('src/app.styl')

module.exports = {
  styles: {
    extensions: ['.css', '.styl'],
    action: buildStyles
  }
}

function buildStyles () {
  return new Promise((resolve, reject) => {
    stylus.render(fs.readFileSync(stylusEntry, 'utf8'), {
      'include css': true,
      'hoist atrules': true,
      compress: process.env.NODE_ENV === 'production',
      paths: [path.resolve('src')],
      use: nib()
    }, (err, css) => {
      if (err) reject(err)
      resolve(css)
    })
  })
}
