// esperas.ts
import { Locator, Page } from "@playwright/test";

export default class Esperas {

  constructor(private page: Page) { }

  // Función para esperar un tiempo específico en segundos
  async esperarSegundos(segundos: number){
    await this.page.waitForTimeout(segundos * 1000);
}

//Funcion para esperar que un elemento este visible
async  esperarElementoPresente(elemento: Locator) {
  await elemento.waitFor({ state: "attached", timeout: 10 * 60 * 1000});
}

  //Funcion para esperar que un elemento este visible y disponible
  async  esperarElementoVisibleYActivo(elemento: Locator) {
    await this.esperarElementoPresente(elemento);
    await elemento.waitFor({ state: "visible", timeout: 60 * 1000});
  }
}