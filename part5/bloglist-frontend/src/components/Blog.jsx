import { Box, Button, Card, Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, like, remove, user }) => {
  const navigate = useNavigate()

  if (!blog) return null

  /**
   * @type {import("react").CSSProperties}
   */
  // const blogStyle = { paddingTop: 10, paddingLeft: 2, marginBottom: 5 }

  const removeBlog = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    remove(blog)
    navigate('/')
  }

  return (
    <Card data-testid='blog' sx={{ margin: '2rem', padding: '1rem' }}>
      <Typography variant='caption' sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        {blog.title}
      </Typography>
      <Typography variant='body1' sx={{ marginBottom: '1rem' }}>
        by {blog.author}
      </Typography>
      <Box sx={{ display: 'flex', gap: '0.5rem', flexFlow: 'column' }}>
        <Link href={blog.url}>{blog.url}</Link>
        <Typography variant='body2'>Added by {blog.user.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Typography sx={{ fontWeight: 500 }}>{blog.likes} likes</Typography>
          {user ? (
            <Button onClick={() => like(blog)} variant='outlined' color='success'>
              like
            </Button>
          ) : null}
          {user && user.username === blog.user.username ? (
            <Button onClick={removeBlog} variant='outlined' color='error'>
              remove
            </Button>
          ) : null}
        </Box>
      </Box>
    </Card>
  )
}

export default Blog
