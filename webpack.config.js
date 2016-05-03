var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    path.resolve(__dirname, 'node_modules/webpack-dev-server/client?http://localhost:3000'),
    path.resolve(__dirname, 'node_modules/webpack/hot/only-dev-server'),
    path.resolve(process.cwd(), 'src/app')
  ],
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolveLoader: {
    modulesDirectories: [path.resolve(__dirname, 'node_modules')]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [
        path.resolve(__dirname, 'node_modules/react-hot-loader'),
        // path.resolve(__dirname, 'node_modules/babel-loader')
        'babel?presets[]=es2015&presets[]=react'
      ],
      include: path.join(process.cwd(), 'src')
    }]
  }
}
