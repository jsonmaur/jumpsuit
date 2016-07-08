import FilterLink from 'containers/filterLink'

export default () => (
  <div className="Visibility">
    Show:
    <span> </span>
    <FilterLink filter="all">All</FilterLink>
    <span> </span>
    <FilterLink filter="active">Active</FilterLink>
    <span> </span>
    <FilterLink filter="completed">Completed</FilterLink>
  </div>
)
