import {
  Container,
  Routes,
  Render,
} from 'jumpsuit'

const App = Container({
  render() {
    return (
      <div>
        <h1 is-open={this.state.layout.isOpen} onClick={this.openMenu}>App</h1>
      </div>
    )
  },
  openMenu(){
    this.actions.layout.openMenu(true, false)
  },
}, ['layout', 'user'])

Routes((
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />

    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />

    <Redirect from="sites" to="/" />
    <Route path="sites/:siteId" component={Editor}>
      <IndexRedirect to="header" />
      <Route path="header" name="header" component={EditorHeader} />
      <Route path="gallery" component={EditorGallery} />
      <Route path="about" component={EditorAbout} />
      <Route path="contact" component={EditorContact} />
      <Route path="seo" component={EditorSeo} />
      <Route path="publish" component={EditorPublish} />
      <Route path="settings" component={EditorSettings} />
    </Route>

    <Route path="account" component={Account} />

    <Route path="help" component={Help} />

    <Route path="*" component={NotFound} />
  </Route>
))


Render()
