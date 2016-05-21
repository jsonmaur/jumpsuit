axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
css_pipeline = require 'css-pipeline'
browserify   = require 'roots-browserify'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    browserify(files: 'assets/js/main.coffee', out: 'js/bundle.js'),
    css_pipeline(files: 'assets/css/*.styl'),
  ]

  stylus:
    use: [rupture(), autoprefixer()]
    sourcemap: true

  jade:
    pretty: true

  open_browser: false
