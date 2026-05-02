import { useState } from 'react'
import FormItem from './FormItem'
import Form from './Form'
import { useNavigate } from 'react-router-dom'
import { Container, TextField } from '@mui/material'
import useBlogs from '../hooks/useBlogs'

export default function BlogForm() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { addBlog } = useBlogs()

  const navigate = useNavigate()

  const handleCreate = async event => {
    event.preventDefault()
    await addBlog({ title, author, url })
    navigate('/')
    setTitle('')
    setAuthor('')
    setUrl('')
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
