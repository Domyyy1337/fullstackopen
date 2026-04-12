import { useState } from 'react'
import FormItem from './FormItem'
import Form from './Form'

const BlogForm = ({ create }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async event => {
    event.preventDefault()
    await create({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={handleCreate} buttonText='create' title='create new blog'>
      <FormItem label='title:' value={title} onChange={e => setTitle(e.target.value)} />
      <FormItem label='author:' value={author} onChange={e => setAuthor(e.target.value)} />
      <FormItem label='url:' value={url} onChange={e => setUrl(e.target.value)} />
    </Form>
  )
}

export default BlogForm
