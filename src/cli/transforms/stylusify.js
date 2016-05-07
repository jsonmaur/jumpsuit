import tools from 'browserify-transform-tools'
import stylus from 'stylus'
import css from 'css'
import shortid from 'shortid'
// import insertCss from 'insert-css'

export default tools.makeStringTransform('stylusify', {
  includeExtensions: ['.styl'],
}, (content, opts, done) => {
  stylus(content).render((err, res) => {
    const parsed = css.parse(res)
    if (!parsed.stylesheet.rules) done(null)

    parsed.stylesheet.rules.forEach((rule, key) => {
      if (!rule.selectors) return

      console.log(parsed.stylesheet.rules[key])
      parsed.stylesheet.rules[key].selectors = rule.selectors.map((selector) => {
        if (selector.match(/\$/)) {
          throw new Error('css classes cannot have the "$" sign in them')
        }

        const generatedName = `${selector}$${shortid.generate()}`
        return generatedName
      })
    })

    // const modulerized = css.stringify(parsed).replace(/\n/g, '')
    // insertCss(${modulerized}, { prepend: true })
    const cmd = `var style = document.createElement('STYLE')
    document.getElementsByTagName('head')[0].appendChild(style)`

    if (err) done(err)
    // else done(null, `module.exports="${modulerized}"`)
    else done(null, cmd)
  })
})
