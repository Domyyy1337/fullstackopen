import {
  Box,
  Button,
  Card,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useBlog from '../hooks/useBlog'
import { useParams } from 'react-router-dom'
import { useNotificationActions } from '../stores/notificationStore'
import CircleIcon from '@mui/icons-material/Circle'
import useField from '../hooks/useField'

const Blog = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { blog, likeBlog, isPending, isError, removeBlog, addComment } = useBlog(id)
  const { setNotification } = useNotificationActions()
  const comment = useField()

  if (isPending) return <p>loading blog...</p>
  if (isError) return <p>an error occurred while loading the blog</p>

  /**
   * @type {import("react").CSSProperties}
   */
  // const blogStyle = { paddingTop: 10, paddingLeft: 2, marginBottom: 5 }

  function handleRemove() {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    removeBlog(blog)
    navigate('/')
    setNotification({ text: 'Blog successfully removed!', type: 'success' })
  }

  function handleAddComment() {
    addComment(comment.props.value)
    comment.reset()
    setNotification({ text: 'Comment added', type: 'success' })
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
            <Box>
              <Box sx={{ display: 'flex', gap: '2rem' }}>
                <TextField label='add a comment' variant='outlined' {...comment.props}></TextField>
                <Button variant='contained' onClick={handleAddComment}>
                  Add Comment
                </Button>
              </Box>
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
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  )
}

export default Blog
