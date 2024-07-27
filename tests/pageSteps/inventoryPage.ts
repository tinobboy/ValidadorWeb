import { Locator, Page, expect } from "@playwright/test";
import Assert from "../../hooks/assert";
import Esperas from "../../hooks/esperas";

export class InventoryPageSteps {
    private readonly page: Page;
    private readonly assert: Assert;


    // Declaración de web Elements (tipo Locator)
    private readonly titulo: Locator;
    private readonly botonOpenMenu: Locator;
    private readonly botonAllItems: Locator;


    constructor(page: Page) {
        this.page = page;
        this.assert = new Assert(page); // Instanciar la clase Assert
        // Se instancian los elementos
        this.titulo = this.page.getByText('Swag Labs' );
        this.botonOpenMenu = page.getByRole('button', { name: 'Open Menu' });
        this.botonAllItems = page.getByRole('link', { name: 'All Items' });
    }

    async validarTitulo() {
        await this.assert.assertElementoEsONoVisible(this.titulo, true);
    }

    async validarUrl() {
        await this.assert.assertURL(this.page.url());
    }

    async clickEnBotonOpenMenu() {
        await this.assert.assertElementoEsONoVisible(this.botonOpenMenu, true);
        await this.botonOpenMenu.click();
    }

    async validarAllItems() {
        await this.assert.assertElementoEsONoVisible(this.botonAllItems, true);
        await this.botonAllItems.click();
    }
}