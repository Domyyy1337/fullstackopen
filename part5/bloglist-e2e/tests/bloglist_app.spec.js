const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post(`/api/users`, { data: { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' } })

    await page.goto('/')
  })

  /**
   * Exercise 5.17
   */
  test('login form is shown', async ({ page }) => {
    const loginForm = page.getByLabel('username:')
    const passwordForm = page.getByLabel('password:')

    await expect(loginForm).toBeVisible()
    await expect(passwordForm).toBeVisible()
  })

  /**
   * Exercise 5.18
   */
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
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

      const listItem = page.getByText(`'${blog.title}' by ${blog.author}`)

      expect(listItem).toBeVisible()
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
        await page.getByRole('button', { name: 'view' }).click()

        expect(page.getByText('likes 0')).toBeVisible()

        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText(`You liked My Test Blog by Jonathan`)).toBeVisible()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('the user that created the blog can delete it', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()

        expect(page.getByRole('listitem')).not.toBeVisible()
      })
    })
  })
})
