import { test, expect, type Page } from '@playwright/test'

const changeThemeTo = async (
  page: Page,
  theme: 'light' | 'dark' | 'system',
) => {
  const toggleThemeButton = page.getByRole('button', {
    name: /toggle theme/i,
  })

  await toggleThemeButton.click()
  await page.waitForTimeout(1000)

  await page
    .getByRole('menu')
    .getByRole('menuitem')
    .getByText(new RegExp(theme, 'i'))
    .click()

  await page.waitForTimeout(1000)
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(1000)
})

test('change theme to dark', async ({ page }) => {
  await changeThemeTo(page, 'dark')

  await expect(page.locator('html')).toHaveAttribute('class', /dark/)
})

test('change theme to light', async ({ page }) => {
  await changeThemeTo(page, 'light')

  await expect(page.locator('html')).toHaveAttribute('class', /light/)
})

test.use({ colorScheme: 'dark' })

test('change theme to system', async ({ page }) => {
  await changeThemeTo(page, 'light')
  await expect(page.locator('html')).toHaveAttribute('class', /light/)

  await changeThemeTo(page, 'system')
  await expect(page.locator('html')).toHaveAttribute('class', /dark/)
})
