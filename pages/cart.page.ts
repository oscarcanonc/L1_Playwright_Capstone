import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.gotoWithRetry('/view_cart');
    await expect(this.page).toHaveURL(/\/view_cart/);
  }

  async expectProductCount(count: number) {
    await expect(this.page.locator('#cart_info_table tbody tr')).toHaveCount(count);
  }

  async removeProduct(index = 0) {
    await this.page.locator('.cart_quantity_delete').nth(index).click();
  }

  async proceedToCheckout() {
    await this.page.getByText('Proceed To Checkout').click();
  }
}
