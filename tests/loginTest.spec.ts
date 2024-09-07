import { test, Browser, Page, expect } from '@playwright/test';
import { LoginPageSteps } from './pageSteps/loginPage';
import { InventoryPageSteps } from './pageSteps/inventoryPage';
import { ProductsPage } from './pageSteps/productsPage';
import { CheckoutPage } from './pageSteps/checkoutPage';

import Esperas from "../hooks/esperas";

test('Login Test', async ({ page }) => {
  const esperas = new Esperas(page);
  const loginPage = new LoginPageSteps(page);
  
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
  await inventoryPage.clickEnBotonOpenMenu();
      
});

test('Agregar Producto al Carro', async ({ page }) => {
  const esperas = new Esperas(page);
  const productPage = new ProductsPage(page);
  
  await productPage.addProductToCart();
  await productPage.goToCart();
});

test('Realizar Checkout Del Producto', async ({ page }) => {
  const esperas = new Esperas(page);
  const checkoutPage = new CheckoutPage(page);
  
  await checkoutPage.checkOut();
  await checkoutPage.fillInformationForm();
  await checkoutPage.finishCheckOut();
  await checkoutPage.validateSuccessMessage();
});

test('Cerrar navegador', async ({ page }) => {

    await page.close();

});

