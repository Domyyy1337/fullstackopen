import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    await login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label>
          username
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          password
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

// <div>
//   <h2>Login</h2>

//   <form onSubmit={handleLogin}>
//     <TextField label='username' onChange={e => setUsername(e.target.value)} />
//     <TextField label='password' onChange={e => setPassword(e.target.value)} type='password' />
//     <button type='submit'>login</button>
//   </form>
// </div>

export default LoginForm
