module.exports = {
  prodSourceMaps: true,
  hsr: {
    maxHistory: -1
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
