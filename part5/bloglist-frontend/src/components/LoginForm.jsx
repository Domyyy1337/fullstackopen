import { useState } from 'react'
import Form from './Form'
import FormItem from './FormItem'
import { useNavigate } from 'react-router-dom'

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
    <div>
      <Form title='Log in to application' onSubmit={handleLogin} buttonText='login'>
        <FormItem label='username:' value={username} onChange={e => setUsername(e.target.value)} />
        <FormItem label='password:' type='password' value={password} onChange={e => setPassword(e.target.value)} />
      </Form>
    </div>
  )
}

export default LoginForm
