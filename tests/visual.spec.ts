import { test, expect } from '../fixtures/test.fixture';

const visualRoutes = [
  { name: 'home', path: '/' },
  { name: 'login', path: '/login' },
  { name: 'products', path: '/products' },
  { name: 'cart', path: '/view_cart' },
  { name: 'contact', path: '/contact_us' },
];

const dynamicMasks = [
  'iframe',
  '[id^="google_ads"]',
  '.ads',
  '#slider-carousel',
  '.carousel-inner',
];

const externalSiteTolerances = new Map([
  ['chromium-cart', 0.09],
  ['firefox-login', 0.09],
  ['webkit-login', 0.09],
]);

for (const route of visualRoutes) {
  test(`visual layout for ${route.name} page`, async ({ page }, testInfo) => {
    await page.goto(route.path, { waitUntil: 'load' });
    await page.locator('body').waitFor();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images, image => image.complete
          ? Promise.resolve()
          : new Promise<void>(resolve => {
              image.addEventListener('load', () => resolve(), { once: true });
              image.addEventListener('error', () => resolve(), { once: true });
            })),
      );
    });
    await page.waitForTimeout(1500);

    await page.addStyleTag({
      content: `
        iframe, [id^="google_ads"], .ads, #slider-carousel, .carousel-inner {
          visibility: hidden !important;
        }
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
        }
      `,
    });

    await expect(page).toHaveScreenshot(`${testInfo.project.name}-${route.name}.png`, {
      animations: 'disabled',
      maxDiffPixelRatio: externalSiteTolerances.get(`${testInfo.project.name}-${route.name}`) ?? 0.01,
      mask: dynamicMasks.map(selector => page.locator(selector)),
      timeout: 30_000,
    });
  });
}
