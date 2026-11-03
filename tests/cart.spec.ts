import { test, expect } from '../fixtures/test.fixture';

test('add and remove a product from the cart', async ({ page, productsPage, cartPage }) => {
  await page.goto('/');
  await productsPage.open();
  await productsPage.addFirstProductToCart();
  await cartPage.open();
  await cartPage.expectProductCount(1);

  await cartPage.removeProduct();
  await expect(page.getByText('Cart is empty!')).toBeVisible();
});
