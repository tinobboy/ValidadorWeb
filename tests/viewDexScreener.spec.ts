import { test, expect } from '@playwright/test';
import { LoginPageSteps } from './pageSteps/loginPage';
import { InventoryPageSteps } from './pageSteps/inventoryPage';
import { ProductsPage } from './pageSteps/productsPage';
import { CheckoutPage } from './pageSteps/checkoutPage';
import Esperas from '../Utils/esperas';

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

    await test.step('Ir a la página de inicio de sesión', async () => {
      await page.goto('https://www.saucedemo.com');
    });

    await test.step('Validar título de la página de inicio de sesión', async () => {
      await loginPage.validarTitulo();
    });

    await test.step('Completar el usuario y la contraseña', async () => {
      await loginPage.completarUsuario('myUsername');
      await loginPage.completarPassword('myPassword');
    });

    await test.step('Validar y hacer clic en el botón de ingresar', async () => {
      await loginPage.validarBotonLogin();
      await loginPage.clickIngresar();
    });
  });

  test('Agregar Producto y Hacer Checkout Del Producto', async ({ page }) => {
    await test.step('Esperar 6 segundos', async () => {
      await esperas.esperarSegundos(6);
    });

    await test.step('Validar URL y título de la página de inventario', async () => {
      await inventoryPage.validarUrl();
      await inventoryPage.validarTitulo();
    });

    await test.step('Agregar producto al carrito', async () => {
      await productPage.addProductToCart();
    });

    await test.step('Ir al carrito', async () => {
      await productPage.goToCart();
    });

    await test.step('Realizar el proceso de checkout', async () => {
      await checkoutPage.checkOut();
      await checkoutPage.fillInformationForm();
      await checkoutPage.finishCheckOut();
    });

    await test.step('Validar mensaje de éxito de la compra', async () => {
      await checkoutPage.validateSuccessMessage();
    });
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});