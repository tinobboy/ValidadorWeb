import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    private addToCartBtn: Locator;
    private shoppingCartIcon: Locator;

    constructor(page: Page) {
        this.addToCartBtn = page.locator(`(//button[text() = 'Add to cart'])[${Math.floor(Math.random() * 6) + 1}]`);
        this.shoppingCartIcon = page.locator('a[class = "shopping_cart_link"]');
    }

    async addProductToCart(): Promise<void> {
        await this.addToCartBtn.click();
    }

    async goToCart(): Promise<void> {
        await this.shoppingCartIcon.click();
    }
}