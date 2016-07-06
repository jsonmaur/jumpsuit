module.exports = {
  prodSourceMaps: true,
  hsr: {
    maxAge: 4,
    shouldCatchErrors: true,
  },
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
