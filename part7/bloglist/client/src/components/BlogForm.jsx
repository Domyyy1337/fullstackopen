import Form from './Form'
import { useNavigate } from 'react-router-dom'
import { Container, TextField } from '@mui/material'
import useBlogs from '../hooks/useBlogs'
import useField from '../hooks/useField'

export default function BlogForm() {
  const title = useField()
  const author = useField()
  const url = useField()
  const { addBlog } = useBlogs()

  const navigate = useNavigate()

  const handleCreate = async event => {
    event.preventDefault()
    await addBlog({ title: title.props.value, author, url })
    navigate('/')
  }

  return (
    <Container>
      <Form onSubmit={handleCreate} buttonText='create' title='create new blog'>
        <TextField label='title' {...title.props} />
        <TextField label='author' {...author.props} />
        <TextField label='url' {...author.props} />
      </Form>
    </Container>
  )
}
