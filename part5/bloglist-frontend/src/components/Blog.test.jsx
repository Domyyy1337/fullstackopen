import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { beforeEach } from 'vitest'
import Blog from './Blog'

const blog = { title: 'My Test Blog', author: 'Test Author', url: 'http://google.com', user: 'dummy', likes: 10 }

describe('<Blog />', () => {
  test('renders title and author by default', async () => {
    render(<Blog blog={blog} />)

    const title = await screen.findByText(`'${blog.title}' by ${blog.author}`)

    expect(title).toBeVisible()
  })

  test('does not render url and likes by default', async () => {
    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText(`likes ${blog.likes}`)

    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('does render url and likes after view has been clicked', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    screen.getByText(blog.url)
    screen.getByText(`likes ${blog.likes}`)
  })

  test('clicking like twice calls the event handler twice', async () => {
    const like = vi.fn()

    render(<Blog blog={blog} like={like} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(like.mock.calls).toHaveLength(2)
  })
})
