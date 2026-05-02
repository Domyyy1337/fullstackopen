import {
  Avatar,
  Container,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import BookIcon from '@mui/icons-material/Book'
import useBlogs from '../hooks/useBlogs'

const Blogs = () => {
  const { blogs, isPending } = useBlogs()

  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Typography variant='h2' sx={{ fontSize: '2rem' }}>
        Blogs
      </Typography>
      {isPending ? (
        <Container sx={{ justifyContent: 'center', display: 'flex' }}>
          <Typography variant='body1'>blogs loading...</Typography>
        </Container>
      ) : (
        <List dense={true}>
          {blogs.map(b => (
            <ListItem key={b.id} component={RouterLink} to={`/blogs/${b.id}`}>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary={b.title} secondary={b.author} />
              {/* <Link component={RouterLink} to={`/blogs/${b.id}`}>
              {b.title} by {b.author}
            </Link> */}
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  )
}

export default Blogs
