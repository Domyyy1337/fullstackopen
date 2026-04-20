const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, logout } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post(`/api/users`, { data: { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' } })
    await request.post(`/api/users`, { data: { name: 'John Don', username: 'johndon', password: 'johndon' } })

    await page.goto('/')
  })

  /**
   * Exercise 5.17
   */
  test('login button is shown', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'login' })).toBeVisible()
  })

  /**
   * Exercise 5.18
   */
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => await loginWith(page, 'mluukkai', 'salainen'))

    /**
     * Exercise 5.19
     */
    test('a new blog can be created', async ({ page }) => {
      const blog = { title: 'My Test Blog', author: 'Jonathan', url: 'http://test.com' }
      await createBlog(page, blog)

      const listItem = page.getByRole('link', { name: `${blog.title} by ${blog.author}` })

      await expect(listItem).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(
        async ({ page }) =>
          await createBlog(page, { title: 'My Test Blog', author: 'Jonathan', url: 'http://test.com' }),
      )

      /**
       * Exercise 5.20
       */
      test('that blog can be liked', async ({ page }) => {
        await page.getByRole('link', { name: 'My Test Blog by Jonathan' }).click()

        await expect(page.getByText('likes 0')).toBeVisible()

        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText(`You liked My Test Blog by Jonathan`)).toBeVisible()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      /**
       * Exercise 5.21
       */
      test('the user that created the blog can delete it', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('link', { name: 'My Test Blog by Jonathan' }).click()
        await page.getByRole('button', { name: 'remove' }).click()

        expect(page.getByRole('listitem')).not.toBeVisible()
      })

      /**
       * Execise 5.22
       */
      test('another user can not remove that blog', async ({ page }) => {
        await logout(page)
        await loginWith(page, 'johndon', 'johndon')
        await page.getByRole('link', { name: 'My Test Blog by Jonathan' }).click()

        expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    // describe('and several blogs exist', () => {
    //   beforeEach(async ({ page }) => {
    //     await createBlog(page, { title: 'I am Blog Number 1', author: 'Author', url: 'http://google.com' })
    //     await createBlog(page, { title: 'I am Blog Number 2', author: 'Author', url: 'http://google.com' })
    //     await createBlog(page, { title: 'I am Blog Number 3', author: 'Author', url: 'http://google.com' })
    //     await createBlog(page, { title: 'I am Blog Number 4', author: 'Author', url: 'http://google.com' })
    //   })

    //   test('they are ordered by amount of likes', async ({ page }) => {
    //     const blog4 = page.getByTestId('blog').filter({ hasText: "'I am Blog Number 4' by Author" })
    //     const blog3 = page.getByTestId('blog').filter({ hasText: "'I am Blog Number 3' by Author" })

    //     await blog4.getByRole('button', { name: 'view' }).click()
    //     await blog4.getByRole('button', { name: 'like' }).click()
    //     await expect(blog4.getByText('likes 1')).toBeVisible()
    //     await blog4.getByRole('button', { name: 'hide' }).click()

    //     await expect(page.getByTestId('blog').first()).toContainText("'I am Blog Number 4' by Author")

    //     await blog3.getByRole('button', { name: 'view' }).click()
    //     await blog3.getByRole('button', { name: 'like' }).click()
    //     await expect(blog3.getByText('likes 1')).toBeVisible()
    //     await blog3.getByRole('button', { name: 'like' }).click()
    //     await expect(blog3.getByText('likes 2')).toBeVisible()
    //     await blog3.getByRole('button', { name: 'hide' }).click()

    //     await expect(page.getByTestId('blog').first()).toContainText("'I am Blog Number 3' by Author")
    //     await expect(page.getByTestId('blog').nth(1)).toContainText("'I am Blog Number 4' by Author")
    //   })
    // })
  })
})
