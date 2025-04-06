import { test, expect } from '@playwright/test';
import { existingUsers } from '../../test-setup/localstorage.setup';
import { LoginPage } from '../../pages/loginPage'; 

test.describe.configure({ mode: 'serial' });



test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    const loginPage = new LoginPage(page);  // Creating object from Login Page
    
    await loginPage.url();

    const existingUser = existingUsers[0];  // Testing the existing user

    // Filling the login form
    await loginPage.fillLoginForm(existingUser.email, existingUser.password);

    // Clicking the Log in button
    await loginPage.submitLogin();

    // Verify that Log out button is visible
    await loginPage.verifyLogoutButtonVisible();

  });
});
