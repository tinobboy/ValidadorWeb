import { Locator, Page, expect } from "@playwright/test";
import Assert from "../../hooks/assert";

export class LoginPageSteps {
    private readonly page: Page;
    private readonly assert: Assert;

    // Declaración de web Elements (tipo Locator)
    private readonly titulo: Locator;
    private readonly usuarioInput: Locator;
    private readonly passwordInput: Locator;
    private readonly botonIngresar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.assert = new Assert(page); // Instanciar la clase Assert
        // Se instancian los elementos
        this.titulo = this.page.getByText('Swag Labs' );
        this.usuarioInput = page.getByRole('textbox', { name: 'Username' }); // Se recomienda usar getByRole() en vez de locator o xpaths
        this.passwordInput = page.getByRole('textbox', { name: 'Password' }); // Ya que es más estable en el tiempo
        this.botonIngresar = page.getByRole('button', { name: 'Login' });
    }

    async validarTitulo() {
        await this.assert.assertElementoEsONoVisible(this.titulo, true);
    }

    async completarUsuario(user: string) {
        await this.assert.assertElementoEsONoVisible(this.usuarioInput, true);
        await this.usuarioInput.fill('standard_user');
    }

    async completarPassword(password: string) {
        await this.assert.assertElementoEsONoVisible(this.passwordInput, true);
        await this.passwordInput.fill('secret_sauce');
    }

    async validarBotonLogin() {
        await this.assert.assertElementoEsONoVisible(this.botonIngresar, true);
    }

    async clickIngresar() {
         //validarElementoVisibleYDisponible
        await this.assert.validarElementoVisibleYDisponible(this.botonIngresar)
        await this.botonIngresar.click();
    }
}