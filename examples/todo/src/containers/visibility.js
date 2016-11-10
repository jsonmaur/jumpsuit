import FilterLink from 'containers/filterLink'

export default () => (
  <div className='Visibility'>
    <FilterLink filter='all'>All</FilterLink>
    {' '}
    <FilterLink filter='active'>Active</FilterLink>
    {' '}
    <FilterLink filter='completed'>Completed</FilterLink>
  </div>
)
