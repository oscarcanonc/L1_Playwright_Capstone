import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
}

export class AuthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('/login');
  }

  async signup(data: RegistrationData) {
    await this.page.locator('[data-qa="signup-name"]').fill(data.name);
    await this.page.locator('[data-qa="signup-email"]').fill(data.email);
    await this.page.locator('[data-qa="signup-button"]').click();
    await expect(this.page.getByText('Enter Account Information')).toBeVisible();

    await this.page.locator('#id_gender1').check();
    await this.page.locator('[data-qa="password"]').fill(data.password);
    await this.page.locator('[data-qa="days"]').selectOption('10');
    await this.page.locator('[data-qa="months"]').selectOption('5');
    await this.page.locator('[data-qa="years"]').selectOption('1995');
    await this.page.locator('[data-qa="first_name"]').fill(data.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(data.lastName);
    await this.page.locator('[data-qa="address"]').fill(data.address);
    await this.page.locator('[data-qa="country"]').selectOption(data.country);
    await this.page.locator('[data-qa="state"]').fill(data.state);
    await this.page.locator('[data-qa="city"]').fill(data.city);
    await this.page.locator('[data-qa="zipcode"]').fill(data.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(data.mobile);
    await this.page.locator('[data-qa="create-account"]').click();
    await expect(this.page.getByText('Account Created!')).toBeVisible();
    await this.page.locator('[data-qa="continue-button"]').click();
  }

  async login(email: string, password: string) {
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.locator('[data-qa="login-button"]').click();
  }

  async logout() {
    await this.clickHomeHeaderLink('Logout');
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async deleteAccount() {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(this.page.getByText('Account Deleted!')).toBeVisible();
    await this.page.locator('[data-qa="continue-button"]').click();
  }
}
