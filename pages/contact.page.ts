import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ContactPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.gotoWithRetry('/contact_us');
  }

  async submit(data: { name: string; email: string; subject: string; message: string }, attachment?: string) {
    await this.page.locator('[data-qa="name"]').fill(data.name);
    await this.page.locator('[data-qa="email"]').fill(data.email);
    await this.page.locator('[data-qa="subject"]').fill(data.subject);
    await this.page.locator('[data-qa="message"]').fill(data.message);
    if (attachment) {
      await this.page.locator('input[name="upload_file"]').setInputFiles(attachment);
    }
    this.page.on('dialog', dialog => dialog.accept());
    await this.page.locator('[data-qa="submit-button"]').click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
