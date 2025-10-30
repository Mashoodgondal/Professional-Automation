// import { test, expect } from '@playwright/test';

// test.describe('Automation Practice Page', () => {

//   test.beforeEach(async ({ page }) => {
//     await page.goto('http://127.0.0.1:5500/index.html'); // update if your port is different
//   });

//   test('should display correct page title and header', async ({ page }) => {
//     await expect(page).toHaveTitle(/Automation Practice/);
//     await expect(page.locator('h1')).toHaveText('Automation Practice Page');
//   });

//   test('should fill and submit signup form successfully', async ({ page }) => {
//     await page.fill('#name', 'John Doe');
//     await page.fill('#email', 'john@example.com');
//     await page.fill('#password', 'Password123');
//     await page.selectOption('#role', 'developer');
//     await page.check('#terms');
//     await page.click('#submit-btn');

//     const resultBox = page.locator('#result');
//     await expect(resultBox).toContainText('✅ Form Submitted Successfully');
//     await expect(resultBox).toContainText('John Doe');
//     await expect(resultBox).toContainText('developer');
//   });

//   test('should show alert when clicking the Click Me button', async ({ page }) => {
//     page.once('dialog', async dialog => {
//       expect(dialog.message()).toBe('Button clicked successfully!');
//       await dialog.dismiss();
//     });
//     await page.click('#click-btn');
//   });

//   test('should reset form and display reset message', async ({ page }) => {
//     await page.fill('#name', 'Mashood');
//     await page.fill('#email', 'mashood@example.com');
//     await page.click('#reset-btn');

//     const resultBox = page.locator('#result');
//     await expect(resultBox).toContainText('Form has been reset');

//     // Confirm that form inputs are cleared
//     await expect(page.locator('#name')).toHaveValue('');
//     await expect(page.locator('#email')).toHaveValue('');
//   });

//   test('should not submit form if terms not accepted', async ({ page }) => {
//     await page.fill('#name', 'Ali Tester');
//     await page.fill('#email', 'ali@example.com');
//     await page.fill('#password', 'Secret123');
//     await page.selectOption('#role', 'tester');

//     const [dialog] = await Promise.all([
//       page.waitForEvent('dialog'),
//       page.click('#submit-btn'),
//     ]);
//     // Since you didn’t define validation in JS, you can add later.
//     // For now, we test no result appeared:
//     const resultBox = page.locator('#result');
//     await expect(resultBox).not.toContainText('Form Submitted');
//     dialog.dismiss();
//   });
// });










import { test, expect } from '@playwright/test';
const PAGE_URL = 'http://127.0.0.1:5500/index.html';

test.describe('User Form and Table Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.evaluate(() => localStorage.clear()); // Clear previous records
  });

  test('should load page with correct title and form elements', async ({ page }) => {
    await expect(page).toHaveTitle('Professional Form with Table');
    await expect(page.locator('#userForm')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#image')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show image preview when file is uploaded', async ({ page }) => {
    const filePath = 'tests/assets/sample.jpg';
    await page.setInputFiles('#image', filePath);
    await expect(page.locator('#preview')).toBeVisible();
  });

  test('should add a record and display it in table', async ({ page }) => {
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#contact', '123456789');
    await page.fill('#about', 'A test user');
    await page.click('button[type="submit"]');

    const tableRow = page.locator('#tableBody tr');
    await expect(tableRow).toHaveCount(1);
    await expect(tableRow.locator('td').nth(1)).toHaveText('John Doe');
    await expect(tableRow.locator('td').nth(2)).toHaveText('john@example.com');
  });

  test('should persist record in localStorage', async ({ page }) => {
    await page.fill('#name', 'Jane Doe');
    await page.fill('#email', 'jane@example.com');
    await page.fill('#contact', '987654321');
    await page.fill('#about', 'Persistent user');
    await page.click('button[type="submit"]');
  
    const storedData = await page.evaluate(() => {
      const data = localStorage.getItem('users');
      return data ? JSON.parse(data) : [];
    });
  
    expect(storedData.length).toBe(1);
    expect(storedData[0].name).toBe('Jane Doe');
  });
  

  test('should edit a record correctly', async ({ page }) => {
    await page.fill('#name', 'Old Name');
    await page.fill('#email', 'old@example.com');
    await page.fill('#contact', '111222333');
    await page.fill('#about', 'Before edit');
    await page.click('button[type="submit"]');

    await page.click('text=Edit');
    await page.fill('#name', 'New Name');
    await page.click('button[type="submit"]');

    const updatedName = await page.locator('#tableBody tr td:nth-child(2)').textContent();
    expect(updatedName).toBe('New Name');
  });

  test('should delete a record from the table', async ({ page }) => {
    await page.fill('#name', 'Delete Me');
    await page.fill('#email', 'delete@example.com');
    await page.fill('#contact', '000999888');
    await page.fill('#about', 'To be deleted');
    await page.click('button[type="submit"]');

    // Mock confirm dialog
    page.once('dialog', (dialog) => dialog.accept());

    await page.click('text=Delete');
    await expect(page.locator('#tableBody tr')).toHaveCount(0);
  });

  test('should reset form after submit', async ({ page }) => {
    await page.fill('#name', 'Reset User');
    await page.fill('#email', 'reset@example.com');
    await page.fill('#contact', '555555');
    await page.fill('#about', 'Check reset');
    await page.click('button[type="submit"]');

    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#contact')).toHaveValue('');
  });

  test('should not submit if required fields are empty', async ({ page }) => {
    await page.click('button[type="submit"]');
    const tableRow = page.locator('#tableBody tr');
    await expect(tableRow).toHaveCount(0);
  });
});
