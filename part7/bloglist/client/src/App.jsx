import Blogs from './components/Blogs'
import Form from './components/Form'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Blog from './components/Blog'
import { Container, Toolbar, Button, AppBar, Typography, Box } from '@mui/material'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import { useUser, useUserActions } from './stores/userStore'
import { useNotificationActions } from './stores/notificationStore'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const user = useUser()
  const { logout } = useUserActions()
  const navigate = useNavigate()
  const { setNotification } = useNotificationActions()

  const handleLogout = () => {
    setNotification({ text: `See you soon, ${user.username}`, type: 'info' })
    logout()
    navigate('/')
  }

  const buttonStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h1' sx={{ fontSize: '2rem' }}>
            Blog App
          </Typography>
          <Box>
            <Button color='inherit' component={Link} to='/' sx={buttonStyle}>
              blogs
            </Button>
            <Button color='inherit' component={Link} to='/users' sx={buttonStyle}>
              users
            </Button>
            {user ? (
              <Button color='inherit' component={Link} to='/create' sx={buttonStyle}>
                new blog
              </Button>
            ) : null}
            {!user ? (
              <Button color='inherit' component={Link} to='/login' sx={buttonStyle}>
                login
              </Button>
            ) : (
              <Button color='inherit' onClick={handleLogout} sx={buttonStyle}>
                logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <div style={{ minHeight: 50, marginTop: 10, marginBottom: 10 }}>
        <Notification />
      </div>

      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<Blogs user={user} />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs/:id' element={<Blog user={user} />} />
          <Route path='/create' element={<BlogForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
