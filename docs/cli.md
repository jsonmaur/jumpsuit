# Build System & CLI

#### CLI Usage
```bash
Usage:

    jumpsuit <command> [options]

Commands:

    new [dir] [example]   start a new project at the specified
                          directory using an optional example template

    init [example]        start a new project in the current directory
                          using an optional example template

    watch                 build initial app and wait for file changes
    build                 create a production-ready version of app
    serve                 run the static server

Options:

    -p, --port            specify the port you want to run on
    -h, --host            specify the host you want to run on
    -v, --version         show jumpsuit version number
```

#### jumpsuit.config.js
An optional (but recommended) file at your project's root that can contain any of the following customizations:
```javascript
// Defaults
module.exports = {
  sourceDir: 'src', // Where source files are located
  outputDir: 'dist', // Where your built files will be placed
  assetsDir: 'assets', // Relative to your sourceDir, everything in here is placed in the root of your outputDir directory.

  assetsIgnoreExtensions: [], // If you don't want any files in your assets to copy over, ignore them here. eg ['*.scss']

  entry: 'app.js', // Jumpsuit starts building here, relative to your sourceDir

  prodSourceMaps: true, // Whether we should output sourcemaps in your production builds

  hsr: {
    maxAge: 1000, // Max age for Hot State Replacement
    shouldCatchErrors: true // Should Hot State replacement catch errors?
  },

  server: {
    host: 'localhost', // The host we serve on when watching
    port: 8000, // The port we serve on when watching
  },

  // More customizations available for browserify
  browserify: {
    extensions: ['.js'],
    rebundles: [],
    transforms: [],
    globals: {}
  },

  // Note: By default style hooks are disabled. Standard css files should be placed in your assetsDir

  // Style hooks (see Common CSS Configs for example usage)
  styles: {
    extensions: [], // Extensions of style files in your srcDir that will be watch and passed to the action below on change
    action: null // A debounced function that should return all of your css as a string (supports a promise). Debounced by default by 300ms
  }
}
```

## Common CSS Configs

#### Stylus
jumpsuit.config.js
```javascript
var fs = require('fs')
var path = require('path')
var stylus = require('stylus')
var nib = require('nib')

module.exports = {
  styles: {
    extensions: ['.css', '.styl'],
    action: buildStyles
  }
}
var stylusEntry = path.resolve('src/app.styl')

function buildStyles(){
  return new Promise((resolve, reject) => {
    stylus.render(fs.readFileSync(stylusEntry, 'utf8'), {
      'include css': true,
      'hoist atrules': true,
      compress: process.env.NODE_ENV === 'production',
      paths: [path.resolve('src')],
      use: nib()
    }, function(err, css){
      if (err) reject(err)
      resolve(css)
    });
  })
}
```

#### Sass
jumpsuit.config.js
```javascript
var fs = require('fs')
var path = require('path')
var sass = require('node-sass')

module.exports = {
  styles: {
    extensions: ['.css', '.scss'],
    action: buildStyles
  }
}
var sassEntry = path.resolve('src/app.scss')

function buildStyles(){
  return new Promise((resolve, reject) => {
    sass.render({
      file: sassEntry,
      outputStyle: 'compressed'
    }, function(err, res) {
      if (err){
        return reject(err)
      }
      resolve(res.css.toString())
    });
  })
}
```
