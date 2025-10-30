import { test, expect } from '@playwright/test';

test.describe('Automation Practice Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html'); // update if your port is different
  });

  test('should display correct page title and header', async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Practice/);
    await expect(page.locator('h1')).toHaveText('Automation Practice Page');
  });

  test('should fill and submit signup form successfully', async ({ page }) => {
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#password', 'Password123');
    await page.selectOption('#role', 'developer');
    await page.check('#terms');
    await page.click('#submit-btn');

    const resultBox = page.locator('#result');
    await expect(resultBox).toContainText('✅ Form Submitted Successfully');
    await expect(resultBox).toContainText('John Doe');
    await expect(resultBox).toContainText('developer');
  });

  test('should show alert when clicking the Click Me button', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Button clicked successfully!');
      await dialog.dismiss();
    });
    await page.click('#click-btn');
  });

  test('should reset form and display reset message', async ({ page }) => {
    await page.fill('#name', 'Mashood');
    await page.fill('#email', 'mashood@example.com');
    await page.click('#reset-btn');

    const resultBox = page.locator('#result');
    await expect(resultBox).toContainText('Form has been reset');

    // Confirm that form inputs are cleared
    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
  });

  test('should not submit form if terms not accepted', async ({ page }) => {
    await page.fill('#name', 'Ali Tester');
    await page.fill('#email', 'ali@example.com');
    await page.fill('#password', 'Secret123');
    await page.selectOption('#role', 'tester');

    const [dialog] = await Promise.all([
      page.waitForEvent('dialog'),
      page.click('#submit-btn'),
    ]);
    // Since you didn’t define validation in JS, you can add later.
    // For now, we test no result appeared:
    const resultBox = page.locator('#result');
    await expect(resultBox).not.toContainText('Form Submitted');
    dialog.dismiss();
  });
});
