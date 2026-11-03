import products from '../testdata/products.json';
import { test, expect } from '../fixtures/test.fixture';

for (const product of products) {
  test(`search products for "${product.term}"`, async ({ page, productsPage }) => {
    await page.goto('/');
    await productsPage.open();
    await productsPage.search(product.term);

    const productCards = page.locator('.features_items .product-image-wrapper');
    expect(await productCards.count()).toBeGreaterThanOrEqual(product.expectedMinimum);
  });
}
