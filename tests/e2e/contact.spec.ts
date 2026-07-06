import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('loads successfully', async ({ page }) => {
    const response = await page.goto('/contact')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('contact form renders with required fields', async ({ page }) => {
    await page.goto('/contact')
    const form = page.locator('form')
    await expect(form).toBeVisible()

    const nameInput = page.locator('#contact-name')
    await expect(nameInput).toBeVisible()

    const emailInput = page.locator('#contact-email')
    await expect(emailInput).toBeVisible()

    const submitButton = form.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()
  })

  test('form shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/contact')
    const submitButton = page.locator('button[type="submit"]')
    await submitButton.click()

    const errorMessages = page.locator('[role="alert"], .text-red-500')
    const count = await errorMessages.count()
    expect(count).toBeGreaterThan(0)
  })

  test('can type into form fields', async ({ page }) => {
    await page.goto('/contact')
    await page.fill('#contact-name', 'Jane Smith')
    await page.fill('#contact-email', 'jane@example.com')

    await expect(page.locator('#contact-name')).toHaveValue('Jane Smith')
    await expect(page.locator('#contact-email')).toHaveValue('jane@example.com')
  })

  test('contact info section is visible', async ({ page }) => {
    await page.goto('/contact')
    const main = page.locator('main')
    await expect(main).toBeVisible()
    const sections = main.locator('section')
    const count = await sections.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })
})
