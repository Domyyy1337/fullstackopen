import Form from './Form'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Stack, TextField } from '@mui/material'
import { useNotificationActions } from '../stores/notificationStore'
import { useUserActions } from '../stores/userStore'
import useField from '../hooks/useField'

const LoginForm = () => {
  const username = useField()
  const password = useField('password')
  const navigate = useNavigate()
  const { setNotification } = useNotificationActions()
  const { login } = useUserActions()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await login(username.props.value, password.props.value)
      setNotification({ text: `successfully logged in as ${user.username}`, type: 'success' })
      navigate('/')
    } catch (error) {
      console.error(error?.response?.data?.error)
      setNotification({ text: error?.response?.data?.error, type: 'error' })
    }
  }

  return (
    <Container>
      <Form title='Log in to application' onSubmit={handleLogin} buttonText='login'>
        <TextField label='username' variant='standard' {...username.props} />
        <TextField label='password' variant='standard' {...password.props} />
      </Form>
    </Container>
  )
}

export default LoginForm
