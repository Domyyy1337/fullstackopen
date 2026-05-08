import { useMutation } from '@apollo/client/react'
import useField from '../hooks/useField'
import { LOGIN } from '../queries'

export default function Login({ show, setToken }) {
  const username = useField()
  const password = useField('password')
  const [login] = useMutation(LOGIN, {
    onCompleted: data => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    },
  })

  if (!show) return null

  function submit(e) {
    e.preventDefault()
    login({ variables: { username: username.props.value, password: password.props.value } })
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
        <button type='submit'>login</button>
      </form>
    </div>
  )
}
