module.exports = {
  prodSourceMaps: true,
  hsr: {
    maxAge: 2,
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
