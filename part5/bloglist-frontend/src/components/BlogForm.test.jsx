import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { beforeEach } from 'vitest'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls the event handler when a blog is created', async () => {
    const createMock = vi.fn()

    render(<BlogForm create={createMock} />)

    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    const submitButton = screen.getByText('create')

    const user = userEvent.setup()

    await user.type(titleInput, 'My First Blog')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'https://test.com')
    await user.click(submitButton)

    const calls = createMock.mock.calls
    const call = calls[0][0]

    expect(calls).toHaveLength(1)
    expect(call).toStrictEqual({ title: 'My First Blog', author: 'Test Author', url: 'https://test.com' })
  })
})
