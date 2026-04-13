import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { beforeEach } from 'vitest'
import Blog from './Blog'

const blog = { title: 'My Test Blog', author: 'Test Author', url: 'likes', user: 'dummy', likes: 10 }

describe('<Blog />', () => {
  beforeEach(() => render(<Blog blog={blog} />))

  test('renders title and author by default', async () => {
    const title = await screen.findByText(`'${blog.title}' by ${blog.author}`)

    expect(title).toBeVisible()
  })

  test('does not render url by default', async () => {
    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText(`likes ${blog.likes}`)

    expect(url).toBeNull()
    expect(likes).toBeNull()
  })
})
