import { test, expect ,Browser , Page } from '@playwright/test';
//import { fixture } from "../hooks/fixture";


  test('Login User & Password exists', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.locator('[data-test="username"]')).toBeEmpty();
    await expect(page.locator('[data-test="password"]')).toBeEmpty();
    await expect(page.locator('[data-test="username"]')).toBeVisible()
    await expect(page.locator('[data-test="password"]')).toBeVisible()
    
  });
  
  test('Login button visible', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('#login_button_container')).toBeVisible();
    
  
  });


  test('Close Browser', async ({ page }) => {await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="login-button"]')).toContainText('Login');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await page.close();
  
  });
