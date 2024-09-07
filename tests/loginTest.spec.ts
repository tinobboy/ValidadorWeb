import { test, expect } from '@playwright/test';
import { LoginPageSteps } from './pageSteps/loginPage';
import { InventoryPageSteps } from './pageSteps/inventoryPage';
import { ProductsPage } from './pageSteps/productsPage';
import { CheckoutPage } from './pageSteps/checkoutPage';
import Esperas from "../hooks/esperas";

test.describe('Ingresar a la Web y Agregar Producto', () => {

  let esperas: Esperas;
  let loginPage: LoginPageSteps;
  let productPage: ProductsPage;
  let checkoutPage: CheckoutPage;
  let inventoryPage: InventoryPageSteps;

  test.beforeEach(async ({ page }) => {
    esperas = new Esperas(page);
    loginPage = new LoginPageSteps(page);
    productPage = new ProductsPage(page);
    checkoutPage = new CheckoutPage(page);
    inventoryPage = new InventoryPageSteps(page);

    await page.goto('https://www.saucedemo.com');
    await loginPage.validarTitulo();
    await loginPage.completarUsuario('myUsername');
    await loginPage.completarPassword('myPassword');
    await loginPage.validarBotonLogin();
    await loginPage.clickIngresar();
  });

  test('Agregar Producto y Hacer Checkout Del Producto', async ({ page }) => {
    await esperas.esperarSegundos(6);
    await inventoryPage.validarUrl();
    await inventoryPage.validarTitulo();
    //await inventoryPage.clickEnBotonOpenMenu();
    await productPage.addProductToCart();
    await productPage.goToCart();
    await checkoutPage.checkOut();
    await checkoutPage.fillInformationForm();
    await checkoutPage.finishCheckOut();
    await checkoutPage.validateSuccessMessage();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

});