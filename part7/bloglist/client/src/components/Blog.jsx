import { Box, Button, Card, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useBlog from '../hooks/useBlog'
import { useParams } from 'react-router-dom'
import { useNotificationActions } from '../stores/notificationStore'
import CircleIcon from '@mui/icons-material/Circle'

const Blog = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { blog, likeBlog, isPending, isError, removeBlog } = useBlog(id)
  const { setNotification } = useNotificationActions()

  if (isPending) return <p>loading blog...</p>
  if (isError) return <p>an error occurred while loading the blog</p>

  /**
   * @type {import("react").CSSProperties}
   */
  // const blogStyle = { paddingTop: 10, paddingLeft: 2, marginBottom: 5 }

  const handleRemove = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    removeBlog(blog)
    navigate('/')
    setNotification({ text: 'Blog successfully removed!', type: 'success' })
  }

  return (
    <Card data-testid='blog' sx={{ margin: '2rem', padding: '1rem' }}>
      <Typography variant='caption' sx={{ marginBottom: '1rem' }}>
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
            <Button onClick={() => likeBlog(blog)} variant='outlined' color='success'>
              like
            </Button>
          ) : null}
          {user && user.username === blog.user.username ? (
            <Button onClick={handleRemove} variant='outlined' color='error'>
              remove
            </Button>
          ) : null}
        </Box>
        <Box sx={{ marginTop: '2rem' }}>
          <Typography variant='h3'>Comments</Typography>
          {blog.comments.length === 0 ? (
            <Typography variant='body1'>No comments yet</Typography>
          ) : (
            <List>
              {blog.comments.map(comment => (
                <ListItem>
                  <ListItemIcon>
                    <CircleIcon />
                  </ListItemIcon>
                  <ListItemText>{comment.text}</ListItemText>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Card>
  )
}

export default Blog
