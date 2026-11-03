import users from '../testdata/users.json';
import { test, expect } from '../fixtures/test.fixture';
import { registrationData } from '../utils/data';

test('register, logout, login, and delete account', async ({ page, authPage }) => {
  const user = registrationData();

  await authPage.open();
  await authPage.signup(user);
  await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();

  await authPage.logout();
  await authPage.login(user.email, user.password);
  await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();

  await authPage.logout();
  await authPage.login(user.email, user.password);
  await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();
  await authPage.deleteAccount();
});

for (const user of users.invalidUsers) {
  test(`reject invalid login credentials: ${user.email}`, async ({ page, authPage }) => {
    await authPage.open();
    await authPage.login(user.email, user.password);
    if (user.email.includes('@')) {
      await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    } else {
      await expect(page.locator('[data-qa="login-email"]')).toHaveValue(user.email);
    }
  });
}
