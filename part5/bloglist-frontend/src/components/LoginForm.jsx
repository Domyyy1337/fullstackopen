import { useState } from 'react'
import Form from './Form'
import FormItem from './FormItem'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    await login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <Form title='login' onSubmit={handleLogin} buttonText='login'>
      <FormItem text='username:' value={username} onChange={e => setUsername(e.target.value)} />
      <FormItem text='password:' type='password' value={password} onChange={e => setPassword(e.target.value)} />
    </Form>
  )
}

export default LoginForm
