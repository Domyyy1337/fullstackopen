import { useState } from 'react'
import FormItem from './FormItem'
import Form from './Form'
import { useNavigate } from 'react-router-dom'
import { Container, TextField } from '@mui/material'

const BlogForm = ({ create }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const handleCreate = async event => {
    event.preventDefault()
    const successful = await create(title, author, url)
    if (successful) {
      navigate('/')
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <Container>
      <Form onSubmit={handleCreate} buttonText='create' title='create new blog'>
        <TextField label='title' value={title} onChange={e => setTitle(e.target.value)} />
        <TextField label='author' value={author} onChange={e => setAuthor(e.target.value)} />
        <TextField label='url' value={url} onChange={e => setUrl(e.target.value)} />
      </Form>
    </Container>
  )
}

export default BlogForm
