import { test, Browser, Page, expect } from '@playwright/test';
import { LoginPageSteps } from './pageSteps/loginPage';
import { InventoryPageSteps } from './pageSteps/inventoryPage';
import { ProductsPage } from './pageSteps/productsPage';
import { CheckoutPage } from './pageSteps/checkoutPage';

import Esperas from "../hooks/esperas";

test('Login and Checkout Test', async ({ page }) => {
  const esperas = new Esperas(page);
  const loginPage = new LoginPageSteps(page);
  const productPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);
  
  await page.goto('https://www.saucedemo.com');

  await loginPage.validarTitulo();
  await loginPage.completarUsuario('myUsername');
  await loginPage.completarPassword('myPassword');
  await loginPage.validarBotonLogin();
  await loginPage.clickIngresar();

  const inventoryPage = new InventoryPageSteps(page);
  await esperas.esperarSegundos(6)
  await inventoryPage.validarUrl();
  await inventoryPage.validarTitulo();
  //await inventoryPage.clickEnBotonOpenMenu();

  await productPage.addProductToCart();
  await productPage.goToCart();

  await checkoutPage.checkOut();
  await checkoutPage.fillInformationForm();
  await checkoutPage.finishCheckOut();
  await checkoutPage.validateSuccessMessage();

  await page.close();
      
});

