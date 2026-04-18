import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'username:' }).click();
  await page.getByRole('textbox', { name: 'username:' }).fill('mluukkai');
  await page.getByRole('textbox', { name: 'username:' }).press('Tab');
  await page.getByRole('textbox', { name: 'password:' }).fill('salaainen');
  await page.getByRole('textbox', { name: 'password:' }).press('Enter');
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('textbox', { name: 'username:' }).click();
  await page.getByRole('textbox', { name: 'username:' }).click();
  await page.getByRole('textbox', { name: 'username:' }).fill('mluukkai');
  await page.getByRole('textbox', { name: 'username:' }).press('Tab');
  await page.getByRole('textbox', { name: 'password:' }).fill('salainen');
  await page.getByRole('textbox', { name: 'password:' }).press('Enter');
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('button', { name: 'view' }).first().click();
  await page.getByRole('button', { name: 'view' }).first().click();
  await page.getByRole('button', { name: 'view' }).first().click();
  await page.getByRole('button', { name: 'view' }).click();
  await page.getByRole('button', { name: 'like' }).nth(3).click();
  await page.getByRole('paragraph').filter({ hasText: 'likes 1like' }).getByRole('button').click();
  await page.getByRole('paragraph').filter({ hasText: 'likes 1like' }).getByRole('button').click();
  await page.getByRole('button', { name: 'like' }).nth(3).click();
  await page.getByRole('button', { name: 'like' }).nth(1).click();
});