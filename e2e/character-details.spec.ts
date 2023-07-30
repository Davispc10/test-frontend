import { test, expect } from '@playwright/test'

const characterData = {
  id: 1010354,
  name: 'Adam Warlock',
  description:
    'Adam Warlock is an artificially created human who was born in a cocoon at a scientific complex called The Beehive.',
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: characterData.name }).click()

  await page.waitForURL(/\/characters\/\d+/)
  await page.waitForTimeout(500)
})

test('has title and description', async ({ page }) => {
  await expect(page).toHaveTitle(`${characterData.name} | Marvel Characters`)

  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    characterData.description,
  )
})

test('load the character details correctly', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    characterData.name,
  )

  await expect(page.getByRole('paragraph').first()).toHaveText(
    characterData.description,
  )

  await expect(
    page.getByAltText(characterData.name, { exact: true }),
  ).toBeVisible()

  const comicsList = page.getByTestId('cards-grid')

  for (const comicLink of await comicsList.getByRole('link').all()) {
    await expect(comicLink).toHaveAttribute('href', /marvel\.com\/comics/)
    await expect(comicLink).toHaveAttribute('target', '_blank')
    await expect(comicLink).toHaveAttribute('rel', 'noreferrer noopener')
  }
})

test('go back to home page', async ({ page, baseURL }) => {
  await page.goto(`/?search=adam&page=1&orderBy=-name`)

  await page.getByRole('link', { name: characterData.name }).click()

  await page.waitForURL(/\/characters\/\d+/)

  await page.waitForTimeout(500)

  await page.getByRole('button', { name: /go back/i }).click()

  await page.waitForTimeout(500)
  await page.waitForURL(`${baseURL}/?search=adam&page=1&orderBy=-name`)

  await expect(page).toHaveTitle('Marvel Characters')

  expect(page.url()).toBe(`${baseURL}/?search=adam&page=1&orderBy=-name`)
})
