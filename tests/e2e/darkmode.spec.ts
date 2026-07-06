import { test, expect } from '@playwright/test'

test.describe('Dark Mode', () => {
  test('dark mode toggle button exists', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('[aria-label*="mode"], [aria-label*="dark"], [aria-label*="light"]')
    await expect(toggle.first()).toBeVisible()
  })

  test('toggling dark mode adds dark class to document', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"], [aria-label*="dark"], [aria-label*="light"]').first()
    if (!(await toggle.isVisible())) {
      test.skip(true, 'Dark mode toggle not found')
      return
    }

    const isDarkBefore = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    await toggle.click()
    await page.waitForTimeout(300)

    const isDarkAfter = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    expect(isDarkAfter).toBe(!isDarkBefore)
  })

  test('dark mode persists across page navigation', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"], [aria-label*="dark"], [aria-label*="light"]').first()
    if (!(await toggle.isVisible())) {
      test.skip(true, 'Dark mode toggle not found')
      return
    }

    await toggle.click()
    await page.waitForTimeout(300)

    const darkState = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    await page.goto('/about')
    await page.waitForTimeout(300)

    const darkAfterNav = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    expect(darkAfterNav).toBe(darkState)
  })

  test('toggle button icon changes with theme', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"], [aria-label*="dark"], [aria-label*="light"]').first()
    if (!(await toggle.isVisible())) {
      test.skip(true, 'Dark mode toggle not found')
      return
    }

    const labelBefore = await toggle.getAttribute('aria-label')

    await toggle.click()
    await page.waitForTimeout(300)

    const labelAfter = await toggle.getAttribute('aria-label')

    expect(labelAfter).not.toBe(labelBefore)
  })

  test('page is still functional after multiple toggles', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"], [aria-label*="dark"], [aria-label*="light"]').first()
    if (!(await toggle.isVisible())) {
      test.skip(true, 'Dark mode toggle not found')
      return
    }

    for (let i = 0; i < 3; i++) {
      await toggle.click()
      await page.waitForTimeout(200)
    }

    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
  })
})
