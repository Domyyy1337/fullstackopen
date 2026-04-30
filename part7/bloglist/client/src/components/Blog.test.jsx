import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { MemoryRouter as Router } from 'react-router-dom'

const authenticatedCreator = { id: '5678', username: 'test', name: 'Test' }
const authenticatedUser = { id: '5678', username: 'hercules', name: 'Hercules' }
const blog = {
  title: 'My Test Blog',
  author: 'Test Author',
  url: 'http://google.com',
  user: authenticatedCreator,
  likes: 10,
}

describe('<Blog />', () => {
  // test('renders title and author in heading', async () => {
  //   render(
  //     <Router>
  //       <Blog blog={blog} />
  //     </Router>
  //   )

  //   expect(screen.getByRole('heading').textContent).toEqual(`${blog.author}: ${blog.title}`)
  // })

  test('clicking like twice calls the event handler twice', async () => {
    const like = vi.fn()

    render(
      <Router>
        <Blog blog={blog} like={like} user={authenticatedUser} />
      </Router>
    )

    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(like.mock.calls).toHaveLength(2)
  })

  describe('when the user is not authenticated', () => {
    beforeEach(() => {
      render(
        <Router>
          <Blog blog={blog} />
        </Router>
      )
    })

    test('amount of likes and blog info are shown', async () => {
      expect(screen.getByText(blog.title)).toBeVisible()
      expect(screen.getByText(`by ${blog.author}`)).toBeVisible()
      expect(screen.getByText(/10 likes/i)).toBeVisible()
      expect(screen.getByRole('link', { value: blog.url })).toBeVisible()
      expect(screen.getByText(`Added by ${blog.user.name}`)).toBeVisible()
    })

    test('like and remove are not shown', async () => {
      const likeButton = await screen.queryByRole('button', { name: 'like' })
      const removeButton = await screen.queryByRole('button', { name: 'remove' })

      expect(likeButton).toBeNull()
      expect(removeButton).toBeNull()
    })
  })

  describe('when the user is authenticated but not the creator', () => {
    beforeEach(() => {
      render(
        <Router>
          <Blog blog={blog} user={authenticatedUser} />
        </Router>
      )
    })

    test('like button is shown', async () => expect(screen.getByRole('button', { name: 'like' })).toBeVisible())

    test('remove button is not shown', async () => {
      const removeButton = await screen.queryByRole('button', { name: 'remove' })

      expect(removeButton).toBeNull()
    })
  })

  describe('when the user is authenticated and the creator', () => {
    beforeEach(() => {
      render(
        <Router>
          <Blog blog={blog} user={authenticatedCreator} />
        </Router>
      )
    })

    test('remove button is shown', async () => expect(screen.getByRole('button', { name: 'remove' })).toBeVisible())
  })
})
