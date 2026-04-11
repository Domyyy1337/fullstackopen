const LoginForm = ({ onSubmit, children }) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        {children}
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
