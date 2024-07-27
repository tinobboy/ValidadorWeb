import { test, Browser, Page, expect } from '@playwright/test';
import { LoginPageSteps } from './pageSteps/loginPage';
import { InventoryPageSteps } from './pageSteps/inventoryPage';
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
  await page.close();
      
      
    // Agrega más aserciones según sea necesario
  });

