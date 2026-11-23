import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async addProduct(name: string) {
    await this.page
      .locator('.inventory_item', { hasText: name })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async open() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async expectCount(n: number) {
    await expect(this.page.locator('.cart_item')).toHaveCount(n);
  }
}
