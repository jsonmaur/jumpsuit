module.exports = {
  browserify: {
    extensions: [".sss"],
    // rebundles: [{ match: "styles/**/*" }]
  },
  postcss: {
    parsers: [{
      name: "sugarss",
      match: "**/*.sss"
    }],
    plugins: [
      "postcss-simple-vars",
      "postcss-nested"
    ]
  }
}
