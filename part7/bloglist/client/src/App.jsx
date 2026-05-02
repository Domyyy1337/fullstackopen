import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import FormItem from './components/FormItem'
import loginService from './services/login'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import Blog from './components/Blog'
import { Container, Toolbar, Button, AppBar, Typography, Box } from '@mui/material'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import { useNotificationActions } from './stores/notificationStore'
import useBlogs from './hooks/useBlogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(() => {
    const savedUser = window.localStorage.getItem('savedBlogsUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const { setNotification } = useNotificationActions()
  const { likeBlog } = useBlogs()

  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    if (!user) return
    blogService.setToken(user.token)
  }, [user])

  const handleLogout = async () => {
    window.localStorage.clear()
    navigate('/')
    setUser(null)
    blogService.setToken(null)
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('savedBlogsUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNotification({ text: `successfully logged in as ${user.username}`, type: 'success' })
      return true
    } catch (error) {
      console.error(error?.response?.data?.error)
      setNotification({ text: error?.response?.data?.error, type: 'error' })
      return false
    }
  }

  const createBlog = async (title, author, url) => {
    try {
      const returnedBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ text: `a new blog ${title} by ${author} added`, type: 'success' })
      return true
    } catch (error) {
      console.error(error?.response?.data?.error)
      setNotification({ text: error?.response?.data?.error, type: 'error' })
      return false
    }
  }

  const remove = async blog => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      console.error(error?.response?.data?.error)
      setNotification({ text: error?.response?.data?.error, type: 'error' })
    }
  }

  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

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
          <Route path='/' element={<Blogs user={user} remove={remove} />} />
          <Route path='/login' element={<LoginForm login={login} />} />
          <Route path='/blogs/:id' element={<Blog id={blog?.id} user={user} />} />
          <Route path='/create' element={<BlogForm create={createBlog} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
