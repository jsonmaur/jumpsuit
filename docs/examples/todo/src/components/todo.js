export default ({ completed, text, ...rest }) => (
  <li
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
    {...rest}
  >
    {text}
  </li>
)
