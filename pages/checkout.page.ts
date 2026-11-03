import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async enterComment(comment: string) {
    await this.page.locator('textarea[name="message"]').fill(comment);
    await this.page.getByRole('link', { name: 'Place Order' }).click();
    await expect(this.page.getByRole('heading', { name: 'Payment' })).toBeVisible();
  }

  async pay(card: { name: string; number: string; cvc: string; month: string; year: string }) {
    await this.page.locator('[data-qa="name-on-card"]').fill(card.name);
    await this.page.locator('[data-qa="card-number"]').fill(card.number);
    await this.page.locator('[data-qa="cvc"]').fill(card.cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(card.month);
    await this.page.locator('[data-qa="expiry-year"]').fill(card.year);
    await this.page.locator('[data-qa="pay-button"]').click();
  }

  async expectOrderPlaced() {
    await expect(this.page.getByText('Order Placed!', { exact: false })).toBeVisible();
  }
}
