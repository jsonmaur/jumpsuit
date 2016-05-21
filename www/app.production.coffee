axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
css_pipeline = require 'css-pipeline'
browserify   = require 'roots-browserify'

module.exports =
  ignores: ['README.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf', 'zab.json']

  extensions: [
    browserify(files: 'assets/js/main.coffee', out: 'js/bundle.js', minify: true, hash: false),
    css_pipeline(files: 'assets/css/*.styl', out: 'css/build.css', minify: true, hash: false)
  ]

  stylus:
    use: [rupture(), autoprefixer()]
