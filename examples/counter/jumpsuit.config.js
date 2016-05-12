module.exports = {
  postcss: {
    parsers: [{
      name: 'sugarss',
      match: '**/*.sss'
    }],
    plugins: [
      'postcss-simple-vars',
      'postcss-nested'
    ]
  }
}
