import useField from '../hooks/useField'

export default function Login(props) {
  const username = useField()
  const password = useField('password')

  if (!props.show) return null

  function submit(e) {
    e.preventDefault()

    username.reset()
    password.reset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name <input {...username.props} />
        </div>
        <div>
          password <input {...password.props} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
