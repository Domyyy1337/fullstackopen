import { useMutation } from '@apollo/client/react'
import useField from '../hooks/useField'
import { LOGIN } from '../queries'

export default function Login({ show, setToken, setPage, setError }) {
  const username = useField()
  const password = useField('password')
  const [login] = useMutation(LOGIN, {
    onCompleted: data => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      username.reset()
      password.reset()
      setPage('books')
    },
    onError: () => setError('Login failed'),
  })

  if (!show) return null

  function submit(e) {
    e.preventDefault()
    login({ variables: { username: username.props.value, password: password.props.value } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <label>
          username <input {...username.props} />
        </label>
        <label>
          password <input {...password.props} />
        </label>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}
