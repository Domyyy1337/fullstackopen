const { test, expect, describe, beforeEach } = require('@playwright/test')

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
})
