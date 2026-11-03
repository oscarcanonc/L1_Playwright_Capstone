import path from 'path';
import contacts from '../testdata/contact.json';
import { test, expect } from '../fixtures/test.fixture';

for (const contact of contacts) {
  test(`submit the contact form as ${contact.name}`, async ({ page, contactPage }) => {
    await page.goto('/');
    await contactPage.open();
    await contactPage.submit(contact, path.resolve('testdata/sample.txt'));
    await expect(page.locator('.status.alert-success')).toContainText('Success!');
  });
}
