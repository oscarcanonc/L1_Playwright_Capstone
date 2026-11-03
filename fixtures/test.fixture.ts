import { test as base } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ContactPage } from '../pages/contact.page';
import { ProductsPage } from '../pages/products.page';

type Pages = {
  authPage: AuthPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  contactPage: ContactPage;
};

export const test = base.extend<Pages>({
  authPage: async ({ page }, use) => use(new AuthPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  contactPage: async ({ page }, use) => use(new ContactPage(page)),
});

export { expect } from '@playwright/test';
