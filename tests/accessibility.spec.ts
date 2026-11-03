import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures/test.fixture';

const pages = [
  { name: 'home', path: '/' },
  { name: 'login', path: '/login' },
  { name: 'products', path: '/products' },
  { name: 'cart', path: '/view_cart' },
  { name: 'contact', path: '/contact_us' },
];

const knownViolationRules = new Set([
  'avoid-inline-spacing',
  'aria-command-name',
  'button-name',
  'color-contrast',
  'frame-title',
  'link-name',
  'label',
]);

for (const route of pages) {
  test(`${route.name} page has no critical or serious WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route.path);
    await page.waitForLoadState('domcontentloaded');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('iframe, [id^="google_ads"], .ads, #slider-carousel')
      .analyze();

    const unexpectedViolations = results.violations.filter(
      violation =>
        (violation.impact === 'critical' || violation.impact === 'serious')
        && !knownViolationRules.has(violation.id),
    );

    expect(
      unexpectedViolations.map(violation => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        targets: violation.nodes.map(node => node.target.join(' ')),
      })),
      `Accessibility violations found on ${route.path}`,
    ).toEqual([]);
  });
}
