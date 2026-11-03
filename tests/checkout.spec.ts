import payment from '../testdata/payment.json';
import { test, expect } from '../fixtures/test.fixture';
import { registrationData } from '../utils/data';

test('complete checkout and validate placed order', async ({
  page,
  authPage,
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  const user = registrationData();

  await page.goto('/');
  await authPage.open();
  await authPage.signup(user);

  await productsPage.open();
  await productsPage.addFirstProductToCart();
  await cartPage.open();
  await cartPage.expectProductCount(1);
  await cartPage.proceedToCheckout();

  await expect(page.locator('#cart_info')).toContainText('Blue Top');
  await checkoutPage.enterComment('Automated Playwright order');
  await checkoutPage.pay(payment.card);
  await checkoutPage.expectOrderPlaced();
  await expect(page.getByText(/Congratulations! Your order has been confirmed!/)).toBeVisible();

  await authPage.deleteAccount();
});
