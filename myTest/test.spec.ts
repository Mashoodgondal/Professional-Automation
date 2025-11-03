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




//     // For now, we test no result appeared:
//     const resultBox = page.locator('#result');
//     await expect(resultBox).not.toContainText('Form Submitted');
//     dialog.dismiss();
//   });
// });












// import {test,expect, Locator} from '@playwright/test'
// // import { chromium } from '@playwright/test'

// test.describe('Automate landing page of dynamic data',()=>{
//   test.beforeEach(async({page ,browserName})=>{
//     test.skip(browserName !== 'chromium','only run on chromium')
//     // await browser.newPage()
//     await page.goto('http://127.0.0.1:5500/index.html')
//   })
//   test('check heading',async({page})=>{
//       const heading : Locator= page.locator('h1')
//       await expect(heading).toHaveText('User Information Form')
//   })
//   test('check all element are visible or not', async({page})=>{
//     await expect(page.locator("#userForm")).toBeVisible()
//     await expect(page.locator("#name")).toBeVisible()
//     await expect(page.locator("#email")).toBeVisible()
//     await expect(page.locator("#contact")).toBeVisible()
//     await expect(page.locator("button[type='submit']")).toBeVisible()
//   })
//   test('fill input fields and test them',async({page})=>{
//     await page.fill('#name','ali')
//     await page.fill('#email','ali@gmail.com')
//     await page.fill('#contact','098493')
//     await page.fill('#about','A simple test')
//     await page.click('button[type="submit"]')
//     const tableRow = page.locator('#tableBody tr')
//     await expect(tableRow).toHaveCount(1)
//     const storedData = await page.evaluate(() => {
//       const data = localStorage.getItem('users');
//       return data ? JSON.parse(data) : [];
//     });
//     expect(storedData.length).toBe(1)
//     expect(storedData[0].name).toBe('ali')
//     await page.click('text=Edit')
//     await page.fill('#name','new name')
//     await page.click('button[type="submit"]')
//     const updatedName = await page.locator('#tableBody tr td:nth-child(2)').textContent()
//     expect(updatedName).toBe('new name')
//   })

//   test('chek the delete functionality',async({page})=>{
//     await page.fill('#name','ali')
//     await page.fill('#email','ali@gmail.com')
//     await page.fill('#contact','098493')
//     await page.fill('#about','A simple test')
//     await page.click('button[type="submit"]')
//     page.once('dialog',(dialog)=>dialog.accept())
//     await page.click('text=Delete')
//     await expect(page.locator('#tableBody tr ')).toHaveCount(0)
//   })
//   test('check is all field are empty after submit',async({page})=>{
//     await page.fill('#name', 'Reset User');
//     await page.fill('#email', 'reset@example.com');
//     await page.fill('#contact', '555555');
//     await page.fill('#about', 'Check reset');
//     await page.click('button[type="submit"]');
//     await  expect(page.locator('#name')).toHaveValue('')
//     await  expect(page.locator('#email')).toHaveValue('')
//     await  expect(page.locator('#contact')).toHaveValue('')
//   })
//   test('check is submit before entring any value',async({page})=>{
//    await page.click('button[type="submit"]')
//     const tableRow = page.locator('#tableBody tr')
//     await expect(tableRow).toHaveCount(0)
//   })

// })
 



// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('http://127.0.0.1:5500/index.html');
//   await page.getByRole('button', { name: 'Open Dialog' }).click();
//   await page.getByRole('button', { name: 'Cancel' }).click();
//   await page.getByRole('button', { name: 'Open Dialog' }).click();
//   await page.getByRole('button', { name: 'OK' }).click();
//   await page.getByRole('button', { name: 'Choose File' }).click();
//   await page.getByRole('button', { name: 'Choose File' }).setInputFiles('C:\\Users\\NIB\\Downloads\\images.jpeg');
//   await page.getByRole('button', { name: 'Upload', exact: true }).click();
//   const downloadPromise = page.waitForEvent('download');
//   await page.getByRole('button', { name: 'Download Uploaded File' }).click();
//   const download = await downloadPromise;
// });





import { test, expect } from '@playwright/test';

test.describe('File Manager - Negative Test Cases', () => {
  
  test.beforeEach(async ({ page }) => {
    // Load the page before each test
    await page.goto('http://127.0.0.1:5500/index.html');
  });

  test('should show error when trying to upload without selecting a file', async ({ page }) => {
    
    // Click Upload without choosing a file
    // await page.getByRole('button', { name: 'Upload' }).click();
    await page.getByRole('button', { name: 'Upload', exact: true }).click();

    // Expect an error message in red text
    const uploadStatus = page.locator('#uploadStatus');
    await expect(uploadStatus).toHaveText('⚠️ Please select a file to upload.');
    await expect(uploadStatus).toHaveClass(/text-red-500/);
  });

  test('should show error when trying to download without uploading a file', async ({ page }) => {
    // Click download button without uploading
    await page.getByRole('button', { name: 'Download Uploaded File' }).click();

    // Expect an error message
    const downloadStatus = page.locator('#downloadStatus');
    await expect(downloadStatus).toHaveText('❌ No file uploaded yet. Please upload first.');
    await expect(downloadStatus).toHaveClass(/text-red-500/);
  });

});


