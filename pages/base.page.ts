import { expect, Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/') {
    await this.gotoWithRetry(path, 3);
  }

  async gotoWithRetry(path: string, attempts = 3) {
    let lastError: unknown;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        const response = await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: 45_000 });
        await expect(this.page.locator('body')).toBeVisible();
        if (response && response.status() >= 400 && response.status() < 600) continue;
        if (await this.page.getByText(/unknown error|Bad Gateway|Service Unavailable/i).isVisible()) continue;
        return;
      } catch (error) {
        lastError = error;
      }
      if (attempt < attempts) await this.page.waitForTimeout(1_000);
    }
    throw lastError ?? new Error(`Unable to load ${path}`);
  }

  async open(path: string) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async clickHomeHeaderLink(name: 'Signup / Login' | 'Products' | 'Cart' | 'Contact us' | 'Logout') {
    const paths: Record<typeof name, string> = {
      'Signup / Login': '/login',
      Products: '/products',
      Cart: '/view_cart',
      'Contact us': '/contact_us',
      Logout: '/logout',
    };
    await this.page.locator(`ul.navbar-nav a[href="${paths[name]}"]`).first().click();
  }
}
