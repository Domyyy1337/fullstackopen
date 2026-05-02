import { useState } from 'react'
import Form from './Form'
import FormItem from './FormItem'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Stack, TextField } from '@mui/material'
import { useNotificationActions } from '../stores/notificationStore'
import { useUserActions } from '../stores/userStore'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setNotification } = useNotificationActions()
  const { login } = useUserActions()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await login(username, password)
      setNotification({ text: `successfully logged in as ${user.username}`, type: 'success' })
      navigate('/')
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error?.response?.data?.error)
      setNotification({ text: error?.response?.data?.error, type: 'error' })
    }
  }

  return (
    <Container>
      <Form title='Log in to application' onSubmit={handleLogin} buttonText='login'>
        <TextField label='username' value={username} onChange={e => setUsername(e.target.value)} variant='standard' />
        <TextField
          label='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          variant='standard'
        />
      </Form>
    </Container>
  )
}

export default LoginForm
