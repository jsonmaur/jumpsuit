import { Component } from 'jumpsuit'
import { getUser } from 'state/github'
import Input from 'components/input/input'
import User from 'components/user/user'

export default Component({
  render () {
    return (
      <div className='github'>
        <Input
          placeholder='Enter a GitHub username'
          value={this.props.search || ''}
          onChange={(e) => getUser(e.target.value)}
          />

        <User
          user={this.props.user}
          loading={this.props.loading}
          />
      </div>
    )
  }
}, (state) => ({
  loading: state.github.loading,
  user: state.github.user,
  search: state.github.search
}))
