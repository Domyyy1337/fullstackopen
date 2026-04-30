import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import { MemoryRouter as Router } from 'react-router-dom'

describe('<BlogForm />', () => {
  test('calls the event handler when a blog is created', async () => {
    const createMock = vi.fn()

    render(
      <Router>
        <BlogForm create={createMock} />
      </Router>,
    )

    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const submitButton = screen.getByText('create')

    const user = userEvent.setup()

    await user.type(titleInput, 'My First Blog')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'https://test.com')
    await user.click(submitButton)

    const calls = createMock.mock.calls
    const call = calls[0]

    expect(calls).toHaveLength(1)
    expect(call).toStrictEqual(['My First Blog', 'Test Author', 'https://test.com'])
  })
})
