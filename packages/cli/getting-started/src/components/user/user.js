export default (props) => {
  const message = props.loading ? 'searching...' : 'No User Found'
  const getFromUser = (key) => (props.user[key] || '(none)')

  const user = (
    <div>
      <div className='usr-avatar'>
        <img src={props.user.avatar_url} />
      </div>

      <table className='usr-info'>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{getFromUser('name')}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{getFromUser('email')}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{getFromUser('location')}</td>
          </tr>
          <tr>
            <td>Followers</td>
            <td>{getFromUser('followers')}</td>
          </tr>
          <tr>
            <td>Public Repos</td>
            <td>{getFromUser('public_repos')}</td>
          </tr>
          <tr>
            <td>Bio</td>
            <td>{getFromUser('bio')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  return (
    <div className='usr'>
      {props.user.id ? user : <div className='usr-none'>{message}</div>}
    </div>
  )
}
