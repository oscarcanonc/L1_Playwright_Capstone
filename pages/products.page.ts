import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.gotoWithRetry('/products');
    await expect(this.page.locator('.features_items')).toBeVisible();
  }

  async search(term: string) {
    await this.page.locator('#search_product').fill(term);
    await this.page.locator('#submit_search').click();
    await expect(this.page.getByText('Searched Products')).toBeVisible();
  }

  async addFirstProductToCart() {
    const product = this.page.locator('.features_items .product-image-wrapper').first();
    await product.hover();
    await product.locator('.overlay-content a.add-to-cart').click();
    await expect(this.page.getByText('Added!', { exact: true })).toBeVisible();
    await this.page.locator('[data-dismiss="modal"]').last().click();
  }
}
