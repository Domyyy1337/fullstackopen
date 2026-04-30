import { useState } from 'react'
import Form from './Form'
import FormItem from './FormItem'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Stack, TextField } from '@mui/material'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()
    const successful = await login(username, password)
    if (successful) {
      navigate('/')
      setUsername('')
      setPassword('')
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
