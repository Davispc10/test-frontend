import { expect, test, type Locator, type Page } from '@playwright/test'

const getFirstCharacterName = (list: Locator) => {
  return list.getByRole('listitem').first().getByRole('paragraph').textContent()
}

const waitForLoading = async (page: Page) => {
  await page.waitForFunction(
    () => document.querySelector('[role=progressbar]') === null,
  )

  await page.waitForTimeout(1000)
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Marvel Characters/)
})

test('load the initial set of characters correctly', async ({ page }) => {
  const list = page.getByTestId('cards-grid')

  await expect(list.getByRole('listitem')).toHaveCount(20)
})

test('search for a character', async ({ page }) => {
  const searchInput = page.getByRole('textbox')
  const searchButton = page.getByRole('button', { name: /search/i })

  await searchInput.fill('3-D Man')
  await searchButton.click()

  const list = page.getByTestId('cards-grid')

  await expect(list.getByRole('listitem')).toHaveCount(1)
})

test('search for a character that does not exist', async ({ page }) => {
  const searchInput = page.getByRole('textbox')
  const searchButton = page.getByRole('button', { name: /search/i })
  const searchValue = 'THIS_CHARACTER_DOES_NOT_EXIST'
  await searchInput.fill(searchValue)
  await searchButton.click()

  await waitForLoading(page)

  const noResultsInitialMessage = `Sorry, we couldn't find any character matching`
  const noResultsMessage = `"${searchValue}"`

  await expect(page.getByText(noResultsInitialMessage)).toBeVisible()
  await expect(page.getByText(noResultsMessage)).toBeVisible()
})

test('ordering characters', async ({ page, isMobile }) => {
  // On mobile is just a normal select, on desktop is a custom select
  const orderBySelect = isMobile
    ? page.locator('select').first()
    : page.getByRole('combobox')

  const list = page.getByTestId('cards-grid')

  const firstCharacterNameWithDefaultOrder = await getFirstCharacterName(list)

  await page.waitForTimeout(500)

  if (isMobile) {
    await orderBySelect.selectOption('Name (Z-A)')
  } else {
    await orderBySelect.click()
    await page.waitForTimeout(500)

    await page
      .getByRole('listbox')
      .getByRole('group')
      .getByText('Name (Z-A)')
      .click()
  }

  await page.waitForTimeout(500)
  await waitForLoading(page)
  await page.waitForURL(/orderBy=-name/)

  const firstCharacterNameWithZOrder = await getFirstCharacterName(list)

  expect(firstCharacterNameWithDefaultOrder).not.toEqual(
    firstCharacterNameWithZOrder,
  )
})

test('pagination', async ({ page, isMobile }) => {
  const desktop = async () => {
    const getPageNumber = (number: string) => {
      return page
        .getByRole('navigation', { name: /pagination/i })
        .getByRole('link', { name: number })
    }

    const list = page.getByTestId('cards-grid')

    const firstCharacterNameWithDefaultOrder = await getFirstCharacterName(list)

    expect(
      await getPageNumber('1').getAttribute('data-selected'),
    ).not.toBeNull()

    await getPageNumber('2').click()
    await waitForLoading(page)

    expect(await getPageNumber('1').getAttribute('data-selected')).toBeNull()

    expect(
      await getPageNumber('2').getAttribute('data-selected'),
    ).not.toBeNull()

    expect(firstCharacterNameWithDefaultOrder).not.toEqual(
      await getFirstCharacterName(list),
    )
  }

  // On mobile we only have the next/previous buttons
  const mobile = async () => {
    const list = page.getByTestId('cards-grid')

    const firstCharacterNameWithDefaultOrder = await getFirstCharacterName(list)

    await page
      .getByRole('navigation', { name: /pagination/i })
      .getByRole('link', { name: /next/i })
      .click()

    await waitForLoading(page)
    await page.waitForTimeout(500)

    expect(firstCharacterNameWithDefaultOrder).not.toEqual(
      await getFirstCharacterName(list),
    )
  }

  isMobile ? await mobile() : await desktop()
})

test('change url when searching', async ({ page, isMobile }) => {
  const searchInput = page.getByRole('textbox')
  const searchButton = page.getByRole('button', { name: /search/i })

  const desktop = async () => {
    const orderByCombobox = page.getByRole('combobox')

    const pageTwo = page
      .getByRole('navigation', { name: /pagination/i })
      .getByRole('link', { name: '2' })

    await searchInput.fill('a')
    await searchButton.click()

    await waitForLoading(page)

    await pageTwo.click()

    await waitForLoading(page)
    await orderByCombobox.click()
    await page.waitForTimeout(200)

    await page
      .getByRole('listbox')
      .getByRole('group')
      .getByText('Name (Z-A)')
      .click()

    await waitForLoading(page)

    expect(page.url()).toContain('search=a&page=2&orderBy=-name')
  }

  const mobile = async () => {
    const nextPageButton = page
      .getByRole('navigation', { name: /pagination/i })
      .getByRole('link', { name: /next/i })

    const orderBySelect = page.locator('select')

    await searchInput.fill('a')
    await searchButton.click()

    await waitForLoading(page)

    await nextPageButton.click()

    await waitForLoading(page)

    await orderBySelect?.selectOption('Name (Z-A)')

    await waitForLoading(page)

    expect(page.url()).toContain('search=a&page=2&orderBy=-name')
  }

  isMobile ? await mobile() : await desktop()
})

test('go to character detail', async ({ page }) => {
  const list = page.getByTestId('cards-grid')

  const firstCharacterName = await getFirstCharacterName(list)

  await list.getByRole('listitem').first().getByRole('link').click()

  await page.waitForURL(/\/characters\/\d+/)

  await expect(page).toHaveTitle(`${firstCharacterName} | Marvel Characters`)
})
